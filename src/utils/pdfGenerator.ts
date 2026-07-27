import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { generateReportFilename } from './helpers';

export interface GeneratedPdfResult {
  pdfBlob: Blob;
  pdfBase64: string;
  filename: string;
}

export async function generatePdfFromElement(
  elementId: string,
  cutoffDate: string,
  responsible: string
): Promise<GeneratedPdfResult> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento de vista previa con ID "${elementId}" no encontrado.`);
  }

  // Esperar a que las fuentes web y las imágenes del elemento estén 100% cargadas y renderizadas
  if (document.fonts) {
    await document.fonts.ready;
  }

  const imgs = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    imgs.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  // Nombre automático del archivo
  const filename = generateReportFilename(cutoffDate, responsible);

  // Capturar con html2canvas-pro en alta definición (scale: 2)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 800,
    width: element.offsetWidth || 794,
    onclone: (clonedDoc) => {
      // Helper para convertir oklch(...) a rgb(...) usando el parser nativo del navegador
      const tempDiv = clonedDoc.createElement('div');
      clonedDoc.body.appendChild(tempDiv);

      const resolveOklch = (str: string): string => {
        return str.replace(/oklch\([^)]+\)/gi, (match) => {
          try {
            tempDiv.style.color = match;
            const computedColor =
              clonedDoc.defaultView?.getComputedStyle(tempDiv).color ||
              window.getComputedStyle(tempDiv).color;
            if (computedColor && !computedColor.includes('oklch')) {
              return computedColor;
            }
          } catch (e) {
            // ignore
          }
          return 'rgb(185, 28, 28)';
        });
      };

      // 1. Inyectar estilos globales y reglas CSS de todas las hojas de estilo del documento
      const overrideStyle = clonedDoc.createElement('style');
      let aggregatedCss = `
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          box-sizing: border-box !important;
        }
        body {
          font-family: Arial, Helvetica, sans-serif !important;
          background-color: #ffffff !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `;

      try {
        Array.from(document.styleSheets).forEach((sheet) => {
          try {
            Array.from(sheet.cssRules || []).forEach((rule) => {
              aggregatedCss += rule.cssText + '\n';
            });
          } catch (e) {
            // Ignorar errores de hojas de estilo cross-origin
          }
        });
      } catch (e) {
        // ignore
      }

      overrideStyle.textContent = aggregatedCss;
      clonedDoc.head.appendChild(overrideStyle);

      // 2. Limpiar oklch en todas las etiquetas <style> del documento clonado
      const styleElements = Array.from(clonedDoc.querySelectorAll('style'));
      styleElements.forEach((style) => {
        if (style.textContent && style.textContent.includes('oklch')) {
          style.textContent = resolveOklch(style.textContent);
        }
      });

      // 3. Configurar contenedor y dimensiones exactas en el documento clonado
      const pdfContainer = clonedDoc.getElementById(elementId);

      if (pdfContainer) {
        clonedDoc.body.style.width = '800px';
        clonedDoc.body.style.minWidth = '800px';
        clonedDoc.body.style.margin = '0';
        clonedDoc.body.style.padding = '0';
        clonedDoc.body.style.backgroundColor = '#ffffff';

        pdfContainer.style.position = 'relative';
        pdfContainer.style.left = '0';
        pdfContainer.style.top = '0';
        pdfContainer.style.visibility = 'visible';
        pdfContainer.style.opacity = '1';
        pdfContainer.style.width = '794px';
        pdfContainer.style.minWidth = '794px';
        pdfContainer.style.maxWidth = '794px';
        pdfContainer.style.boxSizing = 'border-box';
        pdfContainer.style.transform = 'none';
        pdfContainer.style.backgroundColor = '#ffffff';
        pdfContainer.style.color = '#1e293b';
        pdfContainer.style.fontFamily = 'Arial, Helvetica, sans-serif';

        // Enforzar dimensiones fijas y máximas en todas las imágenes dentro del contenedor del PDF
        const pdfImgs = Array.from(pdfContainer.querySelectorAll('img')) as HTMLImageElement[];
        pdfImgs.forEach((img) => {
          img.style.objectFit = 'contain';
          img.style.display = 'block';
          img.style.width = 'auto';
          img.style.maxWidth = '220px';
          img.style.maxHeight = '48px';
        });

        // 4. Control inteligente de saltos de página para no cortar tarjetas, filas, imágenes ni textos
        const containerWidth = pdfContainer.offsetWidth || 794;
        const PAGE_HEIGHT_PX = containerWidth * (279.4 / 215.9); // ~1027.53px (Relación Carta)
        const MARGIN_BOTTOM_PX = 24; // 24px de margen de seguridad para no pegar elementos al borde inferior

        const getContainerTop = (el: HTMLElement) => {
          const elRect = el.getBoundingClientRect();
          const containerRect = pdfContainer.getBoundingClientRect();
          return elRect.top - containerRect.top;
        };

        const pushToNextPageIfNeeded = (el: HTMLElement, isTableTr = false) => {
          const top = getContainerTop(el);
          const height = el.offsetHeight;
          if (height === 0) return;

          const bottom = top + height;
          const pageIndex = Math.floor(top / PAGE_HEIGHT_PX);
          const nextPageStart = (pageIndex + 1) * PAGE_HEIGHT_PX;
          const pageBoundary = nextPageStart - MARGIN_BOTTOM_PX;

          // Si el elemento comienza en esta página pero su parte inferior se extiende más allá del límite de seguridad
          if (top < nextPageStart && bottom > pageBoundary) {
            const spacerHeight = Math.ceil(nextPageStart - top);

            if (spacerHeight > 0 && spacerHeight < PAGE_HEIGHT_PX) {
              if (isTableTr) {
                const spacerTr = clonedDoc.createElement('tr');
                spacerTr.className = 'pdf-spacer-row';
                const spacerTd = clonedDoc.createElement('td');
                spacerTd.colSpan = 10;
                spacerTd.style.height = `${spacerHeight}px`;
                spacerTd.style.padding = '0';
                spacerTd.style.margin = '0';
                spacerTd.style.border = 'none';
                spacerTd.style.background = 'transparent';
                spacerTr.appendChild(spacerTd);
                el.parentNode?.insertBefore(spacerTr, el);
              } else {
                const spacer = clonedDoc.createElement('div');
                spacer.style.height = `${spacerHeight}px`;
                spacer.style.width = '100%';
                spacer.style.clear = 'both';
                el.parentNode?.insertBefore(spacer, el);
              }
            }
          }
        };

        // a) Procesar cada tarjeta de cuenta/proyecto y sus filas
        const accountCards = Array.from(pdfContainer.querySelectorAll('.pdf-account-card')) as HTMLElement[];
        accountCards.forEach((card) => {
          const cardHeight = card.offsetHeight;
          if (cardHeight <= PAGE_HEIGHT_PX - 60) {
            // Si la tarjeta completa cabe en una hoja sola, moverla completa si se corta
            pushToNextPageIfNeeded(card, false);
          } else {
            // Si la tarjeta es más alta que 1 hoja, evaluar fila por fila (tr)
            const rows = Array.from(card.querySelectorAll('tbody tr')) as HTMLElement[];
            rows.forEach((row) => pushToNextPageIfNeeded(row, true));
          }
        });

        // b) Procesar el pie de página corporativo
        const footer = pdfContainer.querySelector('#pdf-corporate-footer') as HTMLElement | null;
        if (footer) {
          pushToNextPageIfNeeded(footer, false);
        }
      }

      if (clonedDoc.body.contains(tempDiv)) {
        clonedDoc.body.removeChild(tempDiv);
      }
    },
  });

  // Crear PDF TAMAÑO CARTA (Letter: 215.9mm x 279.4mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth(); // ~215.9 mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // ~279.4 mm

  // Altura proporcional que corresponde a 1 página de PDF en píxeles de canvas
  const pageCanvasHeight = (canvas.width * pdfHeight) / pdfWidth;

  // Tolerancia de 15px para evitar crear una página en blanco extra por bordes o subpíxeles
  const TOLERANCE_PX = 15;

  if (canvas.height <= pageCanvasHeight + TOLERANCE_PX) {
    // Cabe en 1 sola página Carta
    const imgData = canvas.toDataURL('image/png', 1.0);
    const calculatedHeightMm = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, calculatedHeightMm);
  } else {
    // Documento multipágina: Dividir el canvas por páginas exactas usando un canvas secundario
    let currentY = 0;
    let pageIndex = 0;

    while (currentY < canvas.height - TOLERANCE_PX) {
      if (pageIndex > 0) {
        pdf.addPage();
      }

      const sliceHeight = Math.min(pageCanvasHeight, canvas.height - currentY);

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.round(pageCanvasHeight);

      const ctx = sliceCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, Math.round(pageCanvasHeight));
        ctx.drawImage(
          canvas,
          0, Math.round(currentY), canvas.width, Math.round(sliceHeight), // Origen en canvas principal
          0, 0, canvas.width, Math.round(sliceHeight)                    // Destino en canvas de la página
        );
      }

      const pageImgData = sliceCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      currentY += pageCanvasHeight;
      pageIndex++;
    }
  }

  // Generar Blob para descarga directa
  const pdfBlob = pdf.output('blob');

  // Generar Base64 para subir a API de OneDrive
  const pdfBase64 = pdf.output('datauristring');

  return {
    pdfBlob,
    pdfBase64,
    filename,
  };
}

/**
 * Función para forzar la descarga directa del PDF en el navegador del usuario
 */
export function downloadPdfBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
