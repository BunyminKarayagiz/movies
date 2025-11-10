# 🎬 Movies App

React.js ile geliştirilen **Movies App**, kullanıcıların film ve dizileri keşfetmesini, detaylarını görüntülemesini ve kendi **kişisel WatchList**'lerini oluşturmasını sağlayan modern bir web uygulamasıdır.  
Veriler **The Movie Database (TMDB) API** üzerinden çekilir ve kullanıcı yönetimi için **Firebase Authentication** kullanılır.

---

## 🚀 Özellikler

- 🔍 **Film & Dizi Arama:** TMDB API üzerinden gerçek zamanlı arama yapılabilir.  
- 📄 **Detay Sayfaları:** Her içerik için açıklama, tür, IMDB puanı ve poster bilgileri görüntülenebilir.  
- ❤️ **WatchList:** Kullanıcılar giriş yaptıktan sonra film ve dizileri kendi listelerine ekleyebilir veya kaldırabilir.  
- 👤 **Kullanıcı Girişi / Kayıt:** Firebase Authentication ile güvenli oturum açma ve kayıt sistemi.  
- 🌙 **Modern Arayüz:** Responsive, sade ve kullanıcı dostu tasarım.  
- 🎯 **Öneri Sistemi (Planlanan):** Kullanıcıların WatchList’lerine göre benzer içerik önerileri.

---

## 🧩 Kullanılan Teknolojiler

| Katman | Teknoloji |
|:-------|:-----------|
| **Frontend** | React.js, Axios, React Router |
| **Backend / API** | TMDB API |
| **Authentication** | Firebase Authentication |
| **Veritabanı (isteğe bağlı)** | Firebase Firestore |
| **Stil** | CSS / Tailwind (veya proje içinde kullanılan yapı) |
| **İkonlar** | React Icons |

---

## ⚙️ Kurulum

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izle:

```bash
# 1. Depoyu klonla
git clone https://github.com/BunyminKarayagiz/movies.git

# 2. Proje dizinine gir
cd movies

# 3. Gerekli bağımlılıkları yükle
npm install

# 4. Ortam değişkenlerini oluştur (.env dosyası)
REACT_APP_API_KEY=your_tmdb_api_key
REACT_APP_ACCESS_TOKEN=your_tmdb_access_token

# 5. Uygulamayı başlat
npm start
