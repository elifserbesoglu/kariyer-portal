import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import { Building2, CheckCircle2, XCircle, ExternalLink, ShieldCheck, Eye, AlertTriangle } from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';
import type { WorkflowCompany } from '../../context/WorkflowContext';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';

export const CompanyApprovalPool: React.FC = () => {
  const { companies, approveCompany, rejectCompany } = useWorkflow();
  const { user } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState<WorkflowCompany | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');

  const pendingList = companies.filter((c) => {
    const isPending = c.approvalStatus === 'PendingApproval';
    const matchesSearch = c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.taxNumber.includes(searchQuery) ||
      c.authorizedPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = sectorFilter === 'ALL' || c.sector === sectorFilter;
    return isPending && matchesSearch && matchesSector;
  });

  const uniqueSectors = Array.from(new Set(companies.map((c) => c.sector)));
  const canApprove = hasPermission(user?.role, 'Companies.Approve');

  const handleApprove = (companyId: string) => {
    if (!canApprove) {
      alert('Bu işlemi gerçekleştirmek için "Companies.Approve" yetkiniz bulunmamaktadır.');
      return;
    }
    approveCompany(companyId, user?.email || 'admin@ktun.edu.tr', actionNotes);
    setAlertMsg({ type: 'success', text: 'Firma vergi kimliği onaylandı ve Audit Log kaydı oluşturuldu. İşveren hesabı aktifleştirildi.' });
    setSelectedCompany(null);
    setActionNotes('');
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleReject = (companyId: string) => {
    if (!canApprove) {
      alert('Bu işlemi gerçekleştirmek için "Companies.Approve" yetkiniz bulunmamaktadır.');
      return;
    }
    if (!actionNotes.trim()) {
      alert('Lütfen reddetme gerekçesini not alanına yazınız.');
      return;
    }
    rejectCompany(companyId, user?.email || 'admin@ktun.edu.tr', actionNotes);
    setAlertMsg({ type: 'error', text: 'Firma başvurusu reddedildi ve Audit Log ile gerekçeli bildirim iletildi.' });
    setSelectedCompany(null);
    setActionNotes('');
    setTimeout(() => setAlertMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span>Firma Onay Havuzu & VKN İnceleme (Review Screen)</span>
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 px-2.5 py-0.5 rounded-full">
              {pendingList.length} Onay Bekleyen
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Sisteme kaydolan kurumların vergi levhalarını, vergi dairesini, yetkili kişisini ve risk durumunu inceleyin.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Firma adı, VKN veya yetkili ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="font-bold text-slate-500">Sektör Filtresi:</span>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white"
          >
            <option value="ALL">Tüm Sektörler</option>
            {uniqueSectors.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {alertMsg && (
        <Alert variant={alertMsg.type === 'success' ? 'success' : 'error'} title="İş Akışı İşlemi">
          {alertMsg.text}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pendingList.map((company) => (
          <div
            key={company.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 relative hover:border-burgundy-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-white font-bold flex items-center justify-center text-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {company.companyName}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">{company.sector}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs space-y-1 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
              <div>VKN: <strong className="text-slate-900 dark:text-white">{company.taxNumber}</strong> ({company.taxOffice})</div>
              <div>Yetkili: <strong className="text-slate-900 dark:text-white">{company.authorizedPerson}</strong></div>
              <div>Telefon: {company.phone}</div>
              <div>Risk Seviyesi: <strong className="text-emerald-600">{company.riskLevel || 'Düşük'}</strong></div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setSelectedCompany(company)}
              leftIcon={<Eye className="w-4 h-4" />}
            >
              Firma Detayını Gör & İncele
            </Button>
          </div>
        ))}

        {pendingList.length === 0 && (
          <div className="col-span-full p-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
            <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Bekleyen Firma Onayı Bulunmuyor</h4>
            <p className="text-xs text-slate-500">Tüm firma başvuruları incelenmiş ve onaylanmıştır.</p>
          </div>
        )}
      </div>

      {selectedCompany && (
        <Modal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          title={`Firma İnceleme Ekranı: ${selectedCompany.companyName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border">
              <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                <span>{selectedCompany.companyName}</span>
                <span className="text-burgundy-700">{selectedCompany.sector}</span>
              </div>
              <p><strong>Vergi Dairesi & VKN:</strong> {selectedCompany.taxOffice} — {selectedCompany.taxNumber}</p>
              <p><strong>Yetkili İletişim:</strong> {selectedCompany.authorizedPerson} ({selectedCompany.email} | {selectedCompany.phone})</p>
              <p><strong>Güvenlik & Risk Durumu:</strong> <span className="text-emerald-600 font-bold">Düşük Risk (Doğrulanmış VKN)</span></p>
            </div>

            <div className="space-y-1">
              <span className="font-bold block text-slate-700 dark:text-slate-300">Kurumsal Vergi Levhası Belgesi:</span>
              <div className="h-44 rounded-xl border overflow-hidden relative group">
                <img src={selectedCompany.taxDocumentUrl} alt="Vergi Levhası" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={selectedCompany.taxDocumentUrl} target="_blank" rel="noreferrer" className="text-white font-bold underline flex items-center gap-1">
                    Vergi Levhasını İncele (Yüksek Çözünürlük) <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">Değerlendirme Notu / Red Gerekçesi</label>
              <textarea
                className="w-full p-2.5 rounded-lg border text-xs bg-white dark:bg-slate-900"
                rows={3}
                placeholder="Onay veya ret durumunda işverene iletilecek notu yazınız..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
              />
            </div>

            <div className="pt-3 border-t flex justify-end gap-3">
              {canApprove ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => handleReject(selectedCompany.id)}
                    leftIcon={<XCircle className="w-4 h-4" />}
                  >
                    Başvuruyu Reddet
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(selectedCompany.id)}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Firmayı Onayla & İşveren Hesabını Aç
                  </Button>
                </>
              ) : (
                <div className="p-2 bg-amber-50 text-amber-800 text-[11px] rounded flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-4 h-4" /> Bu işlem için "Companies.Approve" yetkisine sahip olmalısınız.
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
