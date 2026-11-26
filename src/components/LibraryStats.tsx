import { CATEGORIES, type Book } from '../data/libraryData';

interface LibraryStatsProps {
  books: Book[];
  totalVisits: number;
  todayVisits: number;
  borrowedCount: number;
  baseCirculation: number;
}

export function LibraryStats({
  books,
  totalVisits,
  todayVisits,
  borrowedCount,
  baseCirculation,
}: LibraryStatsProps) {
  const totalTitles = books.length;
  const availableTitles = books.filter((b) => b.availableCopies > 0).length;
  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const availableCopies = books.reduce((sum, b) => sum + b.availableCopies, 0);

  const categoryBreakdown = CATEGORIES.map((category) => {
    const inCategory = books.filter((b) => b.category === category);
    const availInCategory = inCategory.reduce((s, b) => s + b.availableCopies, 0);
    const totalInCategory = inCategory.reduce((s, b) => s + b.totalCopies, 0);
    return {
      category,
      titleCount: inCategory.length,
      availableCopies: availInCategory,
      totalCopies: totalInCategory,
    };
  });

  return (
    <section
      id="statistik"
      aria-labelledby="statistik-heading"
      className="bg-gingham-soft border-b border-[#DDE4EF] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-xl border border-[#DDE4EF] bg-white p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EEF2F7]">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#4A5A75]">
                Transparansi Koleksi & Layanan
              </p>
              <h2
                id="statistik-heading"
                className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#162238] [text-wrap:balance]"
              >
                Statistik Kunjungan & Ketersediaan Koleksi
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4A5A75]">
              Pembaruan otomatis mengikuti aktivitas peminjaman Anda
            </p>
          </div>

          {/* 4-Column KPI Strip */}
          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] p-5">
              <dt className="text-xs font-medium text-[#4A5A75]">Total Kunjungan Situs</dt>
              <dd className="mt-2 font-mono-num text-3xl font-semibold text-[#162238]">
                {totalVisits.toLocaleString('id-ID')}
              </dd>
              <p className="mt-1.5 text-xs text-[#4A5A75] font-mono-num">
                +{todayVisits.toLocaleString('id-ID')} kunjungan hari ini
              </p>
            </div>

            <div className="rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] p-5">
              <dt className="text-xs font-medium text-[#4A5A75]">Judul Koleksi Tersedia</dt>
              <dd className="mt-2 font-mono-num text-3xl font-semibold text-[#1D3557]">
                {availableTitles}{' '}
                <span className="text-lg font-normal text-[#4A5A75]">/ {totalTitles}</span>
              </dd>
              <p className="mt-1.5 text-xs text-[#4A5A75]">
                Judul siap dipinjam & dibaca langsung
              </p>
            </div>

            <div className="rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] p-5">
              <dt className="text-xs font-medium text-[#4A5A75]">Eksemplar Digital Tersedia</dt>
              <dd className="mt-2 font-mono-num text-3xl font-semibold text-[#162238]">
                {availableCopies}{' '}
                <span className="text-lg font-normal text-[#4A5A75]">/ {totalCopies}</span>
              </dd>
              <p className="mt-1.5 text-xs text-[#4A5A75] font-mono-num">
                {borrowedCount} buku sedang Anda pinjam
              </p>
            </div>

            <div className="rounded-lg border border-[#DDE4EF] bg-[#FAF9F6] p-5">
              <dt className="text-xs font-medium text-[#4A5A75]">Akumulasi Sirkulasi Baca</dt>
              <dd className="mt-2 font-mono-num text-3xl font-semibold text-[#162238]">
                {(baseCirculation + borrowedCount).toLocaleString('id-ID')}
              </dd>
              <p className="mt-1.5 text-xs text-[#4A5A75]">
                100% tersedia dalam format EPUB/PDF
              </p>
            </div>
          </dl>

          {/* Category Collection Distribution */}
          <div className="mt-8 pt-8 border-t border-[#EEF2F7]">
            <h3 className="text-sm font-semibold text-[#162238]">
              Rincian Ketersediaan per Bidang Ilmu
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {categoryBreakdown.map((item) => {
                const percentage =
                  item.totalCopies > 0
                    ? Math.round((item.availableCopies / item.totalCopies) * 100)
                    : 0;

                return (
                  <div key={item.category}>
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                      <span className="font-medium text-[#162238]">{item.category}</span>
                      <span className="font-mono-num text-[#4A5A75]">
                        {item.titleCount} judul · {item.availableCopies}/{item.totalCopies} eksemplar
                      </span>
                    </div>
                    <div
                      className="h-2.5 w-full overflow-hidden rounded-full bg-[#EDF2F8]"
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Ketersediaan ${item.category}: ${percentage}%`}
                    >
                      <div
                        className="h-full rounded-full bg-[#1D3557] transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
