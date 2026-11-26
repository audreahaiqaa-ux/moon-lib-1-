export type BookCategory =
  | 'Sastra & Fiksi'
  | 'Sains & Astronomi'
  | 'Sejarah & Budaya'
  | 'Teknologi'
  | 'Filsafat'
  | 'Pengembangan Diri';

export type ClothTheme = 'indigo' | 'periwinkle' | 'sage' | 'slate' | 'linen' | 'bronze';

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  category: BookCategory;
  year: number;
  pages: number;
  language: string;
  isbn: string;
  callNumber: string;
  publisher: string;
  format: 'EPUB & PDF' | 'EPUB' | 'PDF';
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  rating: number;
  isPopular: boolean;
  popularRank?: number;
  coverImage?: string;
  clothTheme: ClothTheme;
  summary: string;
  keywords: string[];
  previewChapterTitle: string;
  previewParagraphs: string[];
}

export interface FaqItem {
  id: string;
  category: 'Pencarian & Katalog' | 'Peminjaman Digital' | 'Aksesibilitas' | 'Teknis';
  question: string;
  answer: string;
}

export interface NavigationGuideStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  targetSectionId: string;
  actionLabel: string;
}

export const CATEGORIES: BookCategory[] = [
  'Sastra & Fiksi',
  'Sains & Astronomi',
  'Sejarah & Budaya',
  'Teknologi',
  'Filsafat',
  'Pengembangan Diri',
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'moon-01',
    title: 'Lunar Echoes: Atlas Fase Bulan',
    subtitle: 'Catatan Observasi Langit Malam untuk Pembaca Umum',
    author: 'Eliza R. Vance',
    category: 'Sains & Astronomi',
    year: 2025,
    pages: 312,
    language: 'Indonesia & Inggris',
    isbn: '978-623-418-012-4',
    callNumber: '523.3 VAN l',
    publisher: 'Pustaka Cakrawala',
    format: 'EPUB & PDF',
    totalCopies: 6,
    availableCopies: 4,
    borrowCount: 1480,
    rating: 4.9,
    isPopular: true,
    popularRank: 1,
    coverImage: '/src/assets/images/book_moon_atlas_1795659741610.jpg',
    clothTheme: 'indigo',
    summary:
      'Panduan visual dan naratif mengenai siklus bulan sabit hingga purnama, lengkap dengan sejarah kalender lunar Nusantara serta peta kawah bulan yang mudah dipahami pembaca awam.',
    keywords: ['bulan', 'astronomi', 'langit', 'kalender', 'observasi'],
    previewChapterTitle: 'Bab 1: Mengapa Kita Memandang Bulan yang Sama',
    previewParagraphs: [
      'Setiap dua puluh sembilan setengah hari, cahaya matahari melukis ulang wajah satelit alami bumi dengan kesabaran geometris yang menenangkan. Sejak masa pelayar kuno di kepulauan timur hingga teleskop modern di dataran tinggi, fase bulan menjadi penunjuk waktu paling setia bagi peradaban manusia.',
      'Dalam bab pembuka ini, kita diajak mengamati perbedaan tipis antara bulan sabit muda (waxing crescent) yang tampak sesaat setelah senja dan sabit tua (waning crescent) yang muncul menjelang fajar. Tidak diperlukan instrumen rumit; cukup sepasang mata, langit yang jernih, dan buku catatan saku.',
      'Menariknya, pola pasang surut laut di pesisir selatan Jawa maupun ritme tanam masyarakat agraris selama berabad-abad berpijak pada pembacaan siklus lunar yang presisi. Sains modern tidak menggantikan kekaguman itu—ia justru memperjelas simetri alam yang selama ini kita saksikan.',
    ],
  },
  {
    id: 'moon-02',
    title: 'The Memory of Blue',
    subtitle: 'Kumpulan Cerita Pendek Tentang Kain, Musim, dan Surat Lama',
    author: 'Eliza Reed',
    category: 'Sastra & Fiksi',
    year: 2025,
    pages: 248,
    language: 'Indonesia',
    isbn: '978-623-418-029-2',
    callNumber: '813 REE m',
    publisher: 'Lentera Aksara',
    format: 'EPUB & PDF',
    totalCopies: 5,
    availableCopies: 3,
    borrowCount: 1295,
    rating: 4.8,
    isPopular: true,
    popularRank: 2,
    coverImage: '/src/assets/images/book_gingham_stories_1795659741510.jpg',
    clothTheme: 'periwinkle',
    summary:
      'Sebelas kisah hangat yang berpusat pada sebuah rumah penjahit di tepi kota pelabuhan, tempat sehelai kain kotak-kotak biru menyimpan ingatan tiga generasi keluarga.',
    keywords: ['fiksi', 'cerpen', 'gingham', 'keluarga', 'sastra'],
    previewChapterTitle: 'Bab 1: Taplak Kotak-Kotak di Beranda Utara',
    previewParagraphs: [
      'Nenek selalu bilang bahwa pola tenun gingham tidak pernah benar-benar memiliki sisi depan atau sisi belakang; kedua permukaannya sama-sama jujur memperlihatkan persilangan benang biru dan putih. Begitu pula cerita yang ia simpan di laci kayu jati ruang tengah.',
      'Pada sore ketika hujan pertama turun di bulan November, Alina membentangkan kembali taplak tua itu di atas meja baca. Di salah satu sudutnya masih terdapat jahitan tangan halus berbentuk bulan sabit kecil—tanda milik ibunya sebelum pindah ke kota seberang.',
      'Kisah-kisah dalam buku ini bergerak perlahan seperti jarum jahit yang menembus katun tebal, merangkai percakapan sederhana di dapur, aroma teh melati, serta keberanian untuk memaafkan jarak waktu.',
    ],
  },
  {
    id: 'moon-03',
    title: 'Archival Cultural History',
    subtitle: 'Studi Warisan Budaya, Memori Kolektif, dan Narasi Global',
    author: 'Sarah L. Jenkins & David W. Chen',
    category: 'Sejarah & Budaya',
    year: 2024,
    pages: 416,
    language: 'Indonesia & Inggris',
    isbn: '978-623-418-044-5',
    callNumber: '909 JEN a',
    publisher: 'Balai Monograf Nusantara',
    format: 'PDF',
    totalCopies: 4,
    availableCopies: 2,
    borrowCount: 1120,
    rating: 4.8,
    isPopular: true,
    popularRank: 3,
    coverImage: '/src/assets/images/book_nusantara_archive_1795659743767.jpg',
    clothTheme: 'linen',
    summary:
      'Kajian komprehensif tentang bagaimana arsip tekstil, manuskrip pesisir, dan catatan museum membentuk ingatan lintas bangsa secara inklusif dan terverifikasi.',
    keywords: ['sejarah', 'arsip', 'budaya', 'museum', 'warisan'],
    previewChapterTitle: 'Pendahuluan: Membaca Arsip sebagai Ruang Hidup',
    previewParagraphs: [
      'Arsip sering disalahpahami sebagai gudang sunyi berisi kertas menguning yang hanya disentuh peneliti spesialis. Padahal, di balik setiap nomor katalog dan catatan kuratorial, terdapat denyut kehidupan sehari-hari masyarakat lampau yang relevan untuk hari ini.',
      'Monograf ini menelusuri praktik pelestarian dokumen di Asia Tenggara dan Eropa, menyoroti peran digitalisasi terbuka agar mahasiswa, pelajar, dan warga umum dapat mengakses sumber primer tanpa hambatan geografis.',
      'Melalui perbandingan motif tenun, cap dagang pelabuhan, serta korespondensi pustakawan abad ke-19, penulis menunjukkan bahwa pengetahuan selalu tumbuh dari pertukaran gagasan yang setara.',
    ],
  },
  {
    id: 'moon-04',
    title: 'Astrophysics: The Search for Meaning',
    subtitle: 'Esai Kosmos, Waktu, dan Pengetahuan Manusia',
    author: 'Dr. Eliza Reed & Kolaborator',
    category: 'Sains & Astronomi',
    year: 2026,
    pages: 340,
    language: 'Indonesia',
    isbn: '978-623-418-081-0',
    callNumber: '523.01 REE a',
    publisher: 'Pustaka Cakrawala',
    format: 'EPUB & PDF',
    totalCopies: 5,
    availableCopies: 4,
    borrowCount: 1040,
    rating: 4.9,
    isPopular: true,
    popularRank: 4,
    coverImage: '/src/assets/images/book_astronomy_letters_1795659742780.jpg',
    clothTheme: 'slate',
    summary:
      'Kumpulan esai sains populer yang menjembatani fisika astrofisika modern dengan pertanyaan filosofis manusia tentang ruang, gravitasi, dan asal-usul cahaya bintang.',
    keywords: ['astrofisika', 'kosmos', 'bintang', 'waktu', 'sains'],
    previewChapterTitle: 'Esai I: Cahaya yang Menempuh Ribuan Tahun',
    previewParagraphs: [
      'Ketika kita menatap gugus bintang Orion di malam cerah, mata kita sebenarnya sedang menyentuh sejarah purba alam semesta. Foton yang tiba di retina kita malam ini telah menempuh perjalanan ratusan tahun melintasi ruang hampa.',
      'Astrofisika tidak meminta kita melupakan rasa takjub masa kecil; sebaliknya, persamaan matematika dan instrumen spektroskopi memberi kita bahasa baru untuk memahami bagaimana unsur karbon di tubuh kita pernah ditempa di inti bintang raksasa.',
      'Setiap bab dirancang ringkas agar dapat dibaca dalam satu kali duduk di sore hari, dilengkapi ilustrasi orbit serta catatan kaki yang jelas.',
    ],
  },
  {
    id: 'moon-05',
    title: 'Pause & Reflect',
    subtitle: 'Minimalisme, Kesadaran Penuh, dan Seni Menjalani Hari',
    author: 'Eliza Rae',
    category: 'Filsafat',
    year: 2025,
    pages: 210,
    language: 'Indonesia',
    isbn: '978-623-418-095-7',
    callNumber: '158.1 RAE p',
    publisher: 'Ruang Tenang Press',
    format: 'EPUB & PDF',
    totalCopies: 6,
    availableCopies: 5,
    borrowCount: 985,
    rating: 4.7,
    isPopular: true,
    popularRank: 5,
    coverImage: '/src/assets/images/book_quiet_mind_1795659744089.jpg',
    clothTheme: 'sage',
    summary:
      'Refleksi praktis tentang menata ritme perhatian di era banjir informasi, memadukan pemikiran filsafat stoik, etika kerja tenang, dan kebiasaan membaca mendalam.',
    keywords: ['filsafat', 'ketenangan', 'minimalisme', 'refleksi', 'membaca'],
    previewChapterTitle: 'Bagian 1: Jeda Sebelum Langkah Berikutnya',
    previewParagraphs: [
      'Kecepatan sering dikira sebagai tanda kemajuan, padahal ketenanganlah yang memungkinkan kita memilih arah dengan jernih. Mengambil jeda lima menit di antara dua pekerjaan bukanlah kemalasan, melainkan perawatan terhadap kejernihan berpikir.',
      'Dalam tradisi membaca lambat (slow reading), satu halaman yang direnungkan dengan sungguh-sungguh jauh lebih bernilai dibandingkan sepuluh ringkasan instan yang segera terlupakan.',
      'Buku ini menawarkan latihan sederhana—mulai dari merapikan meja baca hingga mencatat tiga hal yang patut disyukuri sebelum malam tiba.',
    ],
  },
  {
    id: 'moon-06',
    title: 'Arsitektur Web yang Ramah Semua Orang',
    subtitle: 'Prinsip Desain Inklusif dan Aksesibilitas Digital WCAG',
    author: 'Raka Pratama & Nabila Putri',
    category: 'Teknologi',
    year: 2025,
    pages: 294,
    language: 'Indonesia',
    isbn: '978-623-418-104-6',
    callNumber: '005.7 PRA a',
    publisher: 'Pustaka Kode Terbuka',
    format: 'EPUB & PDF',
    totalCopies: 5,
    availableCopies: 5,
    borrowCount: 842,
    rating: 4.9,
    isPopular: false,
    clothTheme: 'indigo',
    summary:
      'Buku pegangan teknis dan desain untuk membangun antarmuka web yang nyaman bagi pengguna pembaca layar, navigasi papan ketik, serta penyandang gangguan penglihatan warna.',
    keywords: ['aksesibilitas', 'wcag', 'web', 'teknologi', 'desain'],
    previewChapterTitle: 'Bab 1: Mengapa Aksesibilitas Adalah Fondasi, Bukan Tambahan',
    previewParagraphs: [
      'Setiap kali kita memilih kontras teks yang jelas, melabeli tombol dengan bahasa lugas, dan memastikan seluruh menu dapat diakses lewat tombol Tab, kita sedang membuka pintu perpustakaan bagi ribuan pembaca tambahan.',
      'Aksesibilitas yang baik jarang tampak mencolok; ia terasa seperti udara segar yang membuat siapa pun betah membaca lebih lama tanpa lelah.',
    ],
  },
  {
    id: 'moon-07',
    title: 'Jejak Rempah di Pesisir Timur',
    subtitle: 'Sejarah Maritim dan Perdagangan Abad ke-16',
    author: 'Dr. Hendra Kusuma',
    category: 'Sejarah & Budaya',
    year: 2024,
    pages: 380,
    language: 'Indonesia',
    isbn: '978-623-418-119-0',
    callNumber: '959.8 KUS j',
    publisher: 'Balai Monograf Nusantara',
    format: 'PDF',
    totalCopies: 3,
    availableCopies: 2,
    borrowCount: 790,
    rating: 4.8,
    isPopular: false,
    clothTheme: 'bronze',
    summary:
      'Penelusuran rute pelayaran niaga pala, cengkeh, dan lada beserta diplomasi kerajaan maritim Nusantara berdasarkan catatan nakhoda dan surat dagang klasik.',
    keywords: ['maritim', 'rempah', 'nusantara', 'sejarah', 'pelayaran'],
    previewChapterTitle: 'Bab 1: Angin Muson dan Pelabuhan Niaga',
    previewParagraphs: [
      'Sebelum peta satelit digambar, kalender angin muson menjadi kompas utama yang menghubungkan pelabuhan Maluku, Makassar, Malaka, hingga Gujarat. Kapal-kapal dagang tidak hanya membawa komoditas, tetapi juga bahasa, resep kuliner, dan naskah sastra.',
      'Rekonstruksi pelabuhan kuno dalam buku ini memperlihatkan betapa dinamisnya perjumpaan budaya di tepi laut Nusantara.',
    ],
  },
  {
    id: 'moon-08',
    title: 'Senja di Perpustakaan Kota',
    subtitle: 'Novel Tentang Persahabatan dan Buku-Buku Hilang',
    author: 'Saraswati Dewi',
    category: 'Sastra & Fiksi',
    year: 2024,
    pages: 276,
    language: 'Indonesia',
    isbn: '978-623-418-132-9',
    callNumber: '899.221 DEW s',
    publisher: 'Lentera Aksara',
    format: 'EPUB',
    totalCopies: 4,
    availableCopies: 4,
    borrowCount: 755,
    rating: 4.7,
    isPopular: false,
    clothTheme: 'periwinkle',
    summary:
      'Kisah seorang pustakawan muda yang menemukan catatan tangan misterius di balik kartu katalog tua, membawanya menelusuri kisah cinta masa lalu di sudut kota Bandung.',
    keywords: ['novel', 'pustakawan', 'bandung', 'sastra', 'fiksi'],
    previewChapterTitle: 'Bab 1: Laci Katalog Huruf M',
    previewParagraphs: [
      'Pukul lima sore di gedung perpustakaan tua itu selalu berbau kertas kering dan lantai kayu yang baru disapu. Ketika Mira merapikan kartu pinjam dekade delapan puluhan, selembar pembatas buku bermotif kotak biru terjatuh ke pangkuannya.',
      'Di baliknya tertulis sebuah judul buku yang tidak pernah tercatat dalam daftar induk mana pun.',
    ],
  },
  {
    id: 'moon-09',
    title: 'Logika Sehari-hari untuk Pengambil Keputusan',
    subtitle: 'Mengenali Bias Kognitif dan Menyusun Argumen Jernih',
    author: 'Prof. Darmawan Setiadi',
    category: 'Filsafat',
    year: 2023,
    pages: 260,
    language: 'Indonesia',
    isbn: '978-623-418-145-9',
    callNumber: '160 SET l',
    publisher: 'Ruang Tenang Press',
    format: 'EPUB & PDF',
    totalCopies: 5,
    availableCopies: 3,
    borrowCount: 688,
    rating: 4.6,
    isPopular: false,
    clothTheme: 'slate',
    summary:
      'Pengantar berpikir kritis dan penalaran logis melalui contoh kasus keseharian—mulai dari membaca berita, berdiskusi di rapat kerja, hingga mengevaluasi klaim statistik.',
    keywords: ['logika', 'berpikir kritis', 'filsafat', 'argumen'],
    previewChapterTitle: 'Bab 1: Mengapa Fakta Saja Kadang Belum Cukup',
    previewParagraphs: [
      'Berpikir kritis bukanlah mencari-cari kesalahan orang lain, melainkan melatih kebiasaan memeriksa dasar pemikiran kita sendiri sebelum menyimpulkan sesuatu secara tergesa-gesa.',
      'Setiap bab disertai latihan dialog singkat agar pembaca dapat mempraktikkan pertanyaan klarifikasi yang santun namun tajam.',
    ],
  },
  {
    id: 'moon-10',
    title: 'Kebiasaan Kecil, Dampak Panjang',
    subtitle: 'Panduan Menyusun Ritme Belajar Mandiri yang Konsisten',
    author: 'Anisa Rahmadani',
    category: 'Pengembangan Diri',
    year: 2025,
    pages: 224,
    language: 'Indonesia',
    isbn: '978-623-418-160-2',
    callNumber: '158.1 RAH k',
    publisher: 'Tumbuh Bersama Pustaka',
    format: 'EPUB & PDF',
    totalCopies: 6,
    availableCopies: 6,
    borrowCount: 910,
    rating: 4.8,
    isPopular: false,
    clothTheme: 'sage',
    summary:
      'Metode praktis membangun kebiasaan membaca 20 menit setiap hari, membuat catatan ringkas (Zettelkasten), dan menjaga motivasi belajar tanpa tekanan berlebih.',
    keywords: ['kebiasaan', 'belajar', 'produktivitas', 'pengembangan diri'],
    previewChapterTitle: 'Bab 1: Aturan Dua Puluh Menit Sebelum Tidur',
    previewParagraphs: [
      'Target membaca lima puluh buku setahun sering kali membuat kita berhenti di minggu ketiga Januari. Namun ketika target diubah menjadi cukup membuka satu bab pendek setiap malam, kebiasaan itu bertahan bertahun-tahun.',
      'Konsistensi lahir dari lingkungan yang mendukung—meja yang rapi, cahaya lampu baca yang hangat, dan daftar baca yang realistis.',
    ],
  },
  {
    id: 'moon-11',
    title: 'Dasar-Dasar Kecerdasan Komputasional',
    subtitle: 'Algoritma, Struktur Data, dan Etika Pemrosesan Informasi',
    author: 'Bagas Prakoso, M.Kom.',
    category: 'Teknologi',
    year: 2025,
    pages: 368,
    language: 'Indonesia',
    isbn: '978-623-418-174-9',
    callNumber: '004.01 PRA d',
    publisher: 'Pustaka Kode Terbuka',
    format: 'PDF',
    totalCopies: 4,
    availableCopies: 0,
    borrowCount: 730,
    rating: 4.7,
    isPopular: false,
    clothTheme: 'indigo',
    summary:
      'Referensi kuliah dan pembelajar mandiri mengenai cara kerja pencarian indeks, struktur pohon, efisiensi algoritma, dan tata kelola privasi data modern.',
    keywords: ['algoritma', 'komputer', 'data', 'teknologi', 'pemrograman'],
    previewChapterTitle: 'Bab 1: Seni Mencari Satu Judul di Tengah Jutaan Entri',
    previewParagraphs: [
      'Pernahkah Anda membayangkan bagaimana sebuah perpustakaan digital menemukan satu buku tepat dalam hitungan milidetik? Rahasianya terletak pada struktur indeks terurut dan pemetaan kata kunci yang dirancang cermat.',
      'Bab pertama menguraikan analogi lemari kartu katalog fisik untuk menjelaskan pencarian biner dan tabel hash secara intuitif.',
    ],
  },
  {
    id: 'moon-12',
    title: 'Botani Halaman Rumah',
    subtitle: 'Mengenal Tanaman Tropis dan Ekosistem Pekarangan',
    author: 'Dr. Melati Wijaya',
    category: 'Sains & Astronomi',
    year: 2024,
    pages: 256,
    language: 'Indonesia',
    isbn: '978-623-418-189-3',
    callNumber: '581.9 WIJ b',
    publisher: 'Pustaka Cakrawala',
    format: 'EPUB & PDF',
    totalCopies: 4,
    availableCopies: 3,
    borrowCount: 615,
    rating: 4.8,
    isPopular: false,
    clothTheme: 'sage',
    summary:
      'Panduan mengenal lebih dari enam puluh jenis flora tropis yang tumbuh di sekitar permukiman, lengkap dengan cara perawatan alami dan perannya bagi penyerbuk lokal.',
    keywords: ['botani', 'tanaman', 'alam', 'ekologi', 'sains'],
    previewChapterTitle: 'Bab 1: Ekosistem Mini di Balik Jendela Dapur',
    previewParagraphs: [
      'Tidak perlu pergi ke hutan hujan untuk mempelajari keajaiban botani. Sepetak tanah di teras rumah atau tiga pot tanaman herbal sudah cukup menjadi laboratorium pengamatan perubahan musim dan kehidupan serangga.',
    ],
  },
  {
    id: 'moon-13',
    title: 'Tipografi Buku & Keterbacaan',
    subtitle: 'Sejarah Huruf Cetak hingga Layar Digital',
    author: 'Yusuf Alamsyah',
    category: 'Teknologi',
    year: 2023,
    pages: 232,
    language: 'Indonesia',
    isbn: '978-623-418-201-2',
    callNumber: '686.2 ALA t',
    publisher: 'Pustaka Kode Terbuka',
    format: 'EPUB & PDF',
    totalCopies: 3,
    availableCopies: 3,
    borrowCount: 540,
    rating: 4.8,
    isPopular: false,
    clothTheme: 'linen',
    summary:
      'Mengupas proporsi margin halaman, tinggi baris, pilihan huruf serif maupun sans-serif, serta pengaruhnya terhadap kenyamanan membaca jangka panjang.',
    keywords: ['tipografi', 'desain buku', 'huruf', 'membaca'],
    previewChapterTitle: 'Bab 1: Ruang Kosong yang Membuat Huruf Bernapas',
    previewParagraphs: [
      'Desain halaman yang baik bekerja seperti kaca jendela yang bersih—pembaca dapat langsung menikmati isi pikiran penulis tanpa terganggu oleh hiasan yang berlebihan.',
    ],
  },
  {
    id: 'moon-14',
    title: 'Catatan Perjalanan Pengamat Bintang',
    subtitle: 'Memoar Observatorium Bosscha hingga Gurun Atacama',
    author: 'Rizal Mahendra',
    category: 'Pengembangan Diri',
    year: 2025,
    pages: 288,
    language: 'Indonesia',
    isbn: '978-623-418-215-9',
    callNumber: '520.92 MAH c',
    publisher: 'Tumbuh Bersama Pustaka',
    format: 'EPUB',
    totalCopies: 4,
    availableCopies: 2,
    borrowCount: 660,
    rating: 4.9,
    isPopular: false,
    clothTheme: 'periwinkle',
    summary:
      'Kisah inspiratif tentang ketekunan seorang peneliti muda Indonesia meniti karier astronomi pengamatan dari bukit Lembang hingga jaringan teleskop internasional.',
    keywords: ['memoar', 'astronomi', 'inspirasi', 'perjalanan'],
    previewChapterTitle: 'Bab 1: Malam Pertama di Kubah Lembang',
    previewParagraphs: [
      'Ketika kubah logam perlahan berputar dan terbuka menghadapi langit malam Bandung utara, dinginnya udara pegunungan seketika terlupakan oleh bentangan Bima Sakti yang begitu dekat.',
    ],
  },
  {
    id: 'moon-15',
    title: 'Tenun & Simetri dalam Budaya Dunia',
    subtitle: 'Dari Gingham Skotlandia hingga Lurik Jawa',
    author: 'Kartika Sari',
    category: 'Sejarah & Budaya',
    year: 2025,
    pages: 304,
    language: 'Indonesia',
    isbn: '978-623-418-228-9',
    callNumber: '746.1 SAR t',
    publisher: 'Balai Monograf Nusantara',
    format: 'EPUB & PDF',
    totalCopies: 5,
    availableCopies: 5,
    borrowCount: 712,
    rating: 4.9,
    isPopular: false,
    clothTheme: 'periwinkle',
    summary:
      'Eksplorasi sejarah tekstil kotak-kotak dan garis di berbagai belahan dunia—bagaimana pola gingham dan lurik melambangkan kesederhanaan, ketelitian matematis, dan ketahanan budaya.',
    keywords: ['gingham', 'lurik', 'tekstil', 'tenun', 'budaya'],
    previewChapterTitle: 'Bab 1: Pertemuan Benang Lusi dan Pakan',
    previewParagraphs: [
      'Pola kotak-kotak gingham lahir dari kesederhanaan aturan tenun dua warna: ketika garis vertikal dan horizontal saling melintasi dengan kerapatan seimbang, lahirlah kotak tengah dengan rona lembut yang menenangkan mata.',
      'Di tanah Jawa, filosofi keseimbangan serupa hadir dalam kain lurik yang melambangkan keteguhan hati serta keselarasan hidup bermasyarakat.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Pencarian & Katalog',
    question: 'Bagaimana cara mencari buku secara cepat di Moon Library?',
    answer:
      'Gunakan kolom pencarian di bagian awal halaman untuk mengetikkan judul buku, nama penulis, kata kunci subjek, atau nomor ISBN. Hasil akan muncul secara langsung, dan Anda juga dapat menekan tombol garis miring (/) pada papan ketik untuk langsung memfokuskan kursor ke kotak pencarian.',
  },
  {
    id: 'faq-2',
    category: 'Pencarian & Katalog',
    question: 'Apa perbedaan kolom Rekomendasi Buku Populer dan Katalog Koleksi?',
    answer:
      'Kolom Rekomendasi Buku Populer menampilkan lima judul yang paling sering dipinjam dan mendapatkan ulasan tertinggi bulan ini. Sementara itu, Katalog Koleksi memuat seluruh judul digital yang dapat disaring berdasarkan kategori ilmu, ketersediaan eksemplar, maupun urutan abjad.',
  },
  {
    id: 'faq-3',
    category: 'Peminjaman Digital',
    question: 'Bagaimana cara meminjam dan membaca buku secara online?',
    answer:
      'Klik kartu buku mana saja untuk membuka jendela Detail Buku. Pilih tombol "Pinjam & Baca" apabila eksemplar tersedia, atau klik "Baca Pratinjau" untuk langsung membaca bab pembuka di ruang baca digital kami tanpa perlu mengunduh aplikasi tambahan.',
  },
  {
    id: 'faq-4',
    category: 'Peminjaman Digital',
    question: 'Berapa lama batas waktu peminjaman buku digital?',
    answer:
      'Setiap buku digital dapat dipinjam hingga 14 hari kalender dan dapat dikembalikan lebih awal kapan saja melalui menu Daftar Baca di pojok kanan atas. Pengembalian lebih awal otomatis menambah jumlah koleksi tersedia bagi pembaca lain.',
  },
  {
    id: 'faq-5',
    category: 'Peminjaman Digital',
    question: 'Apa yang harus dilakukan jika semua eksemplar buku sedang dipinjam?',
    answer:
      'Anda tetap dapat menyimpan buku tersebut ke dalam Daftar Baca dan membaca bab pratinjaunya secara penuh. Begitu ada pengguna lain yang mengembalikan buku, status ketersediaan akan otomatis berubah menjadi Tersedia.',
  },
  {
    id: 'faq-6',
    category: 'Aksesibilitas',
    question: 'Fitur aksesibilitas apa saja yang tersedia di Moon Library?',
    answer:
      'Moon Library menyediakan pengatur Ukuran Teks (Standar dan Besar), mode Kontras Tinggi untuk kenyamanan penglihatan, navigasi penuh menggunakan papan ketik (Tab, Enter, Esc, dan /), serta ruang baca dengan pilihan tema kertas hangat yang mengurangi silau layar.',
  },
  {
    id: 'faq-7',
    category: 'Aksesibilitas',
    question: 'Apakah Moon Library kompatibel dengan pembaca layar (screen reader)?',
    answer:
      'Ya. Seluruh struktur navigasi, formulir pencarian, dialog pratinjau, dan pengumuman hasil filter dibangun menggunakan penanda semantik HTML5 dan atribut ARIA agar pembaca layar dapat membacakan judul, jumlah koleksi tersedia, serta deskripsi buku dengan akurat.',
  },
  {
    id: 'faq-8',
    category: 'Teknis',
    question: 'Apakah daftar buku tersimpan saya aman jika halaman dimuat ulang?',
    answer:
      'Ya, daftar buku yang Anda simpan dan status peminjaman aktif tersimpan otomatis di penyimpanan peramban (localStorage) perangkat Anda sehingga tetap ada saat halaman dibuka kembali.',
  },
];

