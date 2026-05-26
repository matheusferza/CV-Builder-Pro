import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { useResume } from '../context/ResumeContext';

function sanitizeFileName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { resume } = useResume();

  const exportPdf = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    setIsExporting(true);
    document.body.classList.add('exporting-pdf');
    try {
      const canvas = await html2canvas(element, {
        scale: 2.4,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

      const [firstName = 'Curriculo', lastName = 'Profissional'] = resume.personal.fullName.split(' ');
      const role = resume.personal.targetRole.split('|')[0] || 'Curriculo';
      pdf.save(`${sanitizeFileName(`${firstName}_${lastName}_${role}`)}.pdf`);
    } finally {
      document.body.classList.remove('exporting-pdf');
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={exportPdf}
      disabled={isExporting}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
    >
      <Download size={17} />
      {isExporting ? 'Gerando PDF...' : 'Exportar PDF'}
    </button>
  );
}
