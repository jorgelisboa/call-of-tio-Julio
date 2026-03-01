import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Investigator, Skill, Attributes } from '@/types';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Label } from '@/components/ui';
import { ArrowLeft, Dices, Heart, Brain, Zap, Shield, Save, DollarSign, Briefcase, Wallet, Pencil, X, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ITEMS, Item } from '@/data/items';

import { storage } from '@/services/storage';

export default function Sheet() {
  const { id } = useParams();
  const [investigator, setInvestigator] = useState<Investigator | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingHistory, setIsEditingHistory] = useState(false);
  const [diceResult, setDiceResult] = useState<{ roll: number, result: string, target: number } | null>(null);
  
  // Item Shop State
  const [showShop, setShowShop] = useState(false);
  const [shopEra, setShopEra] = useState<'1920s' | 'Modern'>('1920s');
  const [shopSearch, setShopSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'assets'>('cash');

  useEffect(() => {
    if (!id) return;
    const data = storage.getInvestigator(Number(id));
    if (data) {
      setInvestigator(data);
    } else {
      console.error('Investigator not found');
    }
    setLoading(false);
  }, [id]);

  const handleIdentityChange = (field: keyof Investigator, value: string | number) => {
    if (!investigator) return;
    setInvestigator({ ...investigator, [field]: value });
  };

  const handleAttributeChange = (attr: keyof Attributes, value: number) => {
    if (!investigator) return;
    setInvestigator({
      ...investigator,
      attributes: { ...investigator.attributes, [attr]: value }
    });
  };

  const handleSkillChange = (index: number, value: number) => {
    if (!investigator) return;
    const newSkills = [...investigator.skills];
    newSkills[index] = { ...newSkills[index], value };
    setInvestigator({ ...investigator, skills: newSkills });
  };

  const handleStatChange = (category: 'hp' | 'sanity' | 'luck' | 'mp', field: 'current', value: number) => {
    if (!investigator) return;
    setInvestigator({
      ...investigator,
      derived_stats: {
        ...investigator.derived_stats,
        [category]: { ...investigator.derived_stats[category], [field]: value }
      }
    });
  };

  const handleFinanceChange = (field: 'cash' | 'assets' | 'spending_level', value: number) => {
    if (!investigator) return;
    setInvestigator({
      ...investigator,
      finances: {
        ...investigator.finances,
        [field]: value
      }
    });
  };

  const handleBuyItem = (item: Item) => {
    if (!investigator) return;
    
    const cost = item.price;
    const currentFunds = investigator.finances[paymentMethod];

    if (currentFunds < cost) {
      alert(`Fundos insuficientes em ${paymentMethod === 'cash' ? 'Dinheiro' : 'Patrimônio'}!`);
      return;
    }

    // Deduct funds
    const newFinances = {
      ...investigator.finances,
      [paymentMethod]: parseFloat((currentFunds - cost).toFixed(2))
    };

    // Add to inventory
    const newInventory = [...(investigator.inventory || [])];
    const existingItemIndex = newInventory.findIndex(i => i.name === item.name);
    
    if (existingItemIndex >= 0) {
      newInventory[existingItemIndex].quantity += 1;
    } else {
      newInventory.push({
        name: item.name,
        category: item.category,
        damage: item.damage,
        quantity: 1
      });
    }
    
    setInvestigator({
      ...investigator,
      finances: newFinances,
      inventory: newInventory
    });
    
    // Auto-save
    try {
      storage.updateInvestigator(investigator.id!, {
        ...investigator,
        finances: newFinances,
        inventory: newInventory
      });
    } catch (err) {
      console.error("Erro ao salvar compra:", err);
      alert("Erro ao salvar compra! Verifique o console.");
    }
  };

  const handleSave = async () => {
    if (!investigator) return;
    setSaving(true);
    try {
      storage.updateInvestigator(investigator.id!, investigator);
      setSaving(false);
      setIsEditing(false);
      setIsEditingHistory(false);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  const rollDice = (target: number, label: string) => {
    const roll = Math.floor(Math.random() * 100) + 1;
    let result = '';
    
    if (roll === 1) result = 'Critical Success';
    else if (roll <= Math.floor(target / 5)) result = 'Extreme Success';
    else if (roll <= Math.floor(target / 2)) result = 'Hard Success';
    else if (roll <= target) result = 'Success';
    else if (roll === 100 || (target < 50 && roll >= 96)) result = 'Fumble';
    else result = 'Failure';

    setDiceResult({ roll, result, target });
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-emerald-500">Carregando Dossiê...</div>;
  if (!investigator) return <div className="flex h-screen items-center justify-center text-red-500">Investigador não encontrado</div>;

  const { attributes, skills, derived_stats } = investigator;

  const categories = ['Todos', ...Array.from(new Set(ITEMS.filter(i => i.era === shopEra).map(i => i.category)))];

  const filteredItems = ITEMS.filter(item => 
    item.era === shopEra && 
    (selectedCategory === 'Todos' || item.category === selectedCategory) &&
    item.name.toLowerCase().includes(shopSearch.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-6xl p-4 pb-20 relative">
      {/* Shop Modal */}
      <AnimatePresence>
        {showShop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-950">
                <h2 className="text-xl font-serif font-bold text-emerald-500 flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Catálogo de Itens
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setShowShop(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-4 space-y-4 bg-slate-900">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                    <Input 
                      placeholder="Buscar item..." 
                      className="pl-8" 
                      value={shopSearch}
                      onChange={(e) => setShopSearch(e.target.value)}
                    />
                  </div>
                  <select 
                    className="h-10 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={shopEra}
                    onChange={(e) => {
                      setShopEra(e.target.value as '1920s' | 'Modern');
                      setSelectedCategory('Todos');
                    }}
                  >
                    <option value="1920s">Década de 1920</option>
                    <option value="Modern">Dias Modernos</option>
                  </select>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors border",
                        selectedCategory === cat
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                  <span className="text-sm text-slate-400">Método de Pagamento:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPaymentMethod('cash')}
                      className={cn(
                        "px-3 py-1 rounded text-sm font-medium transition-colors border",
                        paymentMethod === 'cash' 
                          ? "bg-emerald-900/50 border-emerald-500 text-emerald-400" 
                          : "bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700"
                      )}
                    >
                      Dinheiro (${investigator.finances.cash})
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('assets')}
                      className={cn(
                        "px-3 py-1 rounded text-sm font-medium transition-colors border",
                        paymentMethod === 'assets' 
                          ? "bg-blue-900/50 border-blue-500 text-blue-400" 
                          : "bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700"
                      )}
                    >
                      Patrimônio (${investigator.finances.assets})
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">Nenhum item encontrado.</div>
                ) : (
                  filteredItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-600 transition-colors">
                      <div>
                        <div className="font-medium text-slate-200">
                          {item.name}
                          {item.damage && <span className="ml-2 text-xs text-red-400 font-mono">({item.damage})</span>}
                        </div>
                        <div className="text-xs text-slate-500">{item.category}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-emerald-400">${item.price.toFixed(2)}</span>
                        <Button size="sm" variant="secondary" onClick={() => handleBuyItem(item)}>
                          Comprar
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sticky top-0 z-10 bg-[#0f172a]/95 backdrop-blur py-4 border-b border-slate-800">
        <div className="flex items-center gap-4 w-full">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div className="flex-1">
            {isEditing ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <Input 
                  value={investigator.name} 
                  onChange={(e) => handleIdentityChange('name', e.target.value)}
                  className="font-serif font-bold text-emerald-500 h-9"
                  placeholder="Nome do Investigador"
                />
                <div className="flex gap-2">
                  <Input 
                    value={investigator.occupation} 
                    onChange={(e) => handleIdentityChange('occupation', e.target.value)}
                    className="text-sm h-9"
                    placeholder="Ocupação"
                  />
                  <Input 
                    type="number"
                    value={investigator.age} 
                    onChange={(e) => handleIdentityChange('age', Number(e.target.value))}
                    className="text-sm h-9 w-20"
                    placeholder="Idade"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-serif font-bold text-emerald-500">{investigator.name}</h1>
                <p className="text-sm text-slate-400">{investigator.occupation} • {investigator.age} anos</p>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="mr-2 h-4 w-4" /> Cancelar
              </Button>
              <Button variant="primary" onClick={handleSave} isLoading={saving}>
                <Save className="mr-2 h-4 w-4" /> Salvar
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </Button>
          )}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Stats & Vitals */}
        <div className="space-y-6 lg:col-span-4">
          {/* Vitals */}
          <Card>
            <CardHeader><CardTitle>Vitais</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-950 p-3 text-center border border-slate-800">
                  <div className="mb-1 flex items-center justify-center gap-2 text-xs font-bold uppercase text-red-400">
                    <Heart className="h-3 w-3" /> Vida
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Input 
                      type="number" 
                      className="h-8 w-16 text-center font-mono text-lg" 
                      value={derived_stats.hp.current}
                      onChange={(e) => handleStatChange('hp', 'current', Number(e.target.value))}
                    />
                    <span className="text-slate-500">/ {derived_stats.hp.max}</span>
                  </div>
                </div>
                <div className="rounded-lg bg-slate-950 p-3 text-center border border-slate-800">
                  <div className="mb-1 flex items-center justify-center gap-2 text-xs font-bold uppercase text-emerald-400">
                    <Brain className="h-3 w-3" /> Sanidade
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Input 
                      type="number" 
                      className="h-8 w-16 text-center font-mono text-lg" 
                      value={derived_stats.sanity.current}
                      onChange={(e) => handleStatChange('sanity', 'current', Number(e.target.value))}
                    />
                    <span className="text-slate-500">/ 99</span>
                  </div>
                </div>
                <div className="rounded-lg bg-slate-950 p-3 text-center border border-slate-800">
                  <div className="mb-1 flex items-center justify-center gap-2 text-xs font-bold uppercase text-amber-400">
                    <Dices className="h-3 w-3" /> Sorte
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Input 
                      type="number" 
                      className="h-8 w-16 text-center font-mono text-lg" 
                      value={derived_stats.luck.current}
                      onChange={(e) => handleStatChange('luck', 'current', Number(e.target.value))}
                    />
                    <span className="text-slate-500">/ 99</span>
                  </div>
                  <Button variant="ghost" size="xs" className="mt-1 h-6 w-full text-[10px]" onClick={() => rollDice(derived_stats.luck.current, 'Sorte')}>Rolar Sorte</Button>
                </div>
                <div className="rounded-lg bg-slate-950 p-3 text-center border border-slate-800">
                  <div className="mb-1 flex items-center justify-center gap-2 text-xs font-bold uppercase text-blue-400">
                    <Zap className="h-3 w-3" /> Magia
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Input 
                      type="number" 
                      className="h-8 w-16 text-center font-mono text-lg" 
                      value={derived_stats.mp.current}
                      onChange={(e) => handleStatChange('mp', 'current', Number(e.target.value))}
                    />
                    <span className="text-slate-500">/ {derived_stats.mp.max}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Characteristics */}
          <Card>
            <CardHeader><CardTitle>Atributos</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(attributes).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between rounded bg-slate-800 px-3 py-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-400">{key}</span>
                      <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                        <span title="Metade">½: {Math.floor(val / 2)}</span>
                        <span title="Um quinto">⅕: {Math.floor(val / 5)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input 
                          type="number" 
                          className="h-7 w-14 text-center font-mono font-bold" 
                          value={val}
                          onChange={(e) => handleAttributeChange(key as keyof Attributes, Number(e.target.value))}
                        />
                      ) : (
                        <span className="font-mono text-lg font-bold text-white">{val}</span>
                      )}
                      {!isEditing && (
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => rollDice(val as number, key)}>
                          <Dices className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
                <div className="rounded bg-slate-900 p-2">
                  <div className="uppercase">Mov</div>
                  <div className="text-lg font-bold text-white">{derived_stats.mov}</div>
                </div>
                <div className="rounded bg-slate-900 p-2">
                  <div className="uppercase">Corpo</div>
                  <div className="text-lg font-bold text-white">{derived_stats.build}</div>
                </div>
                <div className="rounded bg-slate-900 p-2">
                  <div className="uppercase">Dano Extra</div>
                  <div className="text-lg font-bold text-white">{derived_stats.db}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finances */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Finanças</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowShop(true)}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Comprar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center"><Wallet className="h-4 w-4 mr-2" /> Dinheiro (Cash)</span>
                  <span className="text-emerald-500 font-mono">$</span>
                </div>
                <Input 
                  type="number" 
                  value={investigator.finances?.cash ?? 0}
                  onChange={(e) => handleFinanceChange('cash', Number(e.target.value))}
                  className="font-mono text-lg"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center"><Briefcase className="h-4 w-4 mr-2" /> Patrimônio</span>
                  <span className="text-emerald-500 font-mono">$</span>
                </div>
                <Input 
                  type="number" 
                  value={investigator.finances?.assets ?? 0}
                  onChange={(e) => handleFinanceChange('assets', Number(e.target.value))}
                  className="font-mono text-lg"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center"><DollarSign className="h-4 w-4 mr-2" /> Nível de Gastos</span>
                  <span className="text-emerald-500 font-mono">$</span>
                </div>
                <div className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 font-mono text-lg text-slate-100">
                  {investigator.finances?.spending_level ?? 0}
                </div>
                <p className="text-[10px] text-slate-500">Gastos diários abaixo deste valor não requerem registro.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Skills & Dice Log */}
        <div className="space-y-6 lg:col-span-8">
           {/* Dice Result Overlay/Panel */}
           {diceResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-900/20 p-4 text-center"
            >
              <div className="text-sm text-emerald-400 uppercase tracking-wider">Resultado (Alvo: {diceResult.target})</div>
              <div className="my-2 text-5xl font-bold text-white">{diceResult.roll}</div>
              <div className={cn(
                "text-lg font-bold",
                diceResult.result.includes('Success') ? "text-emerald-400" : "text-red-400"
              )}>
                {diceResult.result}
              </div>
            </motion.div>
          )}

          <Card>
            <CardHeader><CardTitle>Perícias</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className={cn(
                      "group flex items-center justify-between border-b border-slate-800 py-1 text-sm hover:bg-slate-800/50 px-2 rounded transition-colors",
                      skill.occupation && "text-emerald-200"
                    )}
                  >
                    <span className={cn("truncate flex-1", skill.occupation && "font-medium")}>
                      {skill.name} {skill.occupation && <span className="ml-1 text-[10px] text-emerald-600">•</span>}
                    </span>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input 
                          type="number" 
                          className="h-6 w-12 text-center font-mono text-xs px-1" 
                          value={skill.value}
                          onChange={(e) => handleSkillChange(index, Number(e.target.value))}
                        />
                      ) : (
                        <span className="font-mono font-bold text-slate-300">{skill.value}%</span>
                      )}
                      {!isEditing && (
                        <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => rollDice(skill.value, skill.name)}>
                          <Dices className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Inventário</CardTitle></CardHeader>
            <CardContent>
              {investigator.inventory && investigator.inventory.length > 0 ? (
                <div className="space-y-2">
                  {investigator.inventory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded bg-slate-800 px-3 py-2 text-sm">
                      <div>
                        <span className="font-medium text-slate-200">{item.name}</span>
                        {item.damage && <span className="ml-2 text-xs text-red-400 font-mono">Dano: {item.damage}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">Inventário vazio.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>História</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  if (isEditingHistory) {
                    handleSave();
                  } else {
                    setIsEditingHistory(true);
                  }
                }}
              >
                {isEditingHistory ? (
                  <><Save className="h-4 w-4 mr-2" /> Salvar</>
                ) : (
                  <><Pencil className="h-4 w-4 mr-2" /> Editar</>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditingHistory ? (
                <textarea 
                  className="flex min-h-[200px] w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={investigator.backstory}
                  onChange={(e) => handleIdentityChange('backstory', e.target.value)}
                />
              ) : (
                <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{investigator.backstory || "Nenhuma história registrada."}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
