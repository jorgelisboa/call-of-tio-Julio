export interface Item {
  name: string;
  price: number;
  category: string;
  era: '1920s' | 'Modern';
  damage?: string;
}

export const ITEMS: Item[] = [
  // 1920s - Housing
  { name: "Casa de Campo", price: 20000, category: "Habitação", era: "1920s" },
  { name: "Casa Grande", price: 7000, category: "Habitação", era: "1920s" },
  { name: "Casa na Cidade", price: 4000, category: "Habitação", era: "1920s" },
  { name: "Casa Mediana", price: 2900, category: "Habitação", era: "1920s" },
  { name: "Bangalô", price: 3100, category: "Habitação", era: "1920s" },
  
  // 1920s - Clothing (Men)
  { name: "Terno a Rigor de Lã Penteada", price: 17.95, category: "Vestuário", era: "1920s" },
  { name: "Terno a rigor de Casimira", price: 18.50, category: "Vestuário", era: "1920s" },
  { name: "Terno, mohair", price: 13.85, category: "Vestuário", era: "1920s" },
  { name: "Casaco", price: 9.95, category: "Vestuário", era: "1920s" },
  { name: "Sobretudo Chesterfield", price: 19.95, category: "Vestuário", era: "1920s" },
  { name: "Sapatos Oxford", price: 6.95, category: "Vestuário", era: "1920s" },
  { name: "Bota de Couro", price: 4.95, category: "Vestuário", era: "1920s" },
  { name: "Camisa Social", price: 1.95, category: "Vestuário", era: "1920s" },
  { name: "Suéter", price: 7.69, category: "Vestuário", era: "1920s" },
  { name: "Fedora de Feltro", price: 4.95, category: "Vestuário", era: "1920s" },
  { name: "Chapéu de Palha", price: 1.95, category: "Vestuário", era: "1920s" },
  
  // 1920s - Clothing (Women)
  { name: "Casaco de Veludo com Colarinho de Pelo", price: 39.75, category: "Vestuário", era: "1920s" },
  { name: "Casaco de Pele de Raposa", price: 198.00, category: "Vestuário", era: "1920s" },
  { name: "Vestido de Tafetá", price: 10.95, category: "Vestuário", era: "1920s" },
  { name: "Vestido de Cetim Charmeuse", price: 10.95, category: "Vestuário", era: "1920s" },
  { name: "Saia Plissada, Seda", price: 7.95, category: "Vestuário", era: "1920s" },
  { name: "Blusa, Algodão", price: 1.98, category: "Vestuário", era: "1920s" },

  // 1920s - Medical
  { name: "Valise Médica", price: 10.45, category: "Médico", era: "1920s" },
  { name: "Fórceps", price: 3.59, category: "Médico", era: "1920s" },
  { name: "Conjunto de Bisturis", price: 1.39, category: "Médico", era: "1920s" },
  { name: "Seringas Hipodérmicas", price: 12.50, category: "Médico", era: "1920s" },
  { name: "Termômetro Clínico", price: 0.69, category: "Médico", era: "1920s" },
  { name: "Cadeira de Rodas", price: 39.95, category: "Médico", era: "1920s" },
  { name: "Kit de Primeiros Socorros", price: 3.50, category: "Médico", era: "1920s" },

  // 1920s - Travel/Camping
  { name: "Kit de Cozinha", price: 8.98, category: "Viagem", era: "1920s" },
  { name: "Fogão de Acampamento", price: 6.10, category: "Viagem", era: "1920s" },
  { name: "Barraca (2x2m)", price: 11.48, category: "Viagem", era: "1920s" },
  { name: "Saco de Dormir", price: 4.50, category: "Viagem", era: "1920s" },
  { name: "Mochila", price: 3.45, category: "Viagem", era: "1920s" },
  { name: "Binóculos", price: 8.50, category: "Viagem", era: "1920s" },
  { name: "Bússola de Bolso", price: 3.25, category: "Viagem", era: "1920s" },
  { name: "Lanterna Elétrica", price: 2.40, category: "Viagem", era: "1920s" },

  // 1920s - Tools/Misc
  { name: "Kit de Ferramentas (20 peças)", price: 14.90, category: "Ferramentas", era: "1920s" },
  { name: "Pé-de-cabra", price: 2.25, category: "Ferramentas", era: "1920s", damage: "1D6+DB" },
  { name: "Algemas", price: 3.35, category: "Ferramentas", era: "1920s" },
  { name: "Relógio de Pulso", price: 5.95, category: "Pessoal", era: "1920s" },
  { name: "Relógio de Bolso de Ouro", price: 35.10, category: "Pessoal", era: "1920s" },
  { name: "Máquina de Escrever Remington", price: 40.00, category: "Equipamento", era: "1920s" },
  { name: "Câmera Kodak", price: 4.29, category: "Equipamento", era: "1920s" },
  
  // 1920s - Weapons
  { name: "Revólver .38", price: 25.00, category: "Armas", era: "1920s", damage: "1D10" },
  { name: "Revólver .45", price: 30.00, category: "Armas", era: "1920s", damage: "1D10+2" },
  { name: "Pistola Automática .32", price: 20.00, category: "Armas", era: "1920s", damage: "1D8" },
  { name: "Espingarda Calibre 12 (2 canos)", price: 40.00, category: "Armas", era: "1920s", damage: "4D6/2D6/1D6" },
  { name: "Rifle .30-06", price: 50.00, category: "Armas", era: "1920s", damage: "2D6+4" },
  { name: "Faca de Caça", price: 2.35, category: "Armas", era: "1920s", damage: "1D4+2+DB" },
  { name: "Soco Inglês", price: 1.00, category: "Armas", era: "1920s", damage: "1D3+1+DB" },
  { name: "Munição .38 (50)", price: 0.88, category: "Munição", era: "1920s" },
  { name: "Munição .45 (50)", price: 2.22, category: "Munição", era: "1920s" },
  { name: "Cartuchos Cal. 12 (25)", price: 0.93, category: "Munição", era: "1920s" },

  // 1920s - Vehicles
  { name: "Ford Modelo T", price: 360.00, category: "Veículos", era: "1920s" },
  { name: "Ford Modelo A", price: 450.00, category: "Veículos", era: "1920s" },
  { name: "Chevrolet Capitol", price: 695.00, category: "Veículos", era: "1920s" },
  { name: "Motocicleta Norton", price: 95.00, category: "Veículos", era: "1920s" },
  { name: "Caminhão Ford Modelo TT", price: 490.00, category: "Veículos", era: "1920s" },

  // Modern - Electronics/Comms
  { name: "Smartphone", price: 299.00, category: "Eletrônicos", era: "Modern" },
  { name: "Notebook", price: 800.00, category: "Eletrônicos", era: "Modern" },
  { name: "Tablet", price: 400.00, category: "Eletrônicos", era: "Modern" },
  { name: "Câmera Digital SLR", price: 450.00, category: "Eletrônicos", era: "Modern" },
  { name: "GPS de Mão", price: 260.00, category: "Eletrônicos", era: "Modern" },
  { name: "Óculos de Visão Noturna", price: 600.00, category: "Eletrônicos", era: "Modern" },
  
  // Modern - Clothing
  { name: "Terno", price: 350.00, category: "Vestuário", era: "Modern" },
  { name: "Jeans", price: 40.00, category: "Vestuário", era: "Modern" },
  { name: "Tênis", price: 100.00, category: "Vestuário", era: "Modern" },
  { name: "Jaqueta de Couro", price: 200.00, category: "Vestuário", era: "Modern" },
  { name: "Colete à Prova de Balas", price: 600.00, category: "Vestuário", era: "Modern" },

  // Modern - Weapons
  { name: "Pistola 9mm", price: 500.00, category: "Armas", era: "Modern", damage: "1D10" },
  { name: "Revólver .357 Magnum", price: 425.00, category: "Armas", era: "Modern", damage: "1D8+1D4" },
  { name: "Espingarda Calibre 12 (Pump)", price: 300.00, category: "Armas", era: "Modern", damage: "4D6/2D6/1D6" },
  { name: "Fuzil AR-15", price: 1100.00, category: "Armas", era: "Modern", damage: "2D6" },
  { name: "Taser", price: 400.00, category: "Armas", era: "Modern", damage: "1D3+Atordoar" },
  { name: "Spray de Pimenta", price: 16.00, category: "Armas", era: "Modern", damage: "Atordoar" },
  { name: "Munição 9mm (50)", price: 12.00, category: "Munição", era: "Modern" },
  { name: "Cartuchos Cal. 12 (25)", price: 30.00, category: "Munição", era: "Modern" },

  // Modern - Vehicles
  { name: "Carro Sedã Médio", price: 25000.00, category: "Veículos", era: "Modern" },
  { name: "SUV", price: 35000.00, category: "Veículos", era: "Modern" },
  { name: "Motocicleta Esportiva", price: 13000.00, category: "Veículos", era: "Modern" },
  
  // Modern - Misc
  { name: "Kit de Primeiros Socorros", price: 60.00, category: "Médico", era: "Modern" },
  { name: "Canivete Suíço", price: 30.00, category: "Ferramentas", era: "Modern" },
  { name: "Lanterna Tática", price: 50.00, category: "Equipamento", era: "Modern" },
  { name: "Mochila Cargueira", price: 150.00, category: "Viagem", era: "Modern" },
];
