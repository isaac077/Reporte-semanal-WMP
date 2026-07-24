import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

  // Capturar con html2canvas en alta definición (scale: 2)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 800,
    onclone: (clonedDoc) => {
      // Helper para convertir oklch(...) a rgb(...) usando el parser nativo del navegador
      const convertOklchToRgb = (str: string): string => {
        return str.replace(/oklch\([^)]+\)/gi, (match) => {
          try {
            const tempDiv = document.createElement('div');
            tempDiv.style.color = match;
            document.body.appendChild(tempDiv);
            const computedColor = window.getComputedStyle(tempDiv).color;
            document.body.removeChild(tempDiv);
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
          style.textContent = convertOklchToRgb(style.textContent);
        }
      });

      // 2. Limpiar estilos inline en los elementos dentro del contenedor del reporte
      const pdfContainer = clonedDoc.getElementById(elementId);
      if (pdfContainer) {
        const allNodes = [pdfContainer, ...Array.from(pdfContainer.querySelectorAll('*'))];
        allNodes.forEach((node) => {
          const htmlEl = node as HTMLElement;
          if (htmlEl.style && htmlEl.style.cssText && htmlEl.style.cssText.includes('oklch')) {
            htmlEl.style.cssText = convertOklchToRgb(htmlEl.style.cssText);
          }
        });
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
