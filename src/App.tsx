import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Creator from '@/pages/Creator';
import Sheet from '@/pages/Sheet';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<Creator />} />
          <Route path="/sheet/:id" element={<Sheet />} />
        </Routes>
      </div>
    </Router>
  );
}
