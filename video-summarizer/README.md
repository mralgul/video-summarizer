# Akıllı Video ve PDF Özetleyici

**CyberSpider Takımı - BTK Akademi Hackathon 2025 Projesi**

Merhaba! Bu proje, BTK Akademi tarafından düzenlenen Hackathon 2025 yarışmasına katılan **CyberSpider** takımı üyeleri olan Mehmet Recep Algül ve Yaren Özyürek tarafından geliştirilmiştir.

Amacımız, üretken yapay zeka teknolojilerini kullanarak video ve doküman içeriklerinin hızlı, etkili ve sade bir şekilde özetlenmesini sağlamaktır.

---

## Proje Tanıtımı

Bu akıllı web uygulaması ile kullanıcılar:

- YouTube bağlantısı girerek videoların içeriğini özetleyebilir.
- PDF dosyası yükleyerek belge içeriğinin özetine ulaşabilir.
- Oluşan özeti Word (.docx) veya PDF (.pdf) formatında indirebilir.

 Arka planda Google’ın **Gemini üretken yapay zekası** kullanılmaktadır.

---

## Temel Özellikler

-  **YouTube Desteği:** Yalnızca bağlantı girerek video içeriği otomatik çözümlenir.
-  **PDF Desteği:** Dosya yükleyerek içerik özetleme yapılabilir.
-  **Hızlı İşlem:** Kısa sürede anlamlı ve düzenli özet üretimi.
-  **İndirme Opsiyonu:** Özeti PDF veya Word olarak dışa aktar.
-  **Düzenlenebilirlik:** Word çıktısı sayesinde özeti istediğiniz gibi düzenleyin.

---

Proje Yapısı:

Proje Yapısı:

video-summarizer/

├── static/

│   ├── css/

│      └── style.css

│   ├── js/

│      └── app.js

│   └── images/

|      └── bg-pattern.jpeg
       
├── templates/

│       └── index.html

├── venv/

├── .env 

├── app.py

├── README.md

└── requirements.txt

---

##  Kullanılan Teknolojiler

| Alan       | Teknoloji                                                   |
| ---------- | ----------------------------------------------------------- |
| Frontend   | HTML, CSS, JavaScript, Bootstrap                            |
| Backend    | Python (FastAPI)                                            |
| Yapay Zeka | Gemini API (`google-generativeai`)                          |
| Diğer      | `pytube`, `PyMuPDF`, `fpdf`, `python-docx`, `python-dotenv` |

---

## Kurulum ve Çalıştırma

> Not: Python 3.10+ önerilir.
