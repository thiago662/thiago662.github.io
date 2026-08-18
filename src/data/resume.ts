export interface ExperienceRole {
  title: string;
  period: string;
}

export interface Experience {
  company: string;
  companyDetail?: string;
  totalPeriod?: string;
  roles: ExperienceRole[];
  highlights: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
}

export const resume = {
  name: 'Thiago Gonçalves Santos',
  title: 'Desenvolvedor Full Stack Sênior (Especialista em Back-end)',
  location: 'Itu, SP',
  contact: {
    email: 'thiago1santos12@gmail.com',
    linkedin: 'https://www.linkedin.com/in/thiago-gon%C3%A7alves-santos-730a74199/',
    github: 'https://github.com/thiago662',
  },
  summary:
    'Desenvolvedor full stack sênior com 5 anos e 8 meses de experiência na DealerSpace (ex-Followize), atuando com PHP, Laravel, Angular e integrações de sistemas, com liderança técnica da squad de integrações da empresa. Atualmente presta serviços como PJ para cliente do setor de CRM sob acordo de confidencialidade, via CNPJ próprio (Tgs Code Solutions). Está aberto a novas oportunidades, inclusive fora do setor de CRM automotivo, aplicando a mesma base sólida de arquitetura, integrações e boas práticas de engenharia em outros mercados.',
  experience: [
    {
      company: 'Cliente sob NDA',
      companyDetail: 'PJ, via Tgs Code Solutions',
      totalPeriod: 'mar/2026 – atual · 6 meses',
      roles: [{ title: 'Desenvolvedor Full Stack Sênior', period: 'mar/2026 – atual' }],
      highlights: [
        'Sou um dos dois desenvolvedores de fato no time (restante formado por vibe coders); fui introduzido por um dev sênior a desenvolvimento assistido por IA com harness e SDD (Spec Driven Development), priorizando produtividade nas entregas sem abrir mão de controle sobre o código — abordagem distinta de vibe coding.',
        'Atuo em dois projetos: um microsserviço novo de integração, em TypeScript, JavaScript, Angular e PostgreSQL; e um módulo novo de sistema web, em PHP, Laravel, Filament e PostgreSQL, comunicando-se com integrações via API.',
      ],
    },
    {
      company: 'DealerSpace',
      totalPeriod: '5 anos e 8 meses (ago/2020 – mar/2026)',
      roles: [
        { title: 'Desenvolvedor Full Stack Sênior', period: 'dez/2025 – mar/2026 (4 meses)' },
        { title: 'Desenvolvedor Full Stack Pleno II', period: 'fev/2025 – dez/2025 (11 meses)' },
        { title: 'Desenvolvedor Full Stack Pleno I', period: 'out/2023 – fev/2025 (1 ano e 5 meses)' },
        { title: 'Desenvolvedor Full Stack Júnior III', period: 'jan/2023 – out/2023 (10 meses)' },
        { title: 'Desenvolvedor Back-end Júnior II', period: 'fev/2022 – fev/2023 (1 ano e 1 mês)' },
        { title: 'Desenvolvedor Back-end Júnior I', period: 'fev/2021 – fev/2022 (1 ano e 1 mês)' },
        { title: 'Estagiário de Desenvolvimento', period: 'ago/2020 – fev/2021 (7 meses)' },
      ],
      highlights: [
        'Liderei tecnicamente uma squad de integrações (equipe de 2 desenvolvedores), sustentando mais de 45 integrações ativas com sistemas de terceiros: 16 montadoras do setor automotivo (Hyundai, Toyota, Honda, VW, entre outras), 14 plataformas de comunicação/atendimento (WhatsApp, Zendesk, DigiSac, entre outras), além de portais de anúncio (Webmotors, iCarros, Mercado Livre, OLX) e sistemas de estoque/avaliação.',
        'Estruturei a arquitetura de integração via robôs de web scraping, filas, APIs REST e leitura automatizada de e-mails — este último mecanismo por si só estendendo a cobertura para mais de 50 portais adicionais.',
        'Atuei em arquitetura de microsserviços com código, banco e servidores independentes: sistema administrativo estruturado em MVC, comunicando via API com o CRM (projeto principal), que evoluiu de Repositories para CQRS; módulo de integrações acoplado ao CRM seguindo padrão Repositories. Código sempre orientado a POO, SOLID e Clean Code.',
        'Entreguei integrações em cadência de sprints de 15 dias corridos: pequenas (inclusão de lead ou embed) em até 2 por sprint, médias (inserção/atualização de leads) em 1 sprint, grandes (rastreamento completo do lead com comunicação bidirecional de envio e recebimento) em cerca de 2 sprints. Também fui responsável pela sustentação, lidando com bugs de regra de negócio, visuais, de banco de dados e outros.',
      ],
    },
  ] satisfies Experience[],
  education: [
    { title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', institution: 'Fatec / Ceunsp', period: '2020 – 2022' },
    { title: 'Técnico em Tecnologia da Informação', institution: 'Etec', period: '2017 – 2019' },
  ] satisfies Education[],
  languages: [{ name: 'Inglês', level: 'nível básico (leitura, escrita e conversação)' }],
  skills: {
    Linguagens: ['PHP', 'JavaScript', 'TypeScript'],
    'Back-end': ['Laravel', 'Filament'],
    'Front-end': ['Angular'],
    'Banco de dados': ['PostgreSQL', 'SQL'],
    Integrações: ['APIs REST', 'filas', 'web scraping', 'leitura de e-mails'],
    'Engenharia de software': [
      'POO',
      'SOLID',
      'Clean Code',
      'microsserviços',
      'padrões de projeto (MVC, CQRS, Services, Repositories)',
      'SDD (Spec Driven Development)',
      'programação assistida por IA com harness',
    ],
    IA: ['Claude', 'GPT', 'Gemini', 'Lovable'],
    Metodologia: ['Scrum', 'Kanban'],
    Versionamento: ['Git', 'GitFlow', 'Trunk-Based Development', 'GitHub Flow'],
  },
};
