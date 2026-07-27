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

      // 1. Limpiar oklch en todas las etiquetas <style> del documento clonado
      const styleElements = Array.from(clonedDoc.querySelectorAll('style'));
      styleElements.forEach((style) => {
        if (style.textContent && style.textContent.includes('oklch')) {
          style.textContent = resolveOklch(style.textContent);
        }
      });

      // 2. Limpiar estilos inline y computed colors en todos los elementos del reporte
      const pdfContainer = clonedDoc.getElementById(elementId);
      if (pdfContainer) {
        const allNodes = [pdfContainer, ...Array.from(pdfContainer.querySelectorAll('*'))] as HTMLElement[];
        allNodes.forEach((node) => {
          if (node.style) {
            if (node.style.cssText && node.style.cssText.includes('oklch')) {
              node.style.cssText = resolveOklch(node.style.cssText);
            }
            try {
              const computed =
                clonedDoc.defaultView?.getComputedStyle(node) ||
                window.getComputedStyle(node);
              if (computed) {
                const colorProps = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'fill', 'stroke'];
                colorProps.forEach((prop) => {
                  const val = computed.getPropertyValue(prop);
                  if (val && val.includes('oklch')) {
                    node.style.setProperty(prop, resolveOklch(val));
                  }
                });
              }
            } catch (e) {
              // ignore
            }
          }
        });

        // 3. Centrado perfecto de badges de estatus para html2canvas
        const pdfBadges = Array.from(pdfContainer.querySelectorAll('.pdf-status-badge')) as HTMLElement[];
        pdfBadges.forEach((badgeEl) => {
          badgeEl.style.display = 'inline-block';
          badgeEl.style.lineHeight = '1';
          badgeEl.style.paddingTop = '0px';
          badgeEl.style.paddingBottom = '8px';
          badgeEl.style.paddingLeft = '7px';
          badgeEl.style.paddingRight = '7px';
          badgeEl.style.fontSize = '9px';
          badgeEl.style.fontWeight = 'bold';
          badgeEl.style.textAlign = 'center';
          badgeEl.style.verticalAlign = 'top';
          badgeEl.style.position = 'relative';
          badgeEl.style.top = '-5px';
          badgeEl.style.margin = '0';
          badgeEl.style.boxSizing = 'border-box';
          if (badgeEl.parentElement) {
            badgeEl.parentElement.style.display = 'block';
            badgeEl.parentElement.style.margin = '0 0 1px 0';
            badgeEl.parentElement.style.padding = '0';
            badgeEl.parentElement.style.lineHeight = '1';
          }
        });

        // 4. Control inteligente de saltos de página para no cortar tarjetas, filas ni pie de página
        const containerWidth = pdfContainer.offsetWidth || 794;
        const PAGE_HEIGHT_PX = containerWidth * (279.4 / 215.9); // ~1027.53px
        const TOP_MARGIN_PX = 38;
        const BOTTOM_MARGIN_PX = 38;
        const USABLE_PAGE_HEIGHT = PAGE_HEIGHT_PX - TOP_MARGIN_PX - BOTTOM_MARGIN_PX; // ~951.53px

        const getContainerTop = (el: HTMLElement) => {
          const elRect = el.getBoundingClientRect();
          const containerRect = pdfContainer.getBoundingClientRect();
          return elRect.top - containerRect.top;
        };

        // a) Ajustar tarjetas de cuentas (o sus filas)
        const accountCards = Array.from(pdfContainer.querySelectorAll('.pdf-account-card')) as HTMLElement[];
        accountCards.forEach((card) => {
          const cardTop = getContainerTop(card);
          const cardHeight = card.offsetHeight;
          const cardBottom = cardTop + cardHeight;
          const p = Math.floor(cardTop / PAGE_HEIGHT_PX) + 1;
          const usableBottom = p * PAGE_HEIGHT_PX - BOTTOM_MARGIN_PX;

          if (cardBottom > usableBottom) {
            if (cardHeight <= USABLE_PAGE_HEIGHT) {
              // La tarjeta entera cabe en 1 página sola -> mover la tarjeta completa al inicio de la siguiente página
              const targetTop = p * PAGE_HEIGHT_PX + TOP_MARGIN_PX;
              const spacerHeight = Math.max(0, targetTop - cardTop);
              if (spacerHeight > 0) {
                const spacer = clonedDoc.createElement('div');
                spacer.style.height = `${spacerHeight}px`;
                spacer.style.width = '100%';
                spacer.style.clear = 'both';
                card.parentNode?.insertBefore(spacer, card);
              }
            } else {
              // La tarjeta es más alta que una página -> evaluar fila por fila (tr)
              const rows = Array.from(card.querySelectorAll('tbody tr')) as HTMLElement[];
              rows.forEach((row) => {
                const rowTop = getContainerTop(row);
                const rowHeight = row.offsetHeight;
                const rowBottom = rowTop + rowHeight;
                const rowPage = Math.floor(rowTop / PAGE_HEIGHT_PX) + 1;
                const rowUsableBottom = rowPage * PAGE_HEIGHT_PX - BOTTOM_MARGIN_PX;

                if (rowBottom > rowUsableBottom) {
                  const targetTop = rowPage * PAGE_HEIGHT_PX + TOP_MARGIN_PX;
                  const spacerHeight = Math.max(0, targetTop - rowTop);
                  if (spacerHeight > 0) {
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
                    row.parentNode?.insertBefore(spacerTr, row);
                  }
                }
              });
            }
          }
        });

        // b) Asegurar que el pie de página corporativo SIEMPRE quede en la parte inferior de la última hoja
        const footer = pdfContainer.querySelector('#pdf-corporate-footer') as HTMLElement | null;
        if (footer) {
          const footerTop = getContainerTop(footer);
          const footerHeight = footer.offsetHeight || 120;
          const footerBottom = footerTop + footerHeight;
          const p = Math.floor(footerTop / PAGE_HEIGHT_PX) + 1;
          const maxUsablePageBottom = p * PAGE_HEIGHT_PX - BOTTOM_MARGIN_PX;

          const targetPage = footerBottom <= maxUsablePageBottom ? p : p + 1;
          const desiredFooterTop = targetPage * PAGE_HEIGHT_PX - BOTTOM_MARGIN_PX - footerHeight;
          const spacerHeight = Math.max(0, desiredFooterTop - footerTop);

          if (spacerHeight > 0) {
            const spacer = clonedDoc.createElement('div');
            spacer.style.height = `${spacerHeight}px`;
            spacer.style.width = '100%';
            spacer.style.clear = 'both';
            footer.parentNode?.insertBefore(spacer, footer);
          }

          pdfContainer.style.minHeight = `${targetPage * PAGE_HEIGHT_PX}px`;
          pdfContainer.style.height = `${targetPage * PAGE_HEIGHT_PX}px`;
          pdfContainer.style.maxHeight = `${targetPage * PAGE_HEIGHT_PX}px`;
          pdfContainer.style.overflow = 'hidden';
          pdfContainer.style.boxSizing = 'border-box';
        }
      }

      if (clonedDoc.body.contains(tempDiv)) {
        clonedDoc.body.removeChild(tempDiv);
      }
    },
  });

  const imgData = canvas.toDataURL('image/png', 1.0);

  // Crear PDF TAMAÑO CARTA (Letter: 215.9mm x 279.4mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth(); // ~215.9 mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // ~279.4 mm

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Ajustar la imagen al ancho de la página con proporciones
  const ratio = pdfWidth / imgWidth;
  const calculatedHeight = imgHeight * ratio;

  // Tolerancia de 3mm (~11px) para evitar generar hojas en blanco extra por redondeos de subpíxeles
  const TOLERANCE_MM = 3.0;

  if (calculatedHeight <= pdfHeight + TOLERANCE_MM) {
    // Cabe perfectamente en 1 página
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, calculatedHeight);
  } else {
    // Si excede 1 página, agregar páginas según sea necesario
    let heightLeft = calculatedHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, calculatedHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > TOLERANCE_MM) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, calculatedHeight);
      heightLeft -= pdfHeight;
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
