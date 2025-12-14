# 📊 **KALKULATOR NILAI PRO + KKM**

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node-18.x-339933?style=for-the-badge&logo=nodedotjs)

**Sistem Analisis Nilai Akademik dengan Kriteria Ketuntasan Minimal**  
*Transformasi Data Nilai Menjadi Insight Berharga*

[🚀 Live Demo](https://kalkulator-kkm.vercel.app/) • [📖 Dokumentasi](#) • [🐛 Report Bug](kadal.rigel@gmail.com) • [💡 Request Fitur](kadal.rigel@gmail.com)

</div>

## ✨ **FITUR UTAMA**

### 🎯 **Input Data Fleksibel**
- **Target Rata-Rata** - Tetapkan target dan pantau pencapaian
- **KKM Global/Individual** - Fleksibilitas penuh pengaturan KKM
- **Mata Pelajaran Dinamis** - Tambah/hapus tanpa batas
- **Validasi Real-time** - Cek kesalahan sebelum kalkulasi

### 📊 **Analisis Komprehensif**
- **Rata-Rata Presisi** - Perhitungan hingga 2 desimal
- **Analisis KKM** - Status tuntas/remedial per mata pelajaran
- **Statistik Lengkap** - Standar deviasi, rentang, distribusi
- **Visualisasi Data** - Chart interaktif untuk insight visual

### 🚀 **Fitur Premium**
- **Auto-save** - Penyimpanan otomatis ke localStorage
- **Multi-format Export** - JSON, CSV, Print
- **Responsive Design** - Optimal di semua perangkat
- **UI Modern** - Glassmorphism dengan animasi smooth

## 🛠 **TEKNOLOGI**

<table>
<tr>
<td width="33%">
<div align="center">

### **Frontend**
<img src="https://skillicons.dev/icons?i=react" width="50" height="50" />
<br/>
<strong>React 18</strong><br/>
Hooks, Context, Modern Architecture

</div>
</td>
<td width="33%">
<div align="center">

### **Visualisasi**
<img src="https://skillicons.dev/icons?i=chartjs" width="50" height="50" />
<br/>
<strong>Recharts + Framer</strong><br/>
Interactive Charts & Smooth Animations

</div>
</td>
<td width="33%">
<div align="center">

### **Infrastructure**
<img src="https://skillicons.dev/icons?i=vercel" width="50" height="50" />
<br/>
<strong>Vercel Edge</strong><br/>
Global CDN, Automatic SSL, CI/CD

</div>
</td>
</tr>
</table>

## 🚀 **CARA PENGGUNAAN**

### **1. Input Data**
```javascript
1. Masukkan target rata-rata (opsional)
2. Atur KKM global atau per mata pelajaran
3. Tambah mata pelajaran sesuai kebutuhan
4. Input nilai untuk setiap mata pelajaran
```

### **2. Analisis Otomatis**
```javascript
1. Klik "Hitung Analisis Lengkap"
2. Sistem otomatis menghitung:
   • Rata-rata nilai
   • Status ketuntasan
   • Distribusi nilai
   • Rekomendasi perbaikan
```

### **3. Ekspor Hasil**
```javascript
1. Cetak laporan untuk dokumentasi
2. Download JSON untuk backup
3. Export CSV untuk analisis lanjut
```

## 📦 **INSTALASI LOKAL**

```bash
# 1. Clone Repository
git clone https://github.com/kamunanay/Kalkulator-KKM.git

# 2. Masuk ke Direktori
cd Kalkulator-KKM

# 3. Install Dependencies
npm install

# 4. Jalankan Development Server
npm start

# 5. Build untuk Production
npm run build
```

## 🌐 **DEPLOYMENT KE VERCEL**

### **Automatic Deployment**
1. Push code ke repository GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Biarkan Vercel auto-detect sebagai React App
4. Deployment otomatis pada setiap push

### **Manual Configuration**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ]
}
```

## 📁 **STRUKTUR PROYEK**

```
kalkulator-kkm/
├── public/                    # Static Assets
│   ├── index.html
│   └── favicon.ico
├── src/                      # Source Code
│   ├── components/          # React Components
│   │   ├── SubjectInput.jsx
│   │   ├── ResultsDisplay.jsx
│   │   └── StatsVisualization.jsx
│   ├── utils/              # Utility Functions
│   │   ├── calculations.js
│   │   └── validators.js
│   ├── styles/             # CSS Stylesheets
│   │   ├── main.css
│   │   ├── animations.css
│   │   └── responsive.css
│   ├── App.jsx             # Main Component
│   └── index.js            # Entry Point
├── package.json            # Dependencies
├── vercel.json            # Deployment Config
└── README.md              # Documentation
```

## 🎨 **DESIGN SYSTEM**

### **Color Palette**
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--dark-bg: #0f172a;
--glass-bg: rgba(255, 255, 255, 0.1);
--success: #10b981;
--warning: #f59e0b;
--danger: #ef4444;
```

