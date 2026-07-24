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
          return 'rgb(15, 61, 100)';
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

  if (calculatedHeight <= pdfHeight) {
    // Cabe perfectamente en 1 página
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, calculatedHeight);
  } else {
    // Si excede 1 página, agregar páginas según sea necesario
    let heightLeft = calculatedHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, calculatedHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
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
