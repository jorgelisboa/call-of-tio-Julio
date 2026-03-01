import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ATTRIBUTE_VALUES, DEFAULT_SKILLS, SKILL_DISTRIBUTION, Investigator, Attributes, Skill, DerivedStats } from '@/types';
import { OCCUPATIONS, Occupation } from '@/data/occupations';
import { ChevronRight, ChevronLeft, Save, RefreshCw, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { storage } from '@/services/storage';

const STEPS = ['Identidade', 'Atributos', 'Perícias', 'Revisão'];

export default function Creator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Form State
  const [identity, setIdentity] = useState({
    name: '',
    player_name: '',
    occupation: '',
    age: 25,
    backstory: '',
  });

  const [attributes, setAttributes] = useState<Attributes>({
    STR: 0, CON: 0, SIZ: 0, DEX: 0, APP: 0, INT: 0, POW: 0, EDU: 0
  });

  const [skills, setSkills] = useState<Skill[]>(JSON.parse(JSON.stringify(DEFAULT_SKILLS)));
  const [selectedOccupationalSkills, setSelectedOccupationalSkills] = useState<string[]>([]);
  const [skillAssignments, setSkillAssignments] = useState<Record<string, number>>({}); 

  // Derived Stats
  const [derivedStats, setDerivedStats] = useState<DerivedStats | null>(null);

  // --- Step 1: Identity ---
  const handleIdentityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setIdentity({ ...identity, [e.target.name]: e.target.value });
  };

  const selectedOccupationData = OCCUPATIONS.find(o => o.name === identity.occupation);

  // --- Step 2: Attributes ---
  const availableAttributeValues = ATTRIBUTE_VALUES;
  
  const handleAttributeAssign = (stat: keyof Attributes, value: number) => {
    setAttributes(prev => ({ ...prev, [stat]: value }));
  };

  const getUnusedAttributeValues = (currentStat: keyof Attributes) => {
    const used = Object.entries(attributes)
      .filter(([k, v]) => k !== currentStat && (v as number) !== 0)
      .map(([_, v]) => v as number);
    
    const counts = availableAttributeValues.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    used.forEach(val => {
      if (counts[val]) counts[val]--;
    });

    return Object.entries(counts).flatMap(([val, count]) => Array(count).fill(Number(val)));
  };

  const autoAssignAttributes = () => {
    const shuffled = [...availableAttributeValues].sort(() => Math.random() - 0.5);
    const keys = Object.keys(attributes) as (keyof Attributes)[];
    const newAttrs = { ...attributes };
    keys.forEach((key, i) => {
      newAttrs[key] = shuffled[i];
    });
    setAttributes(newAttrs);
  };

  // --- Step 3: Skills ---
  const toggleOccupationalSkill = (skillName: string) => {
    if (skillName === 'Nível de Crédito') return; 
    
    if (selectedOccupationalSkills.includes(skillName)) {
      setSelectedOccupationalSkills(prev => prev.filter(s => s !== skillName));
      const newAssignments = { ...skillAssignments };
      delete newAssignments[skillName];
      setSkillAssignments(newAssignments);
    } else {
      if (selectedOccupationalSkills.length < 8) {
        setSelectedOccupationalSkills(prev => [...prev, skillName]);
      }
    }
  };

  const handleSkillValueAssign = (skillName: string, value: number) => {
    setSkillAssignments(prev => ({ ...prev, [skillName]: value }));
  };

  const getUnusedSkillValues = (currentSkill: string) => {
    const used = Object.entries(skillAssignments)
      .filter(([k, v]) => k !== currentSkill && (v as number) !== 0)
      .map(([_, v]) => v as number);
    
    const counts = SKILL_DISTRIBUTION.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    used.forEach(val => {
      if (counts[val]) counts[val]--;
    });

    return Object.entries(counts).flatMap(([val, count]) => Array(count).fill(Number(val))).sort((a, b) => b - a);
  };

  // --- Calculations ---
  useEffect(() => {
    if (step === 3) {
      const { STR, CON, SIZ, DEX, APP, INT, POW, EDU } = attributes;
      
      const hpMax = Math.floor((CON + SIZ) / 10);
      const mpMax = Math.floor(POW / 5);
      const sanStart = POW;
      const luck = Math.floor((Math.random() * 6 + 1 + Math.random() * 6 + 1 + Math.random() * 6 + 1) * 5);
      
      const strSiz = STR + SIZ;
      let db = '0';
      let build = 0;
      
      if (strSiz >= 2 && strSiz <= 64) { db = '-2'; build = -2; }
      else if (strSiz <= 84) { db = '-1'; build = -1; }
      else if (strSiz <= 124) { db = '0'; build = 0; }
      else if (strSiz <= 164) { db = '+1D4'; build = 1; }
      else if (strSiz <= 204) { db = '+1D6'; build = 2; }
      else if (strSiz <= 284) { db = '+2D6'; build = 3; }
      else { db = '+3D6'; build = 4; }

      let mov = 8;
      if (DEX < SIZ && STR < SIZ) mov = 7;
      else if (DEX > SIZ && STR > SIZ) mov = 9;
      
      if (identity.age >= 40 && identity.age <= 49) mov -= 1;
      else if (identity.age >= 50 && identity.age <= 59) mov -= 2;
      else if (identity.age >= 60 && identity.age <= 69) mov -= 3;
      else if (identity.age >= 70 && identity.age <= 79) mov -= 4;
      else if (identity.age >= 80) mov -= 5;

      setDerivedStats({
        hp: { current: hpMax, max: hpMax },
        mp: { current: mpMax, max: mpMax },
        sanity: { current: sanStart, max: 99, start: sanStart },
        luck: { current: luck, max: 99 },
        build,
        db,
        mov
      });
    }
  }, [step, attributes, identity.age]);

  const handleSave = async () => {
    setLoading(true);
    
    const finalSkills = skills.map(s => {
      const assigned = skillAssignments[s.name];
      if (assigned) {
        return { ...s, value: assigned, occupation: selectedOccupationalSkills.includes(s.name) || s.name === 'Nível de Crédito' };
      }
      return s;
    });

    // Calculate Finances based on Credit Rating
    const creditRatingSkill = finalSkills.find(s => s.name === 'Nível de Crédito');
    const cr = creditRatingSkill ? creditRatingSkill.value : 0;
    
    let cash = 0;
    let assets = 0;
    let spending_level = 0;

    if (cr === 0) {
      cash = 0.5;
      assets = 0;
      spending_level = 0.5;
    } else if (cr <= 9) {
      cash = cr * 1;
      assets = cr * 10;
      spending_level = 2;
    } else if (cr <= 49) {
      cash = cr * 2;
      assets = cr * 50;
      spending_level = 10;
    } else if (cr <= 89) {
      cash = cr * 5;
      assets = cr * 500;
      spending_level = 50;
    } else if (cr <= 98) {
      cash = cr * 20;
      assets = cr * 2000;
      spending_level = 250;
    } else {
      // CR 99
      cash = 50000;
      assets = 5000000;
      spending_level = 5000;
    }

    const payload: Investigator = {
      name: identity.name,
      player_name: identity.player_name,
      occupation: identity.occupation,
      age: Number(identity.age),
      attributes,
      skills: finalSkills,
      derived_stats: derivedStats!,
      finances: { cash, assets, spending_level },
      inventory: [],
      backstory: identity.backstory,
      portrait_url: ''
    };

    try {
      const created = storage.createInvestigator(payload);
      navigate(`/sheet/${created.id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const isStep1Valid = identity.name && identity.occupation && identity.age;
  const isStep2Valid = Object.values(attributes).every((v: number) => v > 0);
  const isStep3Valid = selectedOccupationalSkills.length === 8 && Object.keys(skillAssignments).length === 9; 

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-serif font-bold text-emerald-500">Criar Investigador</h1>
          <div className="text-sm text-slate-400">Passo {step + 1} de 4</div>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800">
          <div 
            className="h-full rounded-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <Card className="min-h-[400px]">
        <CardContent className="pt-6">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome do Investigador</Label>
                  <Input name="name" value={identity.name} onChange={handleIdentityChange} placeholder="ex. Harvey Walters" />
                </div>
                <div className="space-y-2">
                  <Label>Nome do Jogador</Label>
                  <Input name="player_name" value={identity.player_name} onChange={handleIdentityChange} placeholder="Seu Nome" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ocupação</Label>
                  <select 
                    name="occupation" 
                    value={identity.occupation} 
                    onChange={handleIdentityChange}
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecione uma ocupação...</option>
                    {OCCUPATIONS.map(occ => (
                      <option key={occ.name} value={occ.name}>{occ.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Idade</Label>
                  <Input type="number" name="age" value={identity.age} onChange={handleIdentityChange} min={15} max={90} />
                </div>
              </div>
              
              {selectedOccupationData && (
                <div className="rounded-md bg-slate-800/50 p-4 border border-slate-700">
                  <h4 className="font-medium text-emerald-400 mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Detalhes da Ocupação
                  </h4>
                  <div className="text-sm text-slate-300 space-y-2">
                    <p><strong>Perícias Sugeridas:</strong> {selectedOccupationData.skills.join(", ")}</p>
                    <p><strong>Nível de Crédito:</strong> {selectedOccupationData.creditRating[0]} - {selectedOccupationData.creditRating[1]}</p>
                    <p><strong>Pontos de Perícia:</strong> {selectedOccupationData.pointsFormula}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>História / Notas</Label>
                <textarea 
                  name="backstory"
                  value={identity.backstory}
                  onChange={handleIdentityChange}
                  className="flex min-h-[100px] w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Breve história..."
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Atribua os valores: 40, 50, 50, 50, 60, 60, 70, 80</p>
                <Button variant="ghost" size="sm" onClick={autoAssignAttributes} type="button">
                  <RefreshCw className="mr-2 h-4 w-4" /> Auto-Atribuir
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(Object.keys(attributes) as Array<keyof Attributes>).map((stat) => (
                  <div key={stat} className="space-y-2">
                    <Label className="uppercase font-mono text-emerald-500">{stat}</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={attributes[stat]}
                      onChange={(e) => handleAttributeAssign(stat, Number(e.target.value))}
                    >
                      <option value={0}>-</option>
                      {(attributes[stat] as number) > 0 && <option value={attributes[stat]}>{attributes[stat]}</option>}
                      {getUnusedAttributeValues(stat).map((val, i) => (
                        <option key={`${val}-${i}`} value={val}>{val}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              
              <div className="rounded-md bg-slate-800/50 p-4 text-sm text-slate-400">
                <p><strong>Nota:</strong> Modificadores de idade são aplicados automaticamente nas estatísticas derivadas.</p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-emerald-400">Selecione Perícias Ocupacionais</h3>
                <p className="text-sm text-slate-400">Escolha mais {8 - selectedOccupationalSkills.length} perícias. Nível de Crédito é incluído automaticamente.</p>
                {selectedOccupationData && (
                  <p className="text-xs text-slate-500 mt-1">Sugeridas: {selectedOccupationData.skills.join(", ")}</p>
                )}
              </div>

              <div className="grid h-[300px] grid-cols-1 gap-2 overflow-y-auto pr-2 sm:grid-cols-2 md:grid-cols-3">
                {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill) => (
                  <div 
                    key={skill.name}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-md border border-slate-700 p-2 text-sm transition-colors hover:bg-slate-800",
                      selectedOccupationalSkills.includes(skill.name) && "border-emerald-500 bg-emerald-900/20",
                      skill.name === 'Nível de Crédito' && "opacity-75 cursor-not-allowed bg-slate-800"
                    )}
                    onClick={() => toggleOccupationalSkill(skill.name)}
                  >
                    <span>{skill.name}</span>
                    {skill.name === 'Nível de Crédito' && <span className="text-xs text-emerald-500">Fixo</span>}
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-4">
                <h3 className="mb-2 text-lg font-medium text-emerald-400">Atribuir Valores</h3>
                <p className="mb-4 text-sm text-slate-400">Distribua: 1x70%, 2x60%, 3x50%, 3x40%</p>
                
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {['Nível de Crédito', ...selectedOccupationalSkills].map(skillName => (
                    <div key={skillName} className="space-y-1">
                      <Label className="text-xs truncate block" title={skillName}>{skillName}</Label>
                      <select
                        className="flex h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={skillAssignments[skillName] || 0}
                        onChange={(e) => handleSkillValueAssign(skillName, Number(e.target.value))}
                      >
                        <option value={0}>-</option>
                        {skillAssignments[skillName] && <option value={skillAssignments[skillName]}>{skillAssignments[skillName]}%</option>}
                        {getUnusedSkillValues(skillName).map((val, i) => (
                          <option key={`${val}-${i}`} value={val}>{val}%</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && derivedStats && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-serif font-bold text-emerald-500">Atributos</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(attributes).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-slate-800 py-1">
                        <span className="text-slate-400">{key}</span>
                        <span className="font-mono">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-serif font-bold text-emerald-500">Estatísticas Derivadas</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Pontos de Vida</span><span className="font-mono text-red-400">{derivedStats.hp.max}</span></div>
                    <div className="flex justify-between"><span>Sanidade</span><span className="font-mono text-emerald-400">{derivedStats.sanity.start}</span></div>
                    <div className="flex justify-between"><span>Sorte</span><span className="font-mono text-amber-400">{derivedStats.luck.current}</span></div>
                    <div className="flex justify-between"><span>Pontos de Magia</span><span className="font-mono text-blue-400">{derivedStats.mp.max}</span></div>
                    <div className="flex justify-between"><span>Corpo</span><span className="font-mono">{derivedStats.build}</span></div>
                    <div className="flex justify-between"><span>Dano Extra</span><span className="font-mono">{derivedStats.db}</span></div>
                    <div className="flex justify-between"><span>Movimento</span><span className="font-mono">{derivedStats.mov}</span></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 text-lg font-serif font-bold text-emerald-500">Perícias Ocupacionais</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(skillAssignments).map(([name, val]) => (
                    <span key={name} className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700">
                      {name}: <span className="ml-1 text-emerald-400">{val}%</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button 
          variant="secondary" 
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        
        {step < 3 ? (
          <Button 
            onClick={() => setStep(s => Math.min(3, s + 1))}
            disabled={
              (step === 0 && !isStep1Valid) ||
              (step === 1 && !isStep2Valid) ||
              (step === 2 && !isStep3Valid)
            }
          >
            Próximo <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSave} isLoading={loading}>
            <Save className="mr-2 h-4 w-4" /> Criar Investigador
          </Button>
        )}
      </div>
    </div>
  );
}