### **Typography**
- **Primary Font**: Inter, system-ui, sans-serif
- **Monospace**: 'SF Mono', Monaco, Consolas
- **Line Height**: 1.6 for readability

## 📱 **RESPONSIVE BREAKPOINTS**

| Device | Width | Features |
|--------|-------|----------|
| **Desktop** | > 1200px | Full grid layout, animations |
| **Tablet** | 768px - 1199px | Adjusted columns, touch-friendly |
| **Mobile** | < 767px | Single column, optimized touch |
| **Print** | N/A | Printer-friendly, minimal styling |

## 🔧 **TROUBLESHOOTING**

<details>
<summary><strong>Common Issues & Solutions</strong></summary>

### **Build Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Deployment Failed on Vercel**
1. Cek Node version di package.json
2. Pastikan build script ada
3. Clear build cache di Vercel dashboard

### **CSS Not Loading**
```bash
# Cek file structure
ls -la src/styles/

# Rebuild
npm run build
```

</details>

## 🤝 **KONTRIBUSI**

Kami menyambut kontribusi! Berikut cara berkontribusi:

1. **Fork** repository
2. **Buat branch fitur**: `git checkout -b feature/amazing-feature`
3. **Commit perubahan**: `git commit -m 'Add amazing feature'`
4. **Push ke branch**: `git push origin feature/amazing-feature`
5. **Buka Pull Request**

### **Guidelines**
- Ikuti konvensi kode yang ada
- Tambah test untuk fitur baru
- Update dokumentasi
- Gunakan commit message yang deskriptif

## 📄 **LISENSI**

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 **THANKS TO**

<div align="center">

### **🤖 AI DeepSeek**
*Untuk kecerdasan buatan yang membantu dalam pengembangan, debugging, dan optimisasi kode.*

### **👨‍🏫 Teacher/Guru**
*Untuk bimbingan, pengetahuan, dan inspirasi dalam dunia pendidikan dan teknologi.*

### **🙏 Tuhan YME**
*Untuk berkah, kesehatan, dan kesempatan dalam menyelesaikan proyek ini.*

### **🎭 Me: 蕭Ga**
*Untuk dedikasi, kerja keras, dan kreativitas dalam membangun sistem yang bermanfaat ini.*

---

**"Technology is best when it brings people together"**  
**"Teknologi terbaik adalah yang menyatukan orang"**

</div>

<div align="center">

---

**© 2024 蕭Ga • Kalkulator Nilai Pro + KKM**  
*Dibuat dengan ❤️ untuk dunia pendidikan yang lebih baik*

[![GitHub](https://img.shields.io/badge/GitHub-蕭Ga-181717?style=for-the-badge&logo=github)](https://github.com/kamunanay)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF7139?style=for-the-badge)](https://cukimai.store)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](mailto:kadal.rigel@gmail.com)

</div>

---
