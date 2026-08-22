import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ExternalHyperlink,
} from 'docx';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { resume } from '../src/data/resume.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public');
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, 'curriculo.docx');

const sectionTitle = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
    children: [new TextRun({ text, bold: true })],
  });

const paragraph = (text, opts = {}) => new Paragraph({ children: [new TextRun(text)], spacing: { after: 100 }, ...opts });

const bullet = (text, opts = {}) =>
  new Paragraph({
    children: [new TextRun(text)],
    bullet: { level: 0 },
    spacing: { after: 80 },
    ...opts,
  });

const bulletRich = (boldPrefix, rest) =>
  new Paragraph({
    children: [new TextRun({ text: boldPrefix, bold: true }), new TextRun(rest)],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });

const centeredLink = (text, url) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new ExternalHyperlink({ link: url, children: [new TextRun({ text, style: 'Hyperlink' })] })],
  });

const children = [
  new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: resume.name, bold: true })],
  }),
  paragraph(resume.title, { alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
  paragraph(resume.location, { alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
  centeredLink(resume.contact.email, `mailto:${resume.contact.email}`),
  centeredLink(resume.contact.linkedin, resume.contact.linkedin),
  centeredLink(resume.contact.github, resume.contact.github),

  sectionTitle('Resumo'),
  paragraph(resume.summary),

  sectionTitle('Experiência Profissional'),
];

for (const job of resume.experience) {
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: job.company + (job.companyDetail ? ` — ${job.companyDetail}` : ''), bold: true }),
      ],
      spacing: { before: 150, after: 20 },
    }),
  );
  if (job.totalPeriod) children.push(paragraph(job.totalPeriod, { spacing: { after: 60 } }));
  for (const role of job.roles) {
    children.push(paragraph(`${role.title} — ${role.period}`, { spacing: { after: 20 } }));
  }
  for (const highlight of job.highlights) {
    children.push(bullet(highlight));
  }
}

children.push(sectionTitle('Formação Acadêmica'));
for (const item of resume.education) {
  children.push(bullet(`${item.title} — ${item.institution} (${item.period})`));
}

children.push(sectionTitle('Idiomas'));
for (const lang of resume.languages) {
  children.push(bullet(`${lang.name}: ${lang.level}`));
}

children.push(sectionTitle('Habilidades Técnicas'));
for (const [category, items] of Object.entries(resume.skills)) {
  children.push(bulletRich(`${category}: `, items.join(', ')));
}

const doc = new Document({ sections: [{ children }] });

const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log(`DOCX gerado em ${outPath}`);
