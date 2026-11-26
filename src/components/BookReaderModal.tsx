import { useEffect, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  CheckCircle2,
  FileText,
  X,
} from 'lucide-react';
import type { Book } from '../data/libraryData';
import { BookCover } from './BookCover';

interface BookReaderModalProps {
  book: Book | null;
  initialMode: 'detail' | 'reader';
  isSaved: boolean;
  isBorrowed: boolean;
  onClose: () => void;
  onToggleSave: (bookId: string) => void;
  onBorrow: (bookId: string) => void;
  onReturn: (bookId: string) => void;
}

type ReaderTheme = 'paper' | 'warm' | 'night';

export function BookReaderModal({
  book,
  initialMode,
  isSaved,
  isBorrowed,
  onClose,
  onToggleSave,
  onBorrow,
  onReturn,
}: BookReaderModalProps) {
  const [mode, setMode] = useState<'detail' | 'reader'>(initialMode);
  const [readerScale, setReaderScale] = useState<'normal' | 'large'>('normal');
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('paper');

  useEffect(() => {
    setMode(initialMode);
  }, [book?.id, initialMode]);

  useEffect(() => {
    if (!book) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const isAvailable = book.availableCopies > 0;

  const readerThemeClasses: Record<ReaderTheme, string> = {
    paper: 'bg-white text-[#162238] border-[#DDE4EF]',
    warm: 'bg-[#F8F3E8] text-[#292218] border-[#E4D9C5]',
    night: 'bg-[#162238] text-[#F1F5F9] border-[#2C3F60]',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#162238]/55 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#DDE4EF] bg-[#FAF9F6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#DDE4EF] bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode('detail')}
              className={`min-h-[38px] inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                mode === 'detail'
                  ? 'bg-[#1D3557] text-white'
                  : 'bg-[#F2F5FA] text-[#4A5A75] hover:text-[#162238]'
              }`}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Detail Koleksi</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('reader')}
              className={`min-h-[38px] inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                mode === 'reader'
                  ? 'bg-[#1D3557] text-white'
                  : 'bg-[#F2F5FA] text-[#4A5A75] hover:text-[#162238]'
              }`}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Ruang Baca Pratinjau</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela buku"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] text-[#162238] hover:bg-[#EDF2F8] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {mode === 'detail' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 max-w-[240px] mx-auto md:max-w-none w-full">
                <BookCover book={book} size="lg" />
              </div>

              <div className="md:col-span-8">
                <p className="text-xs font-medium text-[#4A5A75]">
                  {book.category} · {book.format}
                </p>

                <h2
                  id="modal-book-title"
                  className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#162238] leading-tight"
                >
                  {book.title}
                </h2>

                {book.subtitle && (
                  <p className="mt-1 text-sm sm:text-base text-[#4A5A75]">{book.subtitle}</p>
                )}

                <p className="mt-2 text-sm font-semibold text-[#1D3557]">Oleh {book.author}</p>

                <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed">
                  {book.summary}
                </p>

                {/* Primary Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {isBorrowed ? (
                    <button
                      type="button"
                      onClick={() => onReturn(book.id)}
                      className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-[#1D3557] bg-white px-5 py-2.5 text-sm font-semibold text-[#1D3557] hover:bg-[#F2F5FA] transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <span>Kembalikan Buku</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => onBorrow(book.id)}
                      className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                        isAvailable
                          ? 'bg-[#1D3557] text-white hover:bg-[#2B4C7E] cursor-pointer'
                          : 'bg-[#E2E8F0] text-[#64748B] cursor-not-allowed'
                      }`}
                    >
                      <span>{isAvailable ? 'Pinjam Buku Digital (14 Hari)' : 'Semua Eksemplar Dipinjam'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setMode('reader')}
                    className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-[#DDE4EF] bg-white px-4 py-2.5 text-sm font-medium text-[#162238] hover:bg-[#F2F5FA] transition-colors cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>Baca Pratinjau</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleSave(book.id)}
                    aria-pressed={isSaved}
                    className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-[#DDE4EF] bg-white px-4 py-2.5 text-sm font-medium text-[#162238] hover:bg-[#F2F5FA] transition-colors cursor-pointer"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-4 w-4 text-[#1D3557]" aria-hidden="true" />
                    ) : (
                      <Bookmark className="h-4 w-4 text-[#4A5A75]" aria-hidden="true" />
                    )}
                    <span>{isSaved ? 'Tersimpan di Daftar Baca' : 'Simpan'}</span>
                  </button>
                </div>

                {/* Accession Metadata Grid */}
                <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 border-t border-[#DDE4EF] pt-6 text-xs sm:text-sm">
                  <div>
                    <dt className="text-[#4A5A75]">Ketersediaan</dt>
                    <dd className="mt-1 font-mono-num font-semibold text-[#162238]">
                      {book.availableCopies} / {book.totalCopies} eksemplar
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4A5A75]">Penerbit</dt>
                    <dd className="mt-1 font-medium text-[#162238]">{book.publisher}</dd>
                  </div>
                  <div>
                    <dt className="text-[#4A5A75]">Tahun Terbit</dt>
                    <dd className="mt-1 font-mono-num font-medium text-[#162238]">{book.year}</dd>
                  </div>
                  <div>
                    <dt className="text-[#4A5A75]">Jumlah Halaman</dt>
                    <dd className="mt-1 font-mono-num font-medium text-[#162238]">{book.pages} hlm</dd>
                  </div>
                  <div>
                    <dt className="text-[#4A5A75]">Nomor Panggil</dt>
                    <dd className="mt-1 font-mono-num font-medium text-[#162238]">{book.callNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-[#4A5A75]">ISBN</dt>
                    <dd className="mt-1 font-mono-num font-medium text-[#162238]">{book.isbn}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ) : (
            /* Distraction-Free Reader Mode */
            <div>
              {/* Reader Controls */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#DDE4EF] bg-white px-4 py-3">
                <div className="min-w-0">
                  <h2 id="modal-book-title" className="truncate font-display text-base font-semibold text-[#162238]">
                    {book.title}
                  </h2>
                  <p className="truncate text-xs text-[#4A5A75]">{book.author}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 rounded-lg bg-[#F2F5FA] p-1" role="group" aria-label="Ukuran huruf ruang baca">
                    <button
                      type="button"
                      onClick={() => setReaderScale('normal')}
                      className={`min-h-[34px] rounded-md px-2.5 text-xs font-medium cursor-pointer ${
                        readerScale === 'normal' ? 'bg-white text-[#162238] shadow-sm' : 'text-[#4A5A75]'
                      }`}
                    >
                      A Standar
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderScale('large')}
                      className={`min-h-[34px] rounded-md px-2.5 text-xs font-medium cursor-pointer ${
                        readerScale === 'large' ? 'bg-white text-[#162238] shadow-sm' : 'text-[#4A5A75]'
                      }`}
                    >
                      A+ Besar
                    </button>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-[#F2F5FA] p-1" role="group" aria-label="Tema warna kertas">
                    {(
                      [
                        { id: 'paper', label: 'Putih' },
                        { id: 'warm', label: 'Krem' },
                        { id: 'night', label: 'Malam' },
                      ] as const
                    ).map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setReaderTheme(theme.id)}
                        className={`min-h-[34px] rounded-md px-2.5 text-xs font-medium cursor-pointer ${
                          readerTheme === theme.id
                            ? 'bg-white text-[#162238] shadow-sm'
                            : 'text-[#4A5A75]'
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reading Canvas */}
              <article
                className={`mx-auto max-w-2xl rounded-xl border p-6 sm:p-10 transition-colors ${readerThemeClasses[readerTheme]}`}
              >
                <p className="text-xs font-medium opacity-75">
                  Pratinjau Resmi · {book.publisher}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">
                  {book.previewChapterTitle}
                </h3>
                <div className="my-6 border-b border-current/15" />

                <div
                  className={`space-y-5 leading-[1.8] ${
                    readerScale === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-[17px]'
                  }`}
                >
                  {book.previewParagraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? 'first-letter:font-display first-letter:text-4xl first-letter:font-semibold first-letter:mr-2 first-letter:float-left first-letter:leading-none'
                          : ''
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-10 border-t border-current/15 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs opacity-75">
                    Akhir bab pratinjau. Pinjam buku digital untuk membaca penuh {book.pages} halaman.
                  </p>
                  {!isBorrowed ? (
                    <button
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => onBorrow(book.id)}
                      className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold ${
                        isAvailable
                          ? 'bg-[#1D3557] text-white hover:bg-[#2B4C7E] cursor-pointer'
                          : 'bg-[#CBD5E1] text-[#475569] cursor-not-allowed'
                      }`}
                    >
                      {isAvailable ? 'Pinjam Buku Lengkap' : 'Stok Sedang Dipinjam'}
                    </button>
                  ) : (
                    <span className="text-xs font-semibold">
                      Buku ini sudah berada di Rak Pinjaman Anda
                    </span>
                  )}
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
