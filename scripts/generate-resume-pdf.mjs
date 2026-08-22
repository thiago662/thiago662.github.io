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

const h1 = () => doc.font('Helvetica-Bold').fontSize(16).fillColor('#111');
const h2 = () => doc.font('Helvetica-Bold').fontSize(12).fillColor('#111');
const body = () => doc.font('Helvetica').fontSize(10).fillColor('#222');
const bold = () => doc.font('Helvetica-Bold').fontSize(10).fillColor('#111');
const small = () => doc.font('Helvetica').fontSize(9).fillColor('#555');
const LINK_COLOR = '#1a56db';

function centered(text) {
  doc.text(text, { align: 'center' });
}

function centeredLink(text, url) {
  doc.fillColor(LINK_COLOR).text(text, { align: 'center', link: url, underline: true });
  doc.fillColor('#222');
}

function section(title) {
  doc.moveDown(1);
  h2().text(title);
  doc.moveDown(0.5);
}

// desenho em chamada única (não em duas etapas com Y salvo) para não quebrar se o item cair na virada de página
function bulletItem(text, { gap = 0.35 } = {}) {
  body().text(`•  ${text}`, { indent: 10, align: 'justify' });
  doc.moveDown(gap);
}

// bullet cujo conteúdo mistura um prefixo em negrito com texto normal (ex.: "Categoria: itens")
function bulletItemRich(boldPrefix, rest, { gap = 0.2 } = {}) {
  doc.text('•  ', { indent: 10, continued: true });
  bold().text(boldPrefix, { continued: true });
  body().text(rest);
  doc.moveDown(gap);
}

h1().text(resume.name, { align: 'center' });
doc.moveDown(0.2);
body().fontSize(11);
centered(resume.title);
doc.moveDown(0.15);
small();
centered(resume.location);
centeredLink(resume.contact.email, `mailto:${resume.contact.email}`);
centeredLink(resume.contact.linkedin, resume.contact.linkedin);
centeredLink(resume.contact.github, resume.contact.github);

section('Resumo');
body().text(resume.summary, { align: 'justify' });

section('Experiência Profissional');
for (const job of resume.experience) {
  bold().text(job.company + (job.companyDetail ? ` — ${job.companyDetail}` : ''));
  if (job.totalPeriod) small().text(job.totalPeriod);
  doc.moveDown(0.3);
  for (const role of job.roles) {
    bulletItem(`${role.title} — ${role.period}`, { gap: 0.1 });
  }
  doc.moveDown(0.2);
  for (const highlight of job.highlights) {
    body().text(highlight, { align: 'justify' });
    doc.moveDown(0.3);
  }
  doc.moveDown(0.2);
}

section('Formação Acadêmica');
for (const item of resume.education) {
  bulletItem(`${item.title} — ${item.institution} (${item.period})`);
}

section('Idiomas');
for (const lang of resume.languages) {
  bulletItem(`${lang.name}: ${lang.level}`);
}

section('Habilidades Técnicas');
for (const [category, items] of Object.entries(resume.skills)) {
  bulletItemRich(`${category}: `, items.join(', '));
}

doc.end();
console.log(`PDF gerado em ${outPath}`);
