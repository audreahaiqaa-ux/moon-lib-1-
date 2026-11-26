import { Bookmark, BookmarkCheck, BookOpen } from 'lucide-react';
import type { Book } from '../data/libraryData';
import { BookCover } from './BookCover';

interface PopularRecommendationsProps {
  books: Book[];
  savedIds: string[];
  onSelectBook: (book: Book, openReader?: boolean) => void;
  onToggleSave: (bookId: string) => void;
}

export function PopularRecommendations({
  books,
  savedIds,
  onSelectBook,
  onToggleSave,
}: PopularRecommendationsProps) {
  const popularBooks = books
    .filter((b) => b.isPopular)
    .sort((a, b) => (a.popularRank ?? 99) - (b.popularRank ?? 99));

  const spotlight = popularBooks[0];
  const secondaryPopular = popularBooks.slice(1, 5);

  if (!spotlight) return null;

  const isSpotlightSaved = savedIds.includes(spotlight.id);

  return (
    <section
      id="rekomendasi"
      aria-labelledby="rekomendasi-heading"
      className="border-b border-[#DDE4EF] bg-[#FAF9F6] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#4A5A75]">
              Kurasi Pembaca Bulan Ini
            </p>
            <h2
              id="rekomendasi-heading"
              className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#162238] [text-wrap:balance]"
            >
              Rekomendasi Buku Populer
            </h2>
          </div>
          <a
            href="#katalog"
            className="text-sm font-medium text-[#1D3557] hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0"
          >
            Lihat seluruh katalog koleksi
          </a>
        </div>

        {/* Asymmetric Editorial Showcase: 1 Spotlight + 4 Popular Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Spotlight Card */}
          <article className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-[#DDE4EF] bg-white p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-5">
                <button
                  type="button"
                  onClick={() => onSelectBook(spotlight)}
                  className="group block w-full text-left cursor-pointer"
                  aria-label={`Lihat detail ${spotlight.title}`}
                >
                  <BookCover book={spotlight} size="lg" />
                </button>
              </div>

              <div className="sm:col-span-7 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A5A75]">
                  <span className="font-semibold text-[#1D3557]">Pilihan Utama #1</span>
                  <span aria-hidden="true">·</span>
                  <span>{spotlight.category}</span>
                </div>

                <h3 className="mt-2 font-display text-2xl font-semibold text-[#162238] leading-snug">
                  <button
                    type="button"
                    onClick={() => onSelectBook(spotlight)}
                    className="text-left hover:text-[#1D3557] hover:underline hover:underline-offset-4 cursor-pointer"
                  >
                    {spotlight.title}
                  </button>
                </h3>
                <p className="mt-1 text-sm font-medium text-[#4A5A75]">{spotlight.author}</p>

                <p className="mt-4 text-sm text-[#334155] leading-relaxed">
                  {spotlight.summary}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#4A5A75] font-mono-num">
                  <span>{spotlight.pages} hlm</span>
                  <span aria-hidden="true">·</span>
                  <span>{spotlight.borrowCount.toLocaleString('id-ID')} pembaca</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1D3557] font-medium">
                    {spotlight.availableCopies > 0
                      ? `${spotlight.availableCopies} dari ${spotlight.totalCopies} tersedia`
                      : 'Sedang dipinjam'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#EEF2F7] flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectBook(spotlight, true)}
                className="min-h-[44px] inline-flex items-center gap-2 rounded-lg bg-[#1D3557] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap hover:bg-[#2B4C7E] transition-colors cursor-pointer"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Baca Pratinjau</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(spotlight.id)}
                aria-pressed={isSpotlightSaved}
                className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] px-4 py-2.5 text-sm font-medium text-[#162238] whitespace-nowrap hover:bg-[#EDF2F8] transition-colors cursor-pointer"
              >
                {isSpotlightSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-[#1D3557]" aria-hidden="true" />
                ) : (
                  <Bookmark className="h-4 w-4 text-[#4A5A75]" aria-hidden="true" />
                )}
                <span>{isSpotlightSaved ? 'Tersimpan' : 'Simpan'}</span>
              </button>
            </div>
          </article>

          {/* 4 Curated Popular Books Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryPopular.map((book) => {
              const isSaved = savedIds.includes(book.id);
              return (
                <article
                  key={book.id}
                  className="group flex flex-col justify-between rounded-xl border border-[#DDE4EF] bg-white p-4 hover:border-[#B8C7DC] transition-colors"
                >
                  <div className="flex gap-4 items-start">
                    <button
                      type="button"
                      onClick={() => onSelectBook(book)}
                      className="w-20 shrink-0 cursor-pointer"
                      aria-label={`Buka detail buku ${book.title}`}
                    >
                      <BookCover book={book} size="sm" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#4A5A75]">
                        <span className="font-mono-num font-medium text-[#1D3557]">
                          0{book.popularRank}.
                        </span>
                        <span className="truncate">{book.category}</span>
                      </div>

                      <h3 className="mt-1 font-display text-base font-semibold text-[#162238] leading-snug line-clamp-2">
                        <button
                          type="button"
                          onClick={() => onSelectBook(book)}
                          className="text-left hover:text-[#1D3557] hover:underline hover:underline-offset-4 cursor-pointer"
                        >
                          {book.title}
                        </button>
                      </h3>

                      <p className="mt-1 text-xs text-[#4A5A75] truncate">{book.author}</p>

                      <p className="mt-2 text-xs text-[#4A5A75] font-mono-num">
                        {book.borrowCount.toLocaleString('id-ID')} peminjam ·{' '}
                        {book.availableCopies > 0
                          ? `${book.availableCopies} tersedia`
                          : 'Habis dipinjam'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EEF2F7] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectBook(book, true)}
                      className="min-h-[38px] text-xs font-semibold text-[#1D3557] hover:underline hover:underline-offset-4 whitespace-nowrap cursor-pointer"
                    >
                      Baca Pratinjau
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleSave(book.id)}
                      aria-label={
                        isSaved
                          ? `Hapus ${book.title} dari daftar baca`
                          : `Simpan ${book.title} ke daftar baca`
                      }
                      aria-pressed={isSaved}
                      className="min-h-[38px] inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-[#4A5A75] hover:bg-[#F2F5FA] hover:text-[#162238] cursor-pointer"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="h-4 w-4 text-[#1D3557]" aria-hidden="true" />
                      ) : (
                        <Bookmark className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
