# SEA Catering - Aplikasi Pemesanan Katering Sehat

SEA Catering adalah aplikasi web modern yang dibangun dengan Next.js 15, dirancang untuk menyediakan solusi pemesanan katering makanan sehat yang mudah dan menyenangkan. Aplikasi ini menawarkan rekomendasi menu yang dipersonalisasi, rencana makan, dan berbagai fitur lainnya untuk mendukung gaya hidup sehat Anda.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan tumpukan teknologi modern yang berfokus pada kinerja dan pengalaman pengembang:

  * **Framework**: [Next.js 15](https://nextjs.org/docs/getting-started) (dengan App Router & Turbopack)
  * **UI Komponen**: [HeroUI v2](https://heroui.com/) - Koleksi komponen antarmuka pengguna yang indah dan dapat disesuaikan.
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan [Tailwind Variants](https://tailwind-variants.org) untuk styling yang sangat dapat disesuaikan dan efisien.
  * **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - ORM TypeScript-first yang ringan dan cepat untuk berinteraksi dengan basis data.
  * **Autentikasi**: [Better Auth](https://www.google.com/search?q=https://better-auth.dev/) - Solusi autentikasi lengkap dan mudah digunakan yang terintegrasi dengan Drizzle.
  * **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
  * **Animasi**: [Framer Motion](https://www.framer.com/motion/) untuk animasi antarmuka pengguna yang kaya dan lancar.
  * **Basis Data**: PostgreSQL
  * **Validasi**: [Zod](https://zod.dev/) untuk validasi skema dan tipe data.

## Fitur Utama

  * **Autentikasi Pengguna**: Sistem masuk dan pendaftaran yang aman menggunakan email/kata sandi dan penyedia OAuth (Google).
  * **Beranda Dinamis**: Halaman utama yang menarik dengan beberapa bagian termasuk Hero, Fitur, Statistik, Pameran Paket Makanan, Testimonial, dan Ajakan Bertindak (CTA).
  * **Personalisasi Menu**: Rekomendasi menu yang disesuaikan dengan preferensi pengguna.
  * **Paket Langganan**: Berbagai pilihan paket makanan untuk memenuhi berbagai kebutuhan diet.
  * **Desain Responsif**: Antarmuka yang sepenuhnya responsif yang berfungsi dengan baik di perangkat desktop dan seluler.

## Memulai

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah di bawah ini.

### Prasyarat

Pastikan Anda memiliki Node.js (versi 18.18.0 atau lebih baru direkomendasikan) dan manajer paket (npm, yarn, pnpm, atau bun) terpasang di sistem Anda.

### 1\. Kloning Repositori

```bash
git clone https://github.com/heraldoarman/sea-catering.git
cd sea-catering
```

### 2\. Instal Dependensi

Proyek ini menggunakan banyak paket yang memerlukan flag `--legacy-peer-deps` saat instalasi dengan `npm` karena beberapa konflik ketergantungan antar-paket.

```bash
npm install --legacy-peer-deps
```

### 3\. Pengaturan Variabel Lingkungan

Buat file `.env` di direktori root proyek Anda dan tambahkan variabel lingkungan berikut. Ganti nilai kosong dengan kredensial Anda.

```env
# Rahasia untuk menandatangani token sesi Better Auth
BETTER_AUTH_SECRET="your_strong_secret_here"

# URL lengkap aplikasi Anda (untuk callback OAuth dan lainnya)
BETTER_AUTH_URL="http://localhost:3000"

# URL koneksi ke basis data PostgreSQL Anda
DATABASE_URL="postgresql://user:password@host:port/database"
```

**Catatan Keamanan**: JANGAN pernah membagikan file `.env` Anda atau mengekspos rahasia Anda di repositori publik. File `.gitignore` sudah dikonfigurasi untuk mengabaikan file ini.

### 4\. Migrasi Basis Data

Setelah Anda mengatur `DATABASE_URL`, jalankan perintah berikut untuk mendorong skema basis data Anda ke penyedia basis data Anda.

```bash
npx drizzle-kit push
```

### 5\. Menjalankan Server Pengembangan

Sekarang Anda dapat memulai server pengembangan, yang didukung oleh Turbopack untuk kecepatan maksimal.

```bash
npm run dev
```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di peramban Anda untuk melihat aplikasi berjalan.

## Struktur Proyek

Berikut adalah gambaran umum tentang struktur direktori proyek:

```
/
├── app/                  # Direktori Aplikasi Next.js 15
│   ├── (auth)/           # Grup rute untuk halaman autentikasi
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── api/              # Rute API
│   │   └── auth/
│   │       └── [...all]/ # Rute penampung untuk Better Auth
│   ├── contact/          # Halaman Kontak
│   ├── products/         # Halaman Produk/Harga
│   ├── subscription/     # Halaman Langganan
│   ├── layout.tsx        # Layout utama
│   ├── page.tsx          # Halaman utama (Beranda)
│   └── providers.tsx     # Penyedia tema dan UI
├── components/           # Komponen React yang dapat digunakan kembali
│   ├── landing-page/     # Komponen khusus untuk halaman utama
│   ├── auth-page/        # Komponen untuk halaman masuk/daftar
│   ├── Footer.tsx
│   └── navbar.tsx
├── config/               # File konfigurasi
│   ├── fonts.ts
│   └── site.ts
├── db/                   # Konfigurasi dan skema Drizzle ORM
│   └── schema.ts
├── utils/                # Fungsi utilitas
│   ├── auth-client.ts    # Konfigurasi klien Better Auth
│   └── auth.ts           # Konfigurasi server Better Auth
├── drizzle.config.ts     # Konfigurasi Drizzle Kit
├── next.config.js        # Konfigurasi Next.js
└── tailwind.config.js    # Konfigurasi Tailwind CSS
```

## TODO

Berdasarkan `README.md` awal, berikut adalah beberapa tugas yang masih perlu diselesaikan:

  * [ ] Perbaiki fungsionalitas pencarian di bilah navigasi.
  * [ ] Perbaiki tata letak bagian atas dari komponen Hero.
  * [ ] Ganti logo placeholder dengan logo SEA Catering yang sebenarnya.