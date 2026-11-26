import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  LifeBuoy,
  Send,
} from 'lucide-react';
import { FAQ_ITEMS, NAVIGATION_GUIDES, type FaqItem } from '../data/libraryData';

export type SupportTab = 'faq' | 'help';

interface FaqHelpTabsProps {
  activeTab: SupportTab;
  onTabChange: (tab: SupportTab) => void;
}

const FAQ_CATEGORIES: Array<'Semua' | FaqItem['category']> = [
  'Semua',
  'Pencarian & Katalog',
  'Peminjaman Digital',
  'Aksesibilitas',
  'Teknis',
];

export function FaqHelpTabs({ activeTab, onTabChange }: FaqHelpTabsProps) {
  const [faqCategory, setFaqCategory] = useState<'Semua' | FaqItem['category']>('Semua');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Help form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Navigasi Situs & Pencarian');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<{
    code: string;
    topic: string;
    name: string;
  } | null>(null);

  const filteredFaqs =
    faqCategory === 'Semua'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === faqCategory);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Mohon lengkapi nama, alamat email, dan deskripsi kendala Anda.');
      return;
    }
    if (!email.includes('@')) {
      setFormError('Format alamat email belum valid.');
      return;
    }

    setFormError(null);
    const ticketCode = `ML-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      code: ticketCode,
      topic,
      name: name.trim(),
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  const scrollToTarget = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="bantuan"
      aria-labelledby="bantuan-heading"
      className="bg-[#FAF9F6] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Title + Main Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#4A5A75]">
              Pusat Dukungan Pengguna
            </p>
            <h2
              id="bantuan-heading"
              className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#162238] [text-wrap:balance]"
            >
              FAQ & Panduan Bantuan Moon Library
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#4A5A75]">
              Temukan jawaban cepat seputar peminjaman koleksi atau buka tab Help untuk panduan navigasi situs dan bantuan teknis.
            </p>
          </div>

          {/* Primary Tab Switcher: FAQ vs Help */}
          <div
            role="tablist"
            aria-label="Tab dukungan FAQ dan Help"
            className="inline-flex rounded-xl border border-[#DDE4EF] bg-[#EDF2F8] p-1.5 self-start md:self-auto"
          >
            <button
              type="button"
              role="tab"
              id="tab-faq"
              aria-selected={activeTab === 'faq'}
              aria-controls="panel-faq"
              onClick={() => onTabChange('faq')}
              className={`min-h-[42px] inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-white text-[#162238] shadow-sm'
                  : 'text-[#4A5A75] hover:text-[#162238]'
              }`}
            >
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              <span>Tab FAQ</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-help"
              aria-selected={activeTab === 'help'}
              aria-controls="panel-help"
              onClick={() => onTabChange('help')}
              className={`min-h-[42px] inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'help'
                  ? 'bg-white text-[#162238] shadow-sm'
                  : 'text-[#4A5A75] hover:text-[#162238]'
              }`}
            >
              <LifeBuoy className="h-4 w-4" aria-hidden="true" />
              <span>Tab Help & Navigasi</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FAQ PANEL */}
        {activeTab === 'faq' && (
          <div
            id="panel-faq"
            role="tabpanel"
            aria-labelledby="tab-faq"
            className="rounded-xl border border-[#DDE4EF] bg-white p-6 sm:p-8"
          >
            {/* FAQ Category Filter */}
            <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#EEF2F7]">
              {FAQ_CATEGORIES.map((cat) => {
                const active = faqCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFaqCategory(cat)}
                    className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#1D3557] text-white'
                        : 'bg-[#F2F5FA] text-[#4A5A75] hover:bg-[#E4ECF6] hover:text-[#162238]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Accordion Questions */}
            <div className="divide-y divide-[#EEF2F7]">
              {filteredFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id} className="py-4">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                        onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                        className="flex w-full items-start justify-between gap-4 py-2 text-left cursor-pointer group"
                      >
                        <div>
                          <span className="block text-xs font-medium text-[#4A5A75] mb-1">
                            {item.category}
                          </span>
                          <span className="font-display text-base sm:text-lg font-semibold text-[#162238] group-hover:text-[#1D3557]">
                            {item.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`mt-1 h-5 w-5 shrink-0 text-[#4A5A75] transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#1D3557]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={`faq-answer-${item.id}`}
                        className="mt-2 pr-8 text-sm sm:text-base text-[#334155] leading-relaxed max-w-3xl"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-[#EEF2F7] flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-[#4A5A75]">
                Masih membutuhkan bantuan teknis atau panduan langsung?
              </p>
              <button
                type="button"
                onClick={() => onTabChange('help')}
                className="min-h-[42px] rounded-lg border border-[#1D3557] px-4 py-2 text-xs sm:text-sm font-semibold text-[#1D3557] hover:bg-[#1D3557] hover:text-white transition-colors cursor-pointer"
              >
                Buka Tab Help & Bantuan Teknis
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: HELP & NAVIGATION PANEL */}
        {activeTab === 'help' && (
          <div
            id="panel-help"
            role="tabpanel"
            aria-labelledby="tab-help"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column: Site Navigation Guide + Keyboard Shortcuts */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="rounded-xl border border-[#DDE4EF] bg-white p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-[#162238]">
                  Panduan Navigasi Situs
                </h3>
                <p className="mt-1.5 text-sm text-[#4A5A75]">
                  Klik tombol di setiap langkah untuk langsung menuju bagian situs yang ingin Anda gunakan.
                </p>

                <ol className="mt-6 space-y-4">
                  {NAVIGATION_GUIDES.map((step) => (
                    <li
                      key={step.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-[#EEF2F7] bg-[#FAF9F6] p-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs font-mono-num font-semibold text-[#1D3557]">
                          <span>{step.stepNumber}.</span>
                          <span className="font-sans text-sm text-[#162238]">
                            {step.title}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#4A5A75] leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToTarget(step.targetSectionId)}
                        className="min-h-[40px] inline-flex items-center gap-1.5 rounded-lg border border-[#DDE4EF] bg-white px-3.5 py-2 text-xs font-semibold text-[#1D3557] whitespace-nowrap shrink-0 hover:border-[#1D3557] hover:bg-[#F2F5FA] transition-colors cursor-pointer"
                      >
                        <span>{step.actionLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Keyboard Accessibility Shortcuts */}
              <div className="rounded-xl border border-[#DDE4EF] bg-white p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-[#162238]">
                  Pintasan Papan Ketik & Aksesibilitas
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#DDE4EF] text-xs text-[#4A5A75]">
                        <th className="py-2 pr-4 font-semibold">Tombol</th>
                        <th className="py-2 font-semibold">Fungsi Navigasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEF2F7] text-[#334155]">
                      <tr>
                        <td className="py-2.5 pr-4">
                          <kbd className="rounded border border-[#DDE4EF] bg-[#FAF9F6] px-2 py-0.5 font-mono-num text-xs">
                            /
                          </kbd>
                        </td>
                        <td className="py-2.5">Fokus langsung ke kotak pencarian buku</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4">
                          <kbd className="rounded border border-[#DDE4EF] bg-[#FAF9F6] px-2 py-0.5 font-mono-num text-xs">
                            Tab
                          </kbd>
                        </td>
                        <td className="py-2.5">Berpindah antar tautan, tombol filter, dan kartu buku</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4">
                          <kbd className="rounded border border-[#DDE4EF] bg-[#FAF9F6] px-2 py-0.5 font-mono-num text-xs">
                            Esc
                          </kbd>
                        </td>
                        <td className="py-2.5">Menutup jendela pratinjau buku atau panel Daftar Baca</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Technical Support Form */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#DDE4EF] bg-white p-6 sm:p-8 h-full">
                <h3 className="font-display text-xl font-semibold text-[#162238]">
                  Formulir Bantuan Teknis
                </h3>
                <p className="mt-1.5 text-sm text-[#4A5A75]">
                  Laporkan kendala akses buku, usulan judul baru, atau permintaan bantuan aksesibilitas kepada tim pustakawan kami.
                </p>

                {submittedTicket ? (
                  <div
                    role="status"
                    className="mt-6 rounded-lg border border-[#B8D4C2] bg-[#F2F8F4] p-5"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#1F5E3B] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-[#162238]">
                          Laporan Bantuan Diterima
                        </p>
                        <p className="mt-1 text-xs text-[#334155] leading-relaxed">
                          Terima kasih, {submittedTicket.name}. Tiket Anda{' '}
                          <span className="font-mono-num font-semibold">{submittedTicket.code}</span>{' '}
                          untuk topik <strong>{submittedTicket.topic}</strong> telah tercatat dan akan ditindaklanjuti oleh tim layanan Moon Library.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmittedTicket(null)}
                          className="mt-4 min-h-[38px] rounded-lg border border-[#1F5E3B] px-3.5 py-1.5 text-xs font-semibold text-[#1F5E3B] hover:bg-[#1F5E3B] hover:text-white transition-colors cursor-pointer"
                        >
                          Kirim Permintaan Lain
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="mt-6 space-y-4" noValidate>
                    {formError && (
                      <div
                        role="alert"
                        className="rounded-lg border border-[#E5B8B8] bg-[#FDF4F4] px-3.5 py-2.5 text-xs font-medium text-[#7F1D1D]"
                      >
                        {formError}
                      </div>
                    )}

                    <div>
                      <label htmlFor="help-name" className="block text-xs font-semibold text-[#162238] mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        id="help-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Nadia Pratama"
                        className="min-h-[44px] w-full rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] px-3.5 text-sm text-[#162238] focus:border-[#1D3557] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="help-email" className="block text-xs font-semibold text-[#162238] mb-1.5">
                        Alamat Email
                      </label>
                      <input
                        id="help-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@contoh.id"
                        className="min-h-[44px] w-full rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] px-3.5 text-sm text-[#162238] focus:border-[#1D3557] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="help-topic" className="block text-xs font-semibold text-[#162238] mb-1.5">
                        Kategori Bantuan
                      </label>
                      <select
                        id="help-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="min-h-[44px] w-full rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] px-3.5 text-sm text-[#162238] focus:border-[#1D3557] focus:bg-white focus:outline-none cursor-pointer"
                      >
                        <option value="Navigasi Situs & Pencarian">Navigasi Situs & Pencarian</option>
                        <option value="Kendala Teknis Peminjaman / Pembaca">
                          Kendala Teknis Peminjaman / Pembaca
                        </option>
                        <option value="Dukungan Aksesibilitas">Dukungan Aksesibilitas</option>
                        <option value="Usulan Penambahan Koleksi">Usulan Penambahan Koleksi</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="help-message" className="block text-xs font-semibold text-[#162238] mb-1.5">
                        Deskripsi Kendala atau Pertanyaan
                      </label>
                      <textarea
                        id="help-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Jelaskan kendala teknis atau bagian situs yang ingin Anda tanyakan..."
                        className="w-full rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] p-3.5 text-sm text-[#162238] focus:border-[#1D3557] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="min-h-[46px] w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D3557] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2B4C7E] transition-colors cursor-pointer"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Kirim Permintaan Bantuan</span>
                    </button>

                    <p className="text-xs text-[#4A5A75] text-center">
                      Jam layanan pustakawan daring: Senin–Sabtu, 08.00–20.00 WIB
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
