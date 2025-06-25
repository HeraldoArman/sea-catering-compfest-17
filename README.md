# SEA Catering - Healthy Meals, Anytime, Anywhere

SEA Catering adalah web app yang dibuat dengan Next.js 15, dirancang untuk menyelesaikan tugas seleksi Compfest Software Engineering Academy

[Link](https://docs.google.com/document/d/1-YbUTsv-493hiLTDzMspvi-l4SN1d-gAW3hPDm2JwOc/edit?tab=t.lum0njsgxnby) penugasan
## Teknologi yang Digunakan

Proyek ini dibangun menggunakan tumpukan teknologi modern yang berfokus pada kinerja dan pengalaman pengembang:

  * **Framework**: [Next.js 15](https://nextjs.org/docs/getting-started) (dengan App Router & Turbopack)
  * **UI Komponen**: [HeroUI](https://heroui.com/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/) 
  * **ORM**: [Drizzle ORM](https://orm.drizzle.team/) 
  * **Autentikasi**: [Better Auth](https://www.google.com/search?q=https://better-auth.dev/)
  * **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
  * **Animasi**: [Framer Motion](https://www.framer.com/motion/) 
  * **Database**: PostgreSQL dengan [Neon](https://neon.com/)
  * **Validation Form**: [Zod](https://zod.dev/)

## Fitur Utama
  * **Autentikasi Pengguna**: Sistem masuk dan pendaftaran yang aman menggunakan email/kata sandi dan OAuth Google
  * **Landing Page**: Halaman utama yang menarik dengan beberapa bagian termasuk Hero, Testimoni, dan Call to Action (CTA).
  * **Desain Responsif**: Antarmuka yang sepenuhnya responsif yang berfungsi dengan baik di perangkat desktop dan seluler.
  * **Subscription System**: Sistem subscription yang terdiri dari Diet Plan – Rp30.000,00 per meal, Protein Plan – Rp40.000,00 per meal, Royal Plan – Rp60.000,00 per meal.
  * **Dashboard Admin dan User**: Dashboard untuk mengeloloa subscription, pengeluaran, dan pendapatan


## Menjalankan Project

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah di bawah ini.

### Prasyarat

Pastikan Anda memiliki Node.js (versi 18.18.0 atau lebih baru direkomendasikan) dan package manager npm

### 1\. Clone Repository

```bash
git clone https://github.com/heraldoarman/sea-catering.git
cd sea-catering
```

### 2\. Install Dependency

Proyek ini menggunakan banyak paket yang memerlukan flag `--legacy-peer-deps` saat instalasi dengan `npm` karena beberapa konflik ketergantungan antar-paket.

```bash
npm install --legacy-peer-deps
```

### 3\. Pengaturan Variabel Lingkungan

Buat file `.env` di direktori root proyek Anda dan tambahkan variabel lingkungan berikut.

```env
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL=""

DATABASE_URL=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 4\. Migrasi Database

Setelah Anda mengatur `DATABASE_URL` dengan yang anda miliki, jalankan perintah berikut untuk push skema database Anda ke penyedia database Anda.

```bash
npx drizzle-kit push
```

### 5\. Menjalankan Program

Sekarang Anda dapat memulai dev server

```bash
npm run dev
```

atau, jika ingin mem-build terlebih dahulu dapat dengan

```bash
npm run build
```
Lalu,
```bash
npm run start
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk membuka proyek

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

  * [ ] benerin hero, masih belom bisa mencet beberapa tombol
  * [ ] Perbaiki tata letak bagian atas dari komponen Hero.
  * [ ] Ganti logo placeholder dengan logo SEA Catering yang sebenarnya.


## Future Improvements

- belum ada