export const NAVIGATION_GUIDES: NavigationGuideStep[] = [
  {
    id: 'guide-1',
    stepNumber: '01',
    title: 'Pencarian Cepat di Awal Laman',
    description:
      'Ketik judul, penulis, atau subjek pada kotak pencarian utama. Anda juga dapat memilih kata kunci cepat di bawah kotak pencarian untuk menyaring koleksi dalam satu klik.',
    targetSectionId: 'pencarian',
    actionLabel: 'Ke Pencarian',
  },
  {
    id: 'guide-2',
    stepNumber: '02',
    title: 'Jelajahi Rekomendasi Populer',
    description:
      'Lihat buku pilihan utama dan empat judul terpopuler bulan ini di kolom rekomendasi awal sebelum menelusuri keseluruhan rak digital.',
    targetSectionId: 'rekomendasi',
    actionLabel: 'Lihat Populer',
  },
  {
    id: 'guide-3',
    stepNumber: '03',
    title: 'Saring Katalog & Buka Ruang Baca',
    description:
      'Gunakan tab kategori dan filter ketersediaan pada bagian Katalog. Klik buku mana saja untuk membaca bab pratinjau atau meminjamnya.',
    targetSectionId: 'katalog',
    actionLabel: 'Buka Katalog',
  },
  {
    id: 'guide-4',
    stepNumber: '04',
    title: 'Kelola Daftar Baca & Statistik',
    description:
      'Buka tombol Daftar Baca di bilah atas untuk mengelola buku pinjaman Anda, atau pantau jumlah koleksi tersedia di bagian Statistik di akhir halaman.',
    targetSectionId: 'statistik',
    actionLabel: 'Lihat Statistik',
  },
];

export const BASE_VISITOR_STATS = {
  totalVisits: 128450,
  todayVisits: 1284,
  activeReadersNow: 47,
  baseCirculation: 42910,
};
