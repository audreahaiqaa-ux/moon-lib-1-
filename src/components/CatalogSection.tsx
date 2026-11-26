import { Bookmark, BookmarkCheck, CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import { CATEGORIES, type Book, type BookCategory } from '../data/libraryData';
import { BookCover } from './BookCover';

export type AvailabilityFilter = 'all' | 'available' | 'borrowed';
export type SortOption = 'popular' | 'newest' | 'title';

interface CatalogSectionProps {
  books: Book[];
  totalCatalogCount: number;
  searchQuery: string;
  selectedCategory: 'Semua' | BookCategory;
  onCategoryChange: (cat: 'Semua' | BookCategory) => void;
  availabilityFilter: AvailabilityFilter;
  onAvailabilityChange: (val: AvailabilityFilter) => void;
  sortBy: SortOption;
  onSortChange: (val: SortOption) => void;
  onResetFilters: () => void;
  savedIds: string[];
  borrowedIds: string[];
  onSelectBook: (book: Book, openReader?: boolean) => void;
  onToggleSave: (bookId: string) => void;
}

export function CatalogSection({
  books,
  totalCatalogCount,
  searchQuery,
  selectedCategory,
  onCategoryChange,
  availabilityFilter,
  onAvailabilityChange,
  sortBy,
  onSortChange,
  onResetFilters,
  savedIds,
  borrowedIds,
  onSelectBook,
  onToggleSave,
}: CatalogSectionProps) {
  const hasActiveFilter =
    searchQuery.trim() !== '' || selectedCategory !== 'Semua' || availabilityFilter !== 'all';

  return (
    <section
      id="katalog"
      aria-labelledby="katalog-heading"
      className="border-b border-[#DDE4EF] bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EEF2F7]">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#4A5A75]">
              Katalog Induk Digital
            </p>
            <h2
              id="katalog-heading"
              className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#162238] [text-wrap:balance]"
            >
              Jelajahi Seluruh Koleksi
            </h2>
          </div>

          {/* Sort & Availability Selects */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="filter-availability" className="text-xs font-medium text-[#4A5A75]">
                Status:
              </label>
              <select
                id="filter-availability"
                value={availabilityFilter}
                onChange={(e) => onAvailabilityChange(e.target.value as AvailabilityFilter)}
                className="min-h-[40px] rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] px-3 py-1.5 text-xs font-medium text-[#162238] focus:border-[#1D3557] cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="available">Tersedia Sekarang</option>
                <option value="borrowed">Sedang Dipinjam Saya</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-catalog" className="text-xs font-medium text-[#4A5A75]">
                Urutkan:
              </label>
              <select
                id="sort-catalog"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="min-h-[40px] rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] px-3 py-1.5 text-xs font-medium text-[#162238] focus:border-[#1D3557] cursor-pointer"
              >
                <option value="popular">Paling Populer</option>
                <option value="newest">Terbaru</option>
                <option value="title">Judul A–Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter kategori buku"
          className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2"
        >
          {(['Semua', ...CATEGORIES] as const).map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onCategoryChange(cat)}
                className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
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

        {/* Live Result Summary Bar */}
        <div
          aria-live="polite"
          className="mt-4 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#4A5A75]"
        >
          <p>
            Menampilkan <span className="font-mono-num font-semibold text-[#162238]">{books.length}</span> dari{' '}
            <span className="font-mono-num font-semibold text-[#162238]">{totalCatalogCount}</span> judul koleksi
            {searchQuery.trim() ? (
              <>
                {' '}
                untuk kata kunci <span className="font-semibold text-[#162238]">&ldquo;{searchQuery}&rdquo;</span>
              </>
            ) : null}
          </p>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D3557] hover:underline hover:underline-offset-4 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Atur ulang filter</span>
            </button>
          )}
        </div>

        {/* Catalog Grid or Empty State */}
        {books.length === 0 ? (
          <div className="rounded-xl border border-[#DDE4EF] bg-[#FAF9F6] p-10 text-center">
            <h3 className="font-display text-xl font-semibold text-[#162238]">
              Koleksi Tidak Ditemukan
            </h3>
            <p className="mt-2 mx-auto max-w-md text-sm text-[#4A5A75]">
              Tidak ada buku yang sesuai dengan pencarian atau filter Anda saat ini. Coba gunakan kata kunci yang lebih umum atau atur ulang penyaringan.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 min-h-[44px] inline-flex items-center gap-2 rounded-lg bg-[#1D3557] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2B4C7E] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Tampilkan Semua Koleksi</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => {
              const isSaved = savedIds.includes(book.id);
              const isBorrowed = borrowedIds.includes(book.id);
              const isAvailable = book.availableCopies > 0;

              return (
                <article
                  key={book.id}
                  className="group flex flex-col justify-between rounded-xl border border-[#DDE4EF] bg-[#FAF9F6] p-5 hover:border-[#B5C4DA] transition-colors"
                >
                  <div>
                    <div className="flex gap-4 items-start">
                      <button
                        type="button"
                        onClick={() => onSelectBook(book)}
                        className="w-24 shrink-0 cursor-pointer"
                        aria-label={`Buka detail ${book.title}`}
                      >
                        <BookCover book={book} size="sm" />
                      </button>

                      <div className="min-w-0 flex-1">
                        {/* Unboxed clean metadata */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#4A5A75]">
                          <span>{book.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-num">{book.year}</span>
                        </div>

                        <h3 className="mt-1.5 font-display text-lg font-semibold text-[#162238] leading-snug line-clamp-2">
                          <button
                            type="button"
                            onClick={() => onSelectBook(book)}
                            className="text-left hover:text-[#1D3557] hover:underline hover:underline-offset-4 cursor-pointer"
                          >
                            {book.title}
                          </button>
                        </h3>

                        <p className="mt-1 text-xs font-medium text-[#4A5A75] truncate">
                          {book.author}
                        </p>

                        {/* Explicit accessible status with icon + text (never color alone) */}
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
                          {isBorrowed ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#1D3557]" aria-hidden="true" />
                              <span className="text-[#1D3557]">Sedang Anda pinjam</span>
                            </>
                          ) : isAvailable ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#1F5E3B]" aria-hidden="true" />
                              <span className="text-[#1F5E3B]">
                                Tersedia ({book.availableCopies}/{book.totalCopies})
                              </span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-3.5 w-3.5 text-[#7C4A15]" aria-hidden="true" />
                              <span className="text-[#7C4A15]">Semua eksemplar dipinjam</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-[#334155] leading-relaxed line-clamp-2">
                      {book.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#DDE4EF] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectBook(book, true)}
                        className="min-h-[40px] rounded-lg bg-[#1D3557] px-3.5 py-2 text-xs font-semibold text-white whitespace-nowrap hover:bg-[#2B4C7E] transition-colors cursor-pointer"
                      >
                        Baca Pratinjau
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectBook(book, false)}
                        className="min-h-[40px] px-2 py-2 text-xs font-semibold text-[#1D3557] whitespace-nowrap hover:underline hover:underline-offset-4 cursor-pointer"
                      >
                        Detail
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleSave(book.id)}
                      aria-pressed={isSaved}
                      aria-label={
                        isSaved
                          ? `Hapus ${book.title} dari daftar baca`
                          : `Simpan ${book.title} ke daftar baca`
                      }
                      className="min-h-[40px] inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#4A5A75] hover:bg-[#EDF2F8] hover:text-[#162238] cursor-pointer"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="h-4 w-4 text-[#1D3557]" aria-hidden="true" />
                      ) : (
                        <Bookmark className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span className="sr-only sm:not-sr-only">
                        {isSaved ? 'Tersimpan' : 'Simpan'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
