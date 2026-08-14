import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { resume } from '../src/data/resume.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public');
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, 'curriculo.pdf');

const doc = new PDFDocument({ size: 'A4', margins: { top: 50, bottom: 50, left: 56, right: 56 } });
doc.pipe(createWriteStream(outPath));

const h1 = () => doc.font('Helvetica-Bold').fontSize(18);
const h2 = () => doc.font('Helvetica-Bold').fontSize(13).fillColor('#111');
const body = () => doc.font('Helvetica').fontSize(10).fillColor('#222');
const bold = () => doc.font('Helvetica-Bold').fontSize(10).fillColor('#111');
const small = () => doc.font('Helvetica').fontSize(9).fillColor('#555');

function section(title) {
  doc.moveDown(0.8);
  h2().text(title.toUpperCase());
  doc.moveTo(doc.x, doc.y + 2).lineTo(doc.page.width - doc.page.margins.right, doc.y + 2).strokeColor('#ccc').stroke();
  doc.moveDown(0.4);
}

h1().fillColor('#111').text(resume.name);
body().fontSize(12).text(resume.title);
small().text(`${resume.location} | ${resume.contact.email} | ${resume.contact.linkedin} | ${resume.contact.github}`);

section('Resumo');
body().text(resume.summary, { align: 'justify' });

section('Experiência Profissional');
for (const job of resume.experience) {
  bold().text(job.company + (job.companyDetail ? ` — ${job.companyDetail}` : ''));
  if (job.totalPeriod) small().text(job.totalPeriod);
  doc.moveDown(0.2);
  for (const role of job.roles) {
    body().text(`${role.title} — ${role.period}`, { indent: 10 });
  }
  doc.moveDown(0.2);
  for (const highlight of job.highlights) {
    body().text(`• ${highlight}`, { indent: 10, align: 'justify' });
    doc.moveDown(0.15);
  }
  doc.moveDown(0.3);
}

section('Formação Acadêmica');
for (const item of resume.education) {
  body().text(`${item.title} — ${item.institution} (${item.period})`);
}

section('Idiomas');
for (const lang of resume.languages) {
  body().text(`${lang.name}: ${lang.level}`);
}

section('Habilidades Técnicas');
for (const [category, items] of Object.entries(resume.skills)) {
  bold().text(`${category}: `, { continued: true });
  body().text(items.join(', '));
}

doc.end();
console.log(`PDF gerado em ${outPath}`);
