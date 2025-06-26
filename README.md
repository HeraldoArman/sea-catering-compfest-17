# SEA Catering - Healthy Meals, Anytime, Anywhere

SEA Catering adalah web app yang dibuat dengan Next.js 15, dirancang untuk menyelesaikan tugas seleksi Compfest Software Engineering Academy

[Link](https://docs.google.com/document/d/1-YbUTsv-493hiLTDzMspvi-l4SN1d-gAW3hPDm2JwOc/edit?tab=t.lum0njsgxnby) penugasan

Link deployment [https://sea-catering-compfest-17.vercel.app/](https://sea-catering-compfest-17.vercel.app/)


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

## Skema Database
- usersTable: Tabel untuk pengguna.
- user: Tabel untuk pengguna dengan peran.
- session: Tabel untuk sesi pengguna.
- account: Tabel untuk akun yang ditautkan.
- verification: Tabel untuk verifikasi.
- subscription: Tabel untuk langganan.
Enum juga digunakan untuk peran pengguna (userRole), paket langganan (subscriptionPlan), dan status langganan (subscriptionStatus).


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

### 3\. Pengaturan Enviroment Variable untuk local

Buat file `.env` di direktori root proyek Anda dan tambahkan variabel lingkungan berikut.

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BETTER_AUTH_SECRET="KVeBXKkEVDBCgGlmi2RoLW7Urkb5Z8odS96rhaHlafpOPhVqYstroMsoRkDDxJFDruWgFugytfEmuOWQlvvhX11yQMZXceqflvrm"
BETTER_AUTH_URL="http://localhost:3000"

DATABASE_URL="postgresql://sea-catering_owner:npg_alqg4RmkZOT0@ep-snowy-queen-a1wiatd8-pooler.ap-southeast-1.aws.neon.tech/sea-catering?sslmode=require"

GOOGLE_CLIENT_ID="328939702827-mem75hv8krgl4b8ks67hrsjmcouc8ec6.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
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

### dashboard admin
untuk mengakses dashboard admin, saat login gunakan

email: admin@gmail.com

password: ThisIsAdminPassword123!

## Struktur Proyek

Berikut adalah gambaran umum tentang struktur direktori proyek:

```
/
├── sea-catering/                                        
│   ├── (auth)/                                 
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── (main)/                                 # Main Route
│   │   └── page.tsx
│   ├── api/                                    # Route API backend
│   │   ├── auth/[...all]/                      # Rute Catch-all untuk Otentikasi (Better Auth)
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   ├── subscription/
│   │   └── subscriptions/
│   │       └── [id]/status/
│   ├── dashboard/
│   ├── subscription/
├── components/                                 # Komponen React
│   ├── auth-page/                      
│   ├── dashboard/                 
│   ├── landing-page/                       
│   ├── subcription/                       
├── config/                                     # Konfigurasi
├── db/
│   └── schema.ts
├── drizzle/                                    # File Migrasi Database Drizzle
├── middleware.ts                              
├── public/                                   
├── styles/                               
├── types/                              
└── utils/                                 

```

## Future Improvements
- Menambahkan fitur Reactivation
- Improve SEO
- Improve copywriting

