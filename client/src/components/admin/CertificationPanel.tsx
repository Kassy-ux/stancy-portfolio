import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Award, Calendar, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { certificationApi } from '../../services/adminApi';
import type { Certification } from '../../types';

import { INP, LBL, BTN_PRIMARY, BTN_GHOST } from './adminStyles';

type Form = { issuer: string; certificateName: string; description: string; issueDate: string; expiryDate: string; certificateUrl: string; order: string };
const blank: Form = { issuer: '', certificateName: '', description: '', issueDate: '', expiryDate: '', certificateUrl: '', order: '0' };
const toForm = (c: Certification): Form => ({ 
  issuer: c.issuer, 
  certificateName: c.certificateName, 
  description: c.description ?? '', 
  issueDate: c.issueDate, 
  expiryDate: c.expiryDate ?? '', 
  certificateUrl: c.certificateUrl ?? '', 
  order: String(c.order) 
});
const fromForm = (f: Form) => ({ 
  issuer: f.issuer, 
  certificateName: f.certificateName, 
  description: f.description || null, 
  issueDate: f.issueDate, 
  expiryDate: f.expiryDate || null, 
  certificateUrl: f.certificateUrl || null, 
  order: Number(f.order) || 0 
});

export default function CertificationPanel() {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [form, setForm] = useState<Form>(blank);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = async () => {
    try { setLoading(true); setItems(await certificationApi.getAll()); }
    catch { toast.error('Failed to load certifications'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm(blank); setEditing(null); setModal(true); };
  const openEdit = (c: Certification) => { setForm(toForm(c)); setEditing(c); setModal(true); };

  const handleSave = async () => {
    if (!form.issuer.trim() || !form.certificateName.trim()) { toast.error('Issuer and Certificate Name are required'); return; }
    const id = toast.loading(editing ? 'Saving...' : 'Creating...');
    try {
      setSaving(true);
      if (editing) await certificationApi.update(editing.id, fromForm(form));
      else await certificationApi.create(fromForm(form));
      toast.success(editing ? 'Certification updated' : 'Certification created', { id });
      setModal(false); await load();
    } catch (e: unknown) { toast.error((e as Error).message || 'Save failed', { id }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (cid: number) => {
    const id = toast.loading('Deleting...');
    try { await certificationApi.delete(cid); toast.success('Deleted', { id }); setDeleteId(null); await load(); }
    catch { toast.error('Delete failed', { id }); }
  };

  const sf = (k: keyof Form, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#8892A4] text-sm">{items.length} certification{items.length !== 1 ? 's' : ''}</p>
        <button onClick={openAdd} className={BTN_PRIMARY}><Plus size={16} /> Add Certification</button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={28} className="text-[#1A56FF] animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-[#8892A4] text-sm bg-white rounded-2xl border border-[#E6EAF4]">No certifications yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-[#E6EAF4] shadow-sm p-5 hover:border-[#1A56FF]/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#1A56FF]/5 flex items-center justify-center text-[#1A56FF]">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-[#0A0A0F] font-bold text-base truncate">{c.certificateName}</h4>
                      <p className="text-[#1A56FF] font-semibold text-xs tracking-wider uppercase">{c.issuer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#8892A4]">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {c.issueDate}</span>
                    {c.expiryDate && <span className="flex items-center gap-1">• Expires: {c.expiryDate}</span>}
                    {c.certificateUrl && (
                      <a href={c.certificateUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#1A56FF] hover:underline font-medium ml-auto">
                        View <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                  
                  {c.description && (
                    <p className="mt-3 text-sm text-[#8892A4] leading-relaxed line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button onClick={() => openEdit(c)} className={BTN_GHOST}><Pencil size={15} /></button>
                  {deleteId === c.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(c.id)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">Del</button>
                      <button onClick={() => setDeleteId(null)} className="px-2.5 py-1.5 text-[#8892A4] rounded-lg text-xs">Esc</button>
                    </div>
                  ) : <button onClick={() => setDeleteId(c.id)} className="p-2 text-[#8892A4] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#E6EAF4] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E6EAF4]">
              <h2 className="text-[#0A0A0F] font-bold text-xl">{editing ? 'Edit Certification' : 'New Certification'}</h2>
              <button onClick={() => setModal(false)} className={BTN_GHOST}><X size={20} /></button>
            </div>
            <div className="p-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <div><label className={LBL}>Issuer *</label><input className={INP} value={form.issuer} onChange={e => sf('issuer', e.target.value)} placeholder="e.g. Google, AWS, Microsoft" /></div>
                <div><label className={LBL}>Certificate Name *</label><input className={INP} value={form.certificateName} onChange={e => sf('certificateName', e.target.value)} placeholder="e.g. Cloud Architect Professional" /></div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div><label className={LBL}>Issue Date *</label><input className={INP} value={form.issueDate} onChange={e => sf('issueDate', e.target.value)} placeholder="e.g. Jan 2024" /></div>
                <div><label className={LBL}>Expiry Date</label><input className={INP} value={form.expiryDate} onChange={e => sf('expiryDate', e.target.value)} placeholder="e.g. Jan 2026 or No Expiry" /></div>
              </div>
              <div><label className={LBL}>Certificate URL</label><input className={INP} value={form.certificateUrl} onChange={e => sf('certificateUrl', e.target.value)} placeholder="https://..." /></div>
              <div><label className={LBL}>Description</label><textarea className={`${INP} resize-none`} rows={3} value={form.description} onChange={e => sf('description', e.target.value)} placeholder="Briefly describe what you achieved..." /></div>
              <div><label className={LBL}>Order</label><input type="number" className={INP} value={form.order} onChange={e => sf('order', e.target.value)} /></div>
            </div>
            <div className="px-8 pb-8 flex justify-end gap-3">
              <button onClick={() => setModal(false)} className="px-6 py-3 text-sm text-[#8892A4] hover:text-[#0A0A0F] rounded-2xl hover:bg-[#F4F6FF] transition-colors font-semibold">Cancel</button>
              <button onClick={handleSave} disabled={saving} className={`${BTN_PRIMARY} px-8 disabled:opacity-60`}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {editing ? 'Save Changes' : 'Create Certification'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
