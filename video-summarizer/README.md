# Akıllı Video ve PDF Özetleyici

**CyberSpider Takımı - BTK Akademi Hackathon 2025 Projesi**

Merhaba! Bu proje, BTK Akademi tarafından düzenlenen Hackathon 2025 yarışmasına katılan **CyberSpider** takımı üyeleri olan **Mehmet Recep Algül** ve **Yaren Özyürek** tarafından geliştirilmiştir.

Amacımız, üretken yapay zeka teknolojilerini kullanarak video ve doküman içeriklerinin hızlı, etkili ve sade bir şekilde özetlenmesini sağlamaktır.

---

## 📌 Proje Tanıtımı

Bu akıllı web uygulaması ile kullanıcılar:

- **YouTube bağlantısı** girerek videoların içeriğini özetleyebilir.
- **PDF dosyası** yükleyerek belge içeriğinin özetine ulaşabilir.
- Oluşan özeti **Word (.docx)** veya **PDF (.pdf)** formatında indirebilir.

Arka planda Google’ın **Gemini üretken yapay zekası** kullanılmaktadır.

---

## ✨ Temel Özellikler

- **YouTube Desteği:** Yalnızca bağlantı girerek video içeriği otomatik çözümlenir.
- **PDF Desteği:** Dosya yükleyerek içerik özetleme yapılabilir.
- **Hızlı İşlem:** Kısa sürede anlamlı ve düzenli özet üretimi.
- **İndirme Opsiyonu:** Özeti PDF veya Word olarak dışa aktar.
- **Düzenlenebilirlik:** Word çıktısı sayesinde özeti istediğiniz gibi düzenleyin.

---

## 📂 Proje Yapısı

video-summarizer/

├── static/

│ ├── css/

│ │ └── style.css

│ ├── js/

│ │ └── app.js

│ └── images/

│ └── bg-pattern.jpeg

├── templates/

│ └── index.html

├── venv/

├── .env

├── app.py

├── README.md

└── requirements.txt

---

## 🛠 Kullanılan Teknolojiler

| Alan       | Teknoloji                                                   |
| ---------- | ----------------------------------------------------------- |
| Frontend   | HTML, CSS, JavaScript, Bootstrap                            |
| Backend    | Python (FastAPI)                                            |
| Yapay Zeka | Gemini API (`google-generativeai`)                          |
| Diğer      | `pytube`, `PyMuPDF`, `fpdf`, `python-docx`, `python-dotenv` |

---

## 🚀 Kurulum ve Çalıştırma

> **Not:** Python 3.10+ önerilir.

1. **Depoyu klonlayın**
   ```bash
   git clone https://github.com/kullanici/video-summarizer.git
   cd video-summarizer

2. **Sanal ortam oluşturun ve etkinleştirin**
   ```bash
     python -m venv venv
     #Windows: 
     venv\Scripts\activate
     #Mac/Linux: 
     source venv/bin/activate

3. **Bağımlılıkları yükleyin**
   ```bash
     pip install -r requirements.txt

4. **Gemini API anahtarını alın**

     Google AI Studio adresine gidin.
  
     API anahtarınızı oluşturun.

5. **.env dosyasını oluşturun**

     API_KEY=buraya_api_anahtarınızı_yazın

6. **Uygulamayı başlatın**
   ```bash
     python -m uvicorn app:app --reload

---

## 📖 Kullanım

1. **YouTube Özetleme**

     Üstteki giriş alanına YouTube video bağlantısını yapıştırın.

     Özetle butonuna tıklayın.
  
     Özet metni aşağıda belirecektir.

2. **PDF Özetleme**

     Dosya yükleme alanından PDF dosyanızı seçin.
  
     Özetle butonuna tıklayın.
  
     Özet metni ekranda görünecektir.

3. **Özet İndirme**

     İndirme butonlarından istediğiniz formatı (Word veya PDF) seçin.
  
     Dosya bilgisayarınıza inecektir.

---

## 📜 Lisans
Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için LICENSE dosyasına bakınız.
