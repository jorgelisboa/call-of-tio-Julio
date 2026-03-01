import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Investigator } from '@/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Plus, Skull, FileText, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { storage } from '@/services/storage';

export default function Dashboard() {
  const [investigators, setInvestigators] = useState<Investigator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = storage.getInvestigators();
    setInvestigators(data);
    setLoading(false);
  }, []);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (!confirm('Are you sure you want to delete this investigator? This cannot be undone.')) return;

    try {
      storage.deleteInvestigator(id);
      setInvestigators(investigators.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Skull className="h-12 w-12 animate-pulse text-emerald-700" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-emerald-500">Dossiê do Investigador</h1>
          <p className="text-slate-400 mt-2">Gerencie seus investigadores de Call of Cthulhu.</p>
        </div>
        <Link to="/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Investigador
          </Button>
        </Link>
      </div>

      {investigators.length === 0 ? (
        <Card className="border-dashed border-slate-700 bg-slate-900/30">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Skull className="mb-4 h-12 w-12 text-slate-600" />
            <h3 className="text-xl font-medium text-slate-300">Nenhum investigador encontrado</h3>
            <p className="mt-2 text-slate-500 max-w-sm">
              Os arquivos estão vazios. Crie seu primeiro investigador para começar a descida à loucura.
            </p>
            <Link to="/create" className="mt-6">
              <Button variant="secondary">Criar Investigador</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {investigators.map((inv) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/sheet/${inv.id}`}>
                <Card className="h-full transition-all hover:border-emerald-500/50 hover:bg-slate-800/80 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="danger" size="icon" className="h-8 w-8 p-0" onClick={(e) => handleDelete(inv.id!, e)}>
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-emerald-400 transition-colors">{inv.name}</CardTitle>
                    <p className="text-sm text-slate-400">{inv.occupation}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex justify-between">
                        <span>Jogador:</span>
                        <span className="font-medium text-slate-200">{inv.player_name || 'Desconhecido'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Idade:</span>
                        <span className="font-medium text-slate-200">{inv.age}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-slate-500 uppercase">SAN</span>
                          <span className="font-mono font-bold text-emerald-500">{inv.derived_stats.sanity.current}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-slate-500 uppercase">VIDA</span>
                          <span className="font-mono font-bold text-red-400">{inv.derived_stats.hp.current}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-slate-500 uppercase">SORTE</span>
                          <span className="font-mono font-bold text-amber-400">{inv.derived_stats.luck.current}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
