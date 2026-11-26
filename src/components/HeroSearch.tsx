import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import type { Book } from '../data/libraryData';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  books: Book[];
  onSelectBook: (book: Book) => void;
  onJumpToCatalog: () => void;
  largeText: boolean;
  onToggleLargeText: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

const QUICK_TOPICS = [
  'Bulan & Astronomi',
  'Gingham & Tekstil',
  'Sastra Indonesia',
  'Aksesibilitas Web',
  'Filsafat Tenang',
];

export function HeroSearch({
  searchQuery,
  onSearchChange,
  books,
  onSelectBook,
  onJumpToCatalog,
  largeText,
  onToggleLargeText,
  highContrast,
  onToggleHighContrast,
}: HeroSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return books
      .filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.isbn.toLowerCase().includes(q) ||
          b.keywords.some((k) => k.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [books, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onJumpToCatalog();
  };

  const handleQuickTopic = (topic: string) => {
    const queryMap: Record<string, string> = {
      'Bulan & Astronomi': 'bulan',
      'Gingham & Tekstil': 'gingham',
      'Sastra Indonesia': 'Sastra',
      'Aksesibilitas Web': 'aksesibilitas',
      'Filsafat Tenang': 'Filsafat',
    };
    onSearchChange(queryMap[topic] ?? topic);
    setShowSuggestions(false);
    onJumpToCatalog();
  };

  return (
    <section
      id="pencarian"
      aria-labelledby="hero-title"
      className="bg-gingham-soft border-b border-[#DDE4EF] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-xl border border-[#DDE4EF] bg-[#FAF9F6] p-6 sm:p-10 lg:p-12 shadow-sm">
          {/* Accessibility & Orientation Utility Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDE4EF] pb-5 mb-7">
            <p className="text-xs sm:text-sm font-medium text-[#4A5A75]">
              Perpustakaan Digital Terbuka · Bernuansa Gingham · Ramah Aksesibilitas
            </p>

            <div className="flex items-center gap-2" role="group" aria-label="Pengaturan aksesibilitas tampilan">
              <button
                type="button"
                onClick={onToggleLargeText}
                aria-pressed={largeText}
                className={`min-h-[40px] rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  largeText
                    ? 'border-[#1D3557] bg-[#1D3557] text-white'
                    : 'border-[#DDE4EF] bg-white text-[#162238] hover:bg-[#F2F5FA]'
                }`}
              >
                {largeText ? 'Teks Besar: Aktif' : 'Teks Besar'}
              </button>
              <button
                type="button"
                onClick={onToggleHighContrast}
                aria-pressed={highContrast}
                className={`min-h-[40px] rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  highContrast
                    ? 'border-[#1D3557] bg-[#1D3557] text-white'
                    : 'border-[#DDE4EF] bg-white text-[#162238] hover:bg-[#F2F5FA]'
                }`}
              >
                {highContrast ? 'Kontras Tinggi: Aktif' : 'Kontras Tinggi'}
              </button>
            </div>
          </div>

          {/* Editorial Headline & Copy */}
          <div className="max-w-3xl">
            <h1
              id="hero-title"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#162238] leading-[1.15] [text-wrap:balance]"
            >
              Temukan Buku dan Pengetahuan dengan Nyaman di Moon Library
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#4A5A75] leading-relaxed max-w-2xl">
              Jelajahi koleksi sastra, sains, sejarah, dan literasi digital dalam antarmuka gingham yang tenang, simpel, dan mudah diakses oleh setiap pembaca.
            </p>
          </div>

          {/* Intuitive Book Search Bar */}
          <div ref={containerRef} className="relative mt-8 max-w-3xl">
            <form onSubmit={handleSubmit} role="search" aria-label="Pencarian koleksi buku Moon Library">
              <label htmlFor="moon-search-input" className="sr-only">
                Cari judul buku, penulis, kategori, atau nomor ISBN
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A5A75]"
                    aria-hidden="true"
                  />
                  <input
                    ref={inputRef}
                    id="moon-search-input"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Cari judul buku, nama penulis, subjek, atau ISBN..."
                    autoComplete="off"
                    className="min-h-[52px] w-full rounded-lg border border-[#C6D1E2] bg-white pl-12 pr-20 text-base text-[#162238] placeholder:text-[#64748B] focus:border-[#1D3557] focus:outline-none"
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          onSearchChange('');
                          inputRef.current?.focus();
                        }}
                        aria-label="Hapus kata kunci pencarian"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#4A5A75] hover:bg-[#F2F5FA] hover:text-[#162238] cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : (
                      <kbd className="hidden sm:inline-block rounded border border-[#DDE4EF] bg-[#F2F5FA] px-2 py-0.5 font-mono-num text-xs text-[#4A5A75]">
                        /
                      </kbd>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="min-h-[52px] inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D3557] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 hover:bg-[#2B4C7E] transition-colors cursor-pointer"
                >
                  <span>Cari Koleksi</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>

            {/* Live Search Autocomplete Dropdown */}
            {showSuggestions && searchQuery.trim().length > 0 && (
              <div
                role="region"
                aria-label="Saran pencarian cepat"
                className="absolute left-0 right-0 z-30 mt-2 rounded-lg border border-[#C6D1E2] bg-white shadow-lg overflow-hidden"
              >
                {suggestions.length > 0 ? (
                  <ul className="divide-y divide-[#EEF2F7]">
                    {suggestions.map((book) => (
                      <li key={book.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setShowSuggestions(false);
                            onSelectBook(book);
                          }}
                          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-[#F2F5FA] transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#162238]">
                              {book.title}
                            </p>
                            <p className="truncate text-xs text-[#4A5A75]">
                              {book.author} · {book.category} · {book.year}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-[#1D3557] whitespace-nowrap shrink-0">
                            {book.availableCopies > 0
                              ? `${book.availableCopies} tersedia`
                              : 'Sedang dipinjam'}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-[#4A5A75]">
                    Tidak ada kecocokan langsung untuk &ldquo;{searchQuery}&rdquo;. Tekan Enter untuk melihat opsi katalog.
                  </div>
                )}
              </div>
            )}

            {/* Quick Search Topic Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[#4A5A75] mr-1">Topik cepat:</span>
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleQuickTopic(topic)}
                  className="min-h-[36px] rounded-md border border-[#DDE4EF] bg-white px-3 py-1.5 text-xs font-medium text-[#162238] whitespace-nowrap hover:border-[#1D3557] hover:bg-[#F2F5FA] transition-colors cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
