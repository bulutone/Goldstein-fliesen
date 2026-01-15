# Goldstein Fliesen Web Sitesi İçin Kurulum Rehberi (Plesk Sürümü)

Web siteniz hazır ve yayınlanmayı bekliyor! **Plesk** kullandığınız için, sitenizi yayına almak adına aşağıdaki adımları sırasıyla uygulayın.

## 1. Adım: Dosyaları Hazırlayın
Projenizin "build" (inşa) işlemini sizin için tamamladım.
1.  Bilgisayarınızdaki proje klasörünü açın: `/Users/digihandel/goldstein`
2.  **`dist`** adındaki klasörü bulun.
3.  **Önemli**: Bize lazım olan `dist` klasörünün kendisi değil, **içindeki dosyalardır**.
    *   `index.html`
    *   `assets/` (klasörü)
    *   `vite.svg`
    *   `sitemap.xml` vb.

## 2. Adım: Plesk'e Giriş Yapın
1.  Hosting firmanızın paneline veya direkt Plesk'e giriş yapın.
2.  **Web Siteleri ve Alan Adları** (Websites & Domains) sayfasına gidin.
3.  `goldstein-fliesen.de` alan adını bulun.
4.  **Dosya Yöneticisi**ne (File Manager) tıklayın.

## 3. Adım: Dosyaları Yükleyin
1.  Dosya Yöneticisi'nde **`httpdocs`** klasörünü açın (Burası sitenizin ana dizinidir).
2.  İçeride varsayılan dosyalar varsa (örn: `index.html`, `default.htm` veya Plesk'in oluşturduğu dosyalar) bunları **silin**. Klasör boş olsun.
3.  Bilgisayarınızdaki `dist` klasörünün **içindeki tüm dosyaları** sürükleyip buraya bırakarak **yükleyin**.
    *   `index.html` dosyasının `httpdocs` dizininin ana kökünde olduğundan emin olun.

## 4. Adım: React Ayarını Yapın (Çok Önemli!)
Bu modern bir React sitesi olduğu için, sayfa yenilemelerinde hata almamak (örn: `/impressum` sayfasında F5 yapınca 404 hatası vermemesi için) ufak bir ayar dosyası eklemeliyiz.

1.  Plesk Dosya Yöneticisi'nde (`httpdocs` içindeyken) **Yeni** > **Dosya Oluştur** (Create File) butonuna tıklayın.
2.  Dosya adı olarak: **`.htaccess`** yazın (Başında nokta olduğuna dikkat edin).
3.  Dosyayı oluşturduktan sonra üzerine tıklayıp **Düzenle** (Edit) diyerek şu kodu yapıştırın:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>
```

**⚠️ Eğer 500 Hatası Devam Ederse:**
Bazı sunucularda yukarıdaki kod güvenlik ayarlarıyla çakışabilir.
1.  Oluşturduğunuz `.htaccess` dosyasını silin.
2.  Sitenize girmeyi deneyin. Eğer Site açılıyorsa (ama alt sayfalar hata veriyorsa), sorun bu dosyadır.
3.  Eğer sildiğinizde site açılıyorsa, lütfen **alternatif olarak şu basit kodu** deneyin:

```apache
ErrorDocument 404 /index.html
```
Bu çok basit bir yöntemdir ve genellikle her sunucuda çalışır. React sayfalarınızın (örn: `/impressum`) açılmasını sağlar.

4.  **Kaydet** butonuna basın.

## 5. Adım: Kontrol Edin
Tarayıcınızdan `goldstein-fliesen.de` adresine gidin. Siteniz hızlı, güvenli ve hatasız bir şekilde çalışıyor olmalı!

Hayırlı olsun! 🚀
