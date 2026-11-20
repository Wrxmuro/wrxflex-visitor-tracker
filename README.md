# WRXFLEX Visitor Tracker

Onay temelli ziyaretçi bildirimi demosu. Ziyaretçi sayfaya geldiğinde otomatik bildirim gönderilmez; bilgilendirme metnini gördükten sonra butona basarsa sunucu IP ve User-Agent bilgisini Telegram'a iletir.

## Yerelde çalıştırma

1. Node.js 18 veya üzerini kurun.
2. Proje klasöründe `npm install` çalıştırın.
3. Ortam değişkenlerini ayarlayın:
   - `TELEGRAM_BOT_TOKEN`: BotFather üzerinden oluşturduğunuz yeni token
   - `TELEGRAM_CHAT_ID`: Bildirim alacak sohbetin ID'si
4. `npm start` çalıştırın.
5. `http://localhost:3000` adresini açın.

## Render ile yayınlama

1. Bu klasörü GitHub deposuna yükleyin.
2. Render'da **New → Web Service** seçip GitHub deposunu bağlayın.
3. Runtime: Node
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Render > Environment bölümüne `TELEGRAM_BOT_TOKEN` ve `TELEGRAM_CHAT_ID` değişkenlerini ekleyin.
7. Deploy edin. `/health` adresi servis kontrolü için kullanılabilir.

## Güvenlik

Bot token'ını asla HTML, JavaScript, GitHub deposu veya ekran görüntülerinde paylaşmayın. Daha önce sohbette paylaşılan token'ı BotFather üzerinden iptal edip yenisini oluşturun. IP adresleri kişisel veri olabilir; yayına almadan önce uygun gizlilik bilgilendirmesi ve hukuki gereklilikleri değerlendirin.
