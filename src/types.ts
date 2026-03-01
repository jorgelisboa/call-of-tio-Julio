export interface Attributes {
  STR: number;
  CON: number;
  SIZ: number;
  DEX: number;
  APP: number;
  INT: number;
  POW: number;
  EDU: number;
}

export interface DerivedStats {
  hp: { current: number; max: number };
  sanity: { current: number; max: number; start: number };
  luck: { current: number; max: number }; // Max luck is usually 99
  mp: { current: number; max: number };
  build: number;
  db: string; // Damage Bonus (e.g., "+1D4")
  mov: number;
}

export interface Skill {
  name: string;
  value: number;
  base: number;
  occupation: boolean; // Is it an occupational skill?
}

export interface Finances {
  cash: number;
  assets: number;
  spending_level: number;
}

export interface InventoryItem {
  name: string;
  category: string;
  damage?: string;
  quantity: number;
}

export interface Investigator {
  id?: number;
  name: string;
  player_name: string;
  occupation: string;
  age: number;
  attributes: Attributes;
  skills: Skill[];
  derived_stats: DerivedStats;
  finances: Finances;
  inventory: InventoryItem[];
  backstory: string;
  portrait_url: string;
}

export const ATTRIBUTE_VALUES = [40, 50, 50, 50, 60, 60, 70, 80];

export const SKILL_DISTRIBUTION = [70, 60, 60, 50, 50, 50, 40, 40, 40]; // 1x70, 2x60, 3x50, 3x40 (Total 9: 8 skills + Credit Rating)

export const DEFAULT_SKILLS: Skill[] = [
  { name: 'Antropologia', value: 1, base: 1, occupation: false },
  { name: 'Arqueologia', value: 1, base: 1, occupation: false },
  { name: 'Armas de Fogo (Pistola)', value: 20, base: 20, occupation: false },
  { name: 'Armas de Fogo (Rifle/Espingarda)', value: 25, base: 25, occupation: false },
  { name: 'Arremessar', value: 20, base: 20, occupation: false },
  { name: 'Arte/Ofício', value: 5, base: 5, occupation: false },
  { name: 'Avaliação', value: 5, base: 5, occupation: false },
  { name: 'Cavalgar', value: 5, base: 5, occupation: false },
  { name: 'Charme', value: 15, base: 15, occupation: false },
  { name: 'Chaveiro', value: 1, base: 1, occupation: false },
  { name: 'Ciência', value: 1, base: 1, occupation: false },
  { name: 'Consertos Elétricos', value: 10, base: 10, occupation: false },
  { name: 'Consertos Mecânicos', value: 10, base: 10, occupation: false },
  { name: 'Contabilidade', value: 5, base: 5, occupation: false },
  { name: 'Direito', value: 5, base: 5, occupation: false },
  { name: 'Dirigir Automóveis', value: 20, base: 20, occupation: false },
  { name: 'Disfarce', value: 5, base: 5, occupation: false },
  { name: 'Encontrar', value: 25, base: 25, occupation: false },
  { name: 'Escalar', value: 20, base: 20, occupation: false },
  { name: 'Escutar', value: 20, base: 20, occupation: false },
  { name: 'Esquivar', value: 0, base: 0, occupation: false }, // Base is half DEX
  { name: 'Furtividade', value: 20, base: 20, occupation: false },
  { name: 'História', value: 5, base: 5, occupation: false },
  { name: 'Intimidação', value: 15, base: 15, occupation: false },
  { name: 'Lábia', value: 5, base: 5, occupation: false },
  { name: 'Língua Nativa', value: 0, base: 0, occupation: false }, // Base is EDU
  { name: 'Lutar (Briga)', value: 25, base: 25, occupation: false },
  { name: 'Medicina', value: 1, base: 1, occupation: false },
  { name: 'Mitos de Cthulhu', value: 0, base: 0, occupation: false },
  { name: 'Mundo Natural', value: 10, base: 10, occupation: false },
  { name: 'Natação', value: 20, base: 20, occupation: false },
  { name: 'Navegação', value: 10, base: 10, occupation: false },
  { name: 'Nível de Crédito', value: 0, base: 0, occupation: false },
  { name: 'Ocultismo', value: 5, base: 5, occupation: false },
  { name: 'Operar Maquinário Pesado', value: 1, base: 1, occupation: false },
  { name: 'Outra Língua', value: 1, base: 1, occupation: false },
  { name: 'Persuasão', value: 10, base: 10, occupation: false },
  { name: 'Pilotar', value: 1, base: 1, occupation: false },
  { name: 'Prestidigitação', value: 10, base: 10, occupation: false },
  { name: 'Primeiros Socorros', value: 30, base: 30, occupation: false },
  { name: 'Psicanálise', value: 1, base: 1, occupation: false },
  { name: 'Psicologia', value: 10, base: 10, occupation: false },
  { name: 'Rastrear', value: 10, base: 10, occupation: false },
  { name: 'Saltar', value: 20, base: 20, occupation: false },
  { name: 'Sobrevivência', value: 10, base: 10, occupation: false },
  { name: 'Usar Bibliotecas', value: 20, base: 20, occupation: false },
  { name: 'Usar Computadores', value: 5, base: 5, occupation: false }, // Added for Hacker
  { name: 'Eletrônica', value: 1, base: 1, occupation: false }, // Added for Hacker
];
