import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  readingListCount: number;
  onOpenReadingList: () => void;
  onSelectFaqTab: () => void;
}

export function Header({
  readingListCount,
  onOpenReadingList,
  onSelectFaqTab,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Pencarian', href: '#pencarian' },
    { label: 'Rekomendasi', href: '#rekomendasi' },
    { label: 'Katalog', href: '#katalog' },
    { label: 'FAQ & Bantuan', href: '#bantuan', onClick: onSelectFaqTab },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#DDE4EF] bg-[#FAF9F6]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#pencarian"
          className="font-display text-xl font-semibold tracking-tight text-[#162238] whitespace-nowrap shrink-0 hover:text-[#1D3557] transition-colors"
        >
          Moon Library
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A5A75]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={item.onClick}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#162238] hover:underline hover:underline-offset-4 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenReadingList}
            className="min-h-[40px] rounded-lg bg-[#1D3557] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#2B4C7E] transition-colors cursor-pointer"
          >
            {readingListCount > 0 ? `Daftar Baca (${readingListCount})` : 'Daftar Baca'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DDE4EF] bg-white text-[#162238] hover:bg-[#F2F5FA] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Nav */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="md:hidden border-t border-[#DDE4EF] bg-[#FAF9F6] px-4 py-3"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#162238] hover:bg-[#EDF2F8]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
