import { useEffect, useMemo, useState } from 'react';
import {
  BASE_VISITOR_STATS,
  INITIAL_BOOKS,
  type Book,
  type BookCategory,
} from './data/libraryData';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { PopularRecommendations } from './components/PopularRecommendations';
import {
  CatalogSection,
  type AvailabilityFilter,
  type SortOption,
} from './components/CatalogSection';
import { LibraryStats } from './components/LibraryStats';
import { FaqHelpTabs, type SupportTab } from './components/FaqHelpTabs';
import { BookReaderModal } from './components/BookReaderModal';
import { ReadingListDrawer } from './components/ReadingListDrawer';
import { Footer } from './components/Footer';

const STORAGE_SAVED_KEY = 'moon_library_saved_ids_v1';
const STORAGE_BORROWED_KEY = 'moon_library_borrowed_ids_v1';
const STORAGE_VISITS_KEY = 'moon_library_visit_offset_v1';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | BookCategory>('Semua');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_KEY);
      return raw ? (JSON.parse(raw) as string[]) : ['moon-01', 'moon-02'];
    } catch {
      return ['moon-01', 'moon-02'];
    }
  });

  const [borrowedIds, setBorrowedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BORROWED_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [visitOffset, setVisitOffset] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_VISITS_KEY);
      const current = raw ? Number(raw) : 0;
      const next = Number.isFinite(current) ? current + 1 : 1;
      localStorage.setItem(STORAGE_VISITS_KEY, String(next));
      return next;
    } catch {
      return 1;
    }
  });

  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const [activeBookModal, setActiveBookModal] = useState<{
    bookId: string;
    mode: 'detail' | 'reader';
  } | null>(null);
  const [readingListOpen, setReadingListOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<SupportTab>('faq');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BORROWED_KEY, JSON.stringify(borrowedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [borrowedIds]);

  useEffect(() => {
    document.documentElement.setAttribute('data-text-scale', largeText ? 'large' : 'normal');
  }, [largeText]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-high-contrast',
      highContrast ? 'true' : 'false'
    );
  }, [highContrast]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  // Reflect live user borrows in book availability counts
  const booksWithLiveAvailability = useMemo<Book[]>(() => {
    return INITIAL_BOOKS.map((book) => {
      const userBorrowed = borrowedIds.includes(book.id);
      const adjustedAvailable = userBorrowed
        ? Math.max(0, book.availableCopies - 1)
        : book.availableCopies;
      return {
        ...book,
        availableCopies: adjustedAvailable,
        borrowCount: userBorrowed ? book.borrowCount + 1 : book.borrowCount,
      };
    });
  }, [borrowedIds]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matched = booksWithLiveAvailability.filter((book) => {
      if (selectedCategory !== 'Semua' && book.category !== selectedCategory) {
        return false;
      }
      if (availabilityFilter === 'available' && book.availableCopies <= 0) {
        return false;
      }
      if (availabilityFilter === 'borrowed' && !borrowedIds.includes(book.id)) {
        return false;
      }
      if (!q) return true;

      return (
        book.title.toLowerCase().includes(q) ||
        (book.subtitle && book.subtitle.toLowerCase().includes(q)) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        book.isbn.toLowerCase().includes(q) ||
        String(book.year).includes(q) ||
        book.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    });

    const sorted = [...matched];
    if (sortBy === 'popular') {
      sorted.sort((a, b) => b.borrowCount - a.borrowCount);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'id'));
    }
    return sorted;
  }, [
    booksWithLiveAvailability,
    searchQuery,
    selectedCategory,
    availabilityFilter,
    sortBy,
    borrowedIds,
  ]);

  const activeModalBook = useMemo(() => {
    if (!activeBookModal) return null;
    return booksWithLiveAvailability.find((b) => b.id === activeBookModal.bookId) ?? null;
  }, [activeBookModal, booksWithLiveAvailability]);

  const savedBooks = useMemo(
    () => booksWithLiveAvailability.filter((b) => savedIds.includes(b.id)),
    [booksWithLiveAvailability, savedIds]
  );

  const borrowedBooks = useMemo(
    () => booksWithLiveAvailability.filter((b) => borrowedIds.includes(b.id)),
    [booksWithLiveAvailability, borrowedIds]
  );

  const handleToggleSave = (bookId: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(bookId);
      const bookTitle = INITIAL_BOOKS.find((b) => b.id === bookId)?.title ?? 'Buku';
      setToastMessage(
        exists
          ? `"${bookTitle}" dihapus dari Daftar Baca.`
          : `"${bookTitle}" disimpan ke Daftar Baca.`
      );
      return exists ? prev.filter((id) => id !== bookId) : [...prev, bookId];
    });
  };

  const handleBorrowBook = (bookId: string) => {
    setBorrowedIds((prev) => {
      if (prev.includes(bookId)) return prev;
      const bookTitle = INITIAL_BOOKS.find((b) => b.id === bookId)?.title ?? 'Buku';
      setToastMessage(`"${bookTitle}" berhasil dipinjam untuk 14 hari.`);
      return [...prev, bookId];
    });
  };

  const handleReturnBook = (bookId: string) => {
    setBorrowedIds((prev) => {
      const bookTitle = INITIAL_BOOKS.find((b) => b.id === bookId)?.title ?? 'Buku';
      setToastMessage(`"${bookTitle}" telah dikembalikan ke koleksi.`);
      return prev.filter((id) => id !== bookId);
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setAvailabilityFilter('all');
    setSortBy('popular');
  };

  const handleJumpToCatalog = () => {
    const el = document.getElementById('katalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectBook = (book: Book, openReader = false) => {
    setActiveBookModal({
      bookId: book.id,
      mode: openReader ? 'reader' : 'detail',
    });
  };

  // Suppress unused setter lint warning while keeping session visit tracking clean
  void setVisitOffset;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#162238]">
      <a href="#main-content" className="skip-link">
        Lewati langsung ke konten utama
      </a>

      <Header
        readingListCount={savedIds.length + borrowedIds.length}
        onOpenReadingList={() => setReadingListOpen(true)}
        onSelectFaqTab={() => setSupportTab('faq')}
      />

      <main id="main-content" className="flex-1">
        <HeroSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          books={booksWithLiveAvailability}
          onSelectBook={(book) => handleSelectBook(book, false)}
          onJumpToCatalog={handleJumpToCatalog}
          largeText={largeText}
          onToggleLargeText={() => setLargeText((prev) => !prev)}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast((prev) => !prev)}
        />

        <PopularRecommendations
          books={booksWithLiveAvailability}
          savedIds={savedIds}
          onSelectBook={handleSelectBook}
          onToggleSave={handleToggleSave}
        />

        <CatalogSection
          books={filteredBooks}
          totalCatalogCount={booksWithLiveAvailability.length}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          availabilityFilter={availabilityFilter}
          onAvailabilityChange={setAvailabilityFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          savedIds={savedIds}
          borrowedIds={borrowedIds}
          onSelectBook={handleSelectBook}
          onToggleSave={handleToggleSave}
        />

        <LibraryStats
          books={booksWithLiveAvailability}
          totalVisits={BASE_VISITOR_STATS.totalVisits + visitOffset}
          todayVisits={BASE_VISITOR_STATS.todayVisits + visitOffset}
          borrowedCount={borrowedIds.length}
          baseCirculation={BASE_VISITOR_STATS.baseCirculation}
        />

        <FaqHelpTabs activeTab={supportTab} onTabChange={setSupportTab} />
      </main>

      <Footer onSelectTab={(tab) => setSupportTab(tab)} />

      <BookReaderModal
        book={activeModalBook}
        initialMode={activeBookModal?.mode ?? 'detail'}
        isSaved={activeModalBook ? savedIds.includes(activeModalBook.id) : false}
        isBorrowed={activeModalBook ? borrowedIds.includes(activeModalBook.id) : false}
        onClose={() => setActiveBookModal(null)}
        onToggleSave={handleToggleSave}
        onBorrow={handleBorrowBook}
        onReturn={handleReturnBook}
      />

      <ReadingListDrawer
        open={readingListOpen}
        onClose={() => setReadingListOpen(false)}
        borrowedBooks={borrowedBooks}
        savedBooks={savedBooks}
        onOpenBook={handleSelectBook}
        onReturnBook={handleReturnBook}
        onRemoveSaved={handleToggleSave}
      />

      {/* Accessible Live Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 rounded-lg border border-[#1D3557] bg-[#162238] px-4 py-3 text-xs sm:text-sm font-medium text-white shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
