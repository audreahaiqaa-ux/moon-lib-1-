import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { Book, ClothTheme } from '../data/libraryData';

interface BookCoverProps {
  book: Book;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CLOTH_STYLES: Record<
  ClothTheme,
  { bg: string; spine: string; text: string; border: string; accent: string }
> = {
  indigo: {
    bg: 'bg-[#1D3557]',
    spine: 'bg-[#14253D]',
    text: 'text-[#FAF9F6]',
    border: 'border-[#33527E]',
    accent: 'text-[#B8CCE4]',
  },
  periwinkle: {
    bg: 'bg-[#E5ECF6]',
    spine: 'bg-[#CBD8EB]',
    text: 'text-[#162238]',
    border: 'border-[#B9C9E0]',
    accent: 'text-[#3D577A]',
  },
  sage: {
    bg: 'bg-[#E6ECE8]',
    spine: 'bg-[#CFDAD3]',
    text: 'text-[#1B2B23]',
    border: 'border-[#BCCAC1]',
    accent: 'text-[#425B4E]',
  },
  slate: {
    bg: 'bg-[#2B3B52]',
    spine: 'bg-[#1E2A3B]',
    text: 'text-[#F8FAFC]',
    border: 'border-[#455A78]',
    accent: 'text-[#CBD5E1]',
  },
  linen: {
    bg: 'bg-[#F4EFE6]',
    spine: 'bg-[#E5DEC9]',
    text: 'text-[#1E2430]',
    border: 'border-[#D5CCB8]',
    accent: 'text-[#5C5343]',
  },
  bronze: {
    bg: 'bg-[#46392E]',
    spine: 'bg-[#332920]',
    text: 'text-[#FAF6F0]',
    border: 'border-[#665445]',
    accent: 'text-[#DED0C1]',
  },
};

export function BookCover({ book, className = '', size = 'md' }: BookCoverProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const style = CLOTH_STYLES[book.clothTheme];

  if (book.coverImage && !imageFailed) {
    return (
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-md border border-[#DDE4EF] bg-[#EEF2F7] ${className}`}
      >
        <img
          src={book.coverImage}
          alt={`Sampul buku ${book.title} karya ${book.author}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-md border ${style.border} ${style.bg} ${style.text} flex select-none ${className}`}
      aria-label={`Sampul buku ${book.title}`}
    >
      {/* Book spine binding crease */}
      <div className={`w-3 shrink-0 ${style.spine} border-r border-black/10`} aria-hidden="true" />

      {/* Woven gingham subtle paper plate inside cover */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div className={`text-[11px] font-medium tracking-wide ${style.accent} truncate`}>
          {book.category}
        </div>

        <div className="my-auto border-y border-current/20 py-3">
          <h4
            className={`font-display font-semibold leading-snug ${
              size === 'lg' ? 'text-lg sm:text-xl' : size === 'sm' ? 'text-xs' : 'text-sm sm:text-base'
            } line-clamp-3`}
          >
            {book.title}
          </h4>
          <p className={`mt-1.5 text-xs ${style.accent} truncate`}>{book.author}</p>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className={`font-mono-num ${style.accent}`}>{book.year}</span>
          <BookOpen className={`h-3.5 w-3.5 ${style.accent}`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
