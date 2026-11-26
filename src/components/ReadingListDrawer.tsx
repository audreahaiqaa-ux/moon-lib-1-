import { useEffect } from 'react';
import { BookOpen, Trash2, X } from 'lucide-react';
import type { Book } from '../data/libraryData';

interface ReadingListDrawerProps {
  open: boolean;
  onClose: () => void;
  borrowedBooks: Book[];
  savedBooks: Book[];
  onOpenBook: (book: Book, openReader?: boolean) => void;
  onReturnBook: (bookId: string) => void;
  onRemoveSaved: (bookId: string) => void;
}

export function ReadingListDrawer({
  open,
  onClose,
  borrowedBooks,
  savedBooks,
  onOpenBook,
  onReturnBook,
  onRemoveSaved,
}: ReadingListDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#162238]/45 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col border-l border-[#DDE4EF] bg-[#FAF9F6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#DDE4EF] bg-white px-5 py-4">
          <div>
            <h2 id="drawer-title" className="font-display text-xl font-semibold text-[#162238]">
              Daftar Baca & Pinjaman
            </h2>
            <p className="text-xs text-[#4A5A75]">
              {borrowedBooks.length} sedang dipinjam · {savedBooks.length} tersimpan
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panel daftar baca"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] text-[#162238] hover:bg-[#EDF2F8] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8">
          {/* Borrowed Books */}
          <section aria-labelledby="borrowed-heading">
            <h3 id="borrowed-heading" className="text-xs font-semibold uppercase tracking-wider text-[#4A5A75]">
              Sedang Dipinjam ({borrowedBooks.length})
            </h3>
            {borrowedBooks.length === 0 ? (
              <p className="mt-3 rounded-lg border border-[#DDE4EF] bg-white p-4 text-sm text-[#4A5A75]">
                Belum ada buku yang sedang Anda pinjam. Klik buku di katalog untuk meminjam hingga 14 hari.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {borrowedBooks.map((book) => (
                  <li
                    key={book.id}
                    className="rounded-lg border border-[#DDE4EF] bg-white p-4"
                  >
                    <p className="font-display text-base font-semibold text-[#162238]">
                      {book.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#4A5A75]">{book.author}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenBook(book, true);
                        }}
                        className="min-h-[38px] inline-flex items-center gap-1.5 rounded-lg bg-[#1D3557] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2B4C7E] cursor-pointer"
                      >
                        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Lanjut Baca</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onReturnBook(book.id)}
                        className="min-h-[38px] rounded-lg border border-[#DDE4EF] px-3 py-1.5 text-xs font-medium text-[#162238] hover:bg-[#F2F5FA] cursor-pointer"
                      >
                        Kembalikan
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Saved Books */}
          <section aria-labelledby="saved-heading">
            <h3 id="saved-heading" className="text-xs font-semibold uppercase tracking-wider text-[#4A5A75]">
              Tersimpan untuk Nanti ({savedBooks.length})
            </h3>
            {savedBooks.length === 0 ? (
              <p className="mt-3 rounded-lg border border-[#DDE4EF] bg-white p-4 text-sm text-[#4A5A75]">
                Daftar baca Anda masih kosong. Tekan tombol Simpan pada buku favorit untuk menandainya di sini.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {savedBooks.map((book) => (
                  <li
                    key={book.id}
                    className="flex items-start justify-between gap-3 rounded-lg border border-[#DDE4EF] bg-white p-4"
                  >
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenBook(book, false);
                        }}
                        className="text-left font-display text-base font-semibold text-[#162238] hover:text-[#1D3557] hover:underline cursor-pointer"
                      >
                        {book.title}
                      </button>
                      <p className="mt-0.5 text-xs text-[#4A5A75]">
                        {book.author} · {book.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveSaved(book.id)}
                      aria-label={`Hapus ${book.title} dari daftar baca`}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#4A5A75] hover:bg-[#F2F5FA] hover:text-[#162238] cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}
