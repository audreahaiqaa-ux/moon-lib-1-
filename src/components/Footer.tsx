interface FooterProps {
  onSelectTab: (tab: 'faq' | 'help') => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  return (
    <footer className="bg-gingham-border-ribbon border-t border-[#DDE4EF] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-xl border border-[#DDE4EF] bg-white px-6 py-8 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="font-display text-xl font-semibold text-[#162238]">
                Moon Library
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-[#4A5A75] max-w-md">
                Perpustakaan digital terbuka dengan desain gingham yang simpel, tenang, dan mematuhi standar aksesibilitas web WCAG 2.1 AA.
              </p>
            </div>

            <nav aria-label="Tautan kaki halaman" className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#4A5A75]">
              <a href="#pencarian" className="hover:text-[#162238] hover:underline hover:underline-offset-4">
                Pencarian
              </a>
              <a href="#rekomendasi" className="hover:text-[#162238] hover:underline hover:underline-offset-4">
                Populer
              </a>
              <a href="#katalog" className="hover:text-[#162238] hover:underline hover:underline-offset-4">
                Katalog
              </a>
              <a href="#statistik" className="hover:text-[#162238] hover:underline hover:underline-offset-4">
                Statistik
              </a>
              <a
                href="#bantuan"
                onClick={() => onSelectTab('faq')}
                className="hover:text-[#162238] hover:underline hover:underline-offset-4"
              >
                FAQ
              </a>
              <a
                href="#bantuan"
                onClick={() => onSelectTab('help')}
                className="hover:text-[#162238] hover:underline hover:underline-offset-4"
              >
                Help
              </a>
            </nav>
          </div>

          <div className="mt-6 pt-6 border-t border-[#EEF2F7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#4A5A75]">
            <p>© 2026 Moon Library. Seluruh koleksi pratinjau tersedia untuk pembaca umum.</p>
            <p>Navigasi papan ketik aktif · Kontras terverifikasi</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
