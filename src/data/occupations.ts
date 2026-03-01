export interface Occupation {
  name: string;
  skills: string[];
  creditRating: [number, number];
  pointsFormula: string;
}

export const OCCUPATIONS: Occupation[] = [
  {
    name: "Advogado",
    skills: ["Contabilidade", "Direito", "Duas perícias interpessoais (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Usar Bibliotecas", "Duas outras perícias"],
    creditRating: [30, 80],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Andarilho",
    skills: ["Escalar", "Escutar", "Furtividade", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Navegação", "Saltar", "Duas outras perícias"],
    creditRating: [0, 5],
    pointsFormula: "EDU × 2 + APA × 2, DES × 2 ou FOR × 2"
  },
  {
    name: "Antiquário",
    skills: ["Arte/Ofício (qualquer um)", "Avaliação", "Encontrar", "História", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Outra Língua", "Usar Bibliotecas", "Uma outra perícia qualquer"],
    creditRating: [30, 70],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Artista",
    skills: ["Arte/Ofício (qualquer um)", "Encontrar", "História ou Mundo Natural", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Outra Língua", "Psicologia", "Duas outras perícias"],
    creditRating: [9, 50],
    pointsFormula: "EDU × 2 + POD × 2 ou DES × 2"
  },
  {
    name: "Atleta",
    skills: ["Arremessar", "Cavalgar", "Escalar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Lutar (Briga)", "Natação", "Saltar", "Uma outra perícia qualquer"],
    creditRating: [9, 70],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Autor",
    skills: ["Arte (Literatura)", "História", "Língua Nativa", "Mundo Natural ou Ocultismo", "Outra Língua", "Psicologia", "Usar Bibliotecas", "Uma outra perícia qualquer"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Bibliotecário",
    skills: ["Contabilidade", "Língua Nativa", "Outra Língua", "Usar Bibliotecas", "Quatro outras perícias quaisquer"],
    creditRating: [9, 35],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Clero, Membro do",
    skills: ["Contabilidade", "Escutar", "História", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Outra Língua", "Psicologia", "Usar Bibliotecas", "Uma outra perícia qualquer"],
    creditRating: [9, 60],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Criminoso",
    skills: ["Encontrar", "Furtividade", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Quatro especialidades entre: Armas de Fogo, Avaliação, Chaveiro, Consertos Mecânicos, Disfarce, Lutar, e Prestidigitação"],
    creditRating: [5, 65],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Detetive Particular",
    skills: ["Arte/Ofício (Fotografia)", "Direito", "Disfarce", "Encontrar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Usar Bibliotecas", "Uma outra perícia qualquer (ex. Armas de Fogo, Chaveiro, Usar Computadores)"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Diletante",
    skills: ["Armas de Fogo", "Arte/Ofício (qualquer um)", "Cavalgar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Outra Língua", "Três outras perícias"],
    creditRating: [50, 99],
    pointsFormula: "EDU × 2 + APA × 2"
  },
  {
    name: "Engenheiro",
    skills: ["Arte/Ofício (Desenho Técnico)", "Consertos Elétricos", "Ciência (Engenharia)", "Ciência (Física)", "Consertos Mecânicos", "Operar Maquinário Pesado", "Usar Bibliotecas", "Uma outra perícia qualquer"],
    creditRating: [30, 60],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Fanático",
    skills: ["Furtividade", "História", "Duas perícias interpessoais (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Três outras perícias"],
    creditRating: [0, 30],
    pointsFormula: "EDU × 2 + APA × 2 ou POD × 2"
  },
  {
    name: "Fazendeiro",
    skills: ["Arte/Ofício (Trabalhos de Fazenda)", "Consertos Mecânicos", "Dirigir Automóveis (ou Carroça)", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Mundo Natural", "Operar Maquinário Pesado", "Rastrear", "Uma outra perícia qualquer"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Hacker",
    skills: ["Consertos Elétricos", "Eletrônica", "Encontrar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Usar Computadores", "Usar Bibliotecas", "Duas outras perícias"],
    creditRating: [10, 70],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Investigador de Polícia",
    skills: ["Arte/Ofício (Atuar) ou Disfarce", "Armas de Fogo", "Direito", "Escutar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Encontrar", "Uma outra perícia qualquer"],
    creditRating: [20, 50],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Jornalista",
    skills: ["Armas de Fogo", "Arte/Ofício (Atuar) ou Disfarce", "Direito", "Encontrar", "Escutar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Uma outra perícia qualquer"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Médico",
    skills: ["Ciência (Biologia)", "Ciência (Farmácia)", "Medicina", "Outra Língua (Latim)", "Primeiros Socorros", "Psicologia", "Duas outras perícias"],
    creditRating: [30, 80],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Membro de Tribo",
    skills: ["Arremessar ou Lutar", "Encontrar", "Escalar", "Escutar", "Mundo Natural", "Natação", "Ocultismo", "Sobrevivência (qualquer uma)"],
    creditRating: [0, 15],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Missionário",
    skills: ["Arte/Ofício (qualquer um)", "Consertos Mecânicos", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Medicina", "Mundo Natural", "Primeiros Socorros", "Duas outras perícias"],
    creditRating: [0, 30],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Músico",
    skills: ["Arte/Ofício (Instrumento)", "Escutar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Quatro outras perícias"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 2 + DES × 2 ou POD × 2"
  },
  {
    name: "Oficial de Polícia",
    skills: ["Armas de Fogo", "Direito", "Encontrar", "Uma perícia interpessoal (Charme, Lábia, Intimidação ou Persuasão)", "Lutar (Briga)", "Primeiros Socorros", "Psicologia", "Dirigir Automóveis ou Cavalgar"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Oficial Militar",
    skills: ["Armas de Fogo", "Contabilidade", "Navegação", "Duas perícias interpessoais (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Sobrevivência", "Uma outra perícia qualquer"],
    creditRating: [20, 70],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  },
  {
    name: "Parapsicólogo",
    skills: ["Antropologia", "Arte/Ofício (Fotografia)", "História", "Usar Bibliotecas", "Ocultismo", "Outra Língua", "Psicologia", "Uma outra perícia qualquer"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Piloto",
    skills: ["Antropologia", "Arte/Ofício (Fotografia)", "História", "Ocultismo", "Outra Língua", "Psicologia", "Usar Bibliotecas", "Uma outra perícia qualquer"],
    creditRating: [20, 70],
    pointsFormula: "EDU × 2 + DES × 2"
  },
  {
    name: "Professor",
    skills: ["Língua Nativa", "Outra Língua", "Psicologia", "Usar Bibliotecas", "Quatro outras perícias como especialidades acadêmicas ou pessoais"],
    creditRating: [20, 70],
    pointsFormula: "EDU × 4"
  },
  {
    name: "Profissional de Entretenimento",
    skills: ["Arte/Ofício (Atuar)", "Disfarce", "Escutar", "Duas perícias interpessoais (Charme, Lábia, Intimidação ou Persuasão)", "Psicologia", "Duas outras perícias"],
    creditRating: [9, 70],
    pointsFormula: "EDU × 2 + APA × 2"
  },
  {
    name: "Soldado",
    skills: ["Armas de Fogo", "Escalar ou Natação", "Esquivar", "Furtividade", "Lutar", "Sobrevivência", "Duas entre: Consertos Mecânicos, Outra Língua ou Primeiros Socorros"],
    creditRating: [9, 30],
    pointsFormula: "EDU × 2 + DES × 2 ou FOR × 2"
  }
];
