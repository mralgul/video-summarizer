document.addEventListener('DOMContentLoaded', function() {
    // Elementler
    const videoUrlInput = document.getElementById('videoUrl');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const pdfForm = document.getElementById('pdfForm');
    const pdfFileInput = document.getElementById('pdfFile');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const errorText = document.getElementById('errorText');
    const resultDiv = document.getElementById('result');
    const contentTitle = document.getElementById('contentTitle');
    const summaryDiv = document.getElementById('summary');
    const downloadPdfBtn = document.getElementById('downloadPdf');
    const downloadDocxBtn = document.getElementById('downloadDocx');
    const thumbnailImg = document.getElementById('thumbnailImg');
    const processingTime = document.getElementById('processingTime');

    // YouTube URL doğrulama
    videoUrlInput.addEventListener('input', function() {
        const url = this.value.trim();
        if (url) {
            const isYoutube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url);
            if (!isYoutube) {
                showError('Geçerli bir YouTube URL girin');
            } else {
                clearError();
            }
        }
    });

    // YouTube Özetleme
    summarizeBtn.addEventListener('click', async function() {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            showError('Lütfen bir YouTube URL girin');
            videoUrlInput.focus();
            return;
        }

        try {
            startLoading('yt');
            const response = await fetch('/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: videoUrl })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Sunucu hatası');
            }
            
            handleResponse(data);
        } catch (error) {
            showError('İstek gönderilirken hata oluştu: ' + error.message);
            console.error('Hata:', error);
        } finally {
            stopLoading('yt');
        }
    });

    // PDF Özetleme
    pdfForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const file = pdfFileInput.files[0];
        
        if (!file) {
            showError('Lütfen bir PDF dosyası seçin');
            pdfFileInput.focus();
            return;
        }

        // Dosya boyutu kontrolü (10MB)
        if (file.size > 10 * 1024 * 1024) {
            showError('Dosya boyutu 10MB\'dan büyük olamaz');
            return;
        }

        try {
            startLoading('pdf');
            const formData = new FormData();
            formData.append('pdf', file);

            const response = await fetch('/summarize_pdf', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Sunucu hatası');
            }
            
            handleResponse(data);
        } catch (error) {
            showError('Dosya yüklenirken hata oluştu: ' + error.message);
            console.error('Hata:', error);
        } finally {
            stopLoading('pdf');
        }
    });

    // PDF/Word İndirme
    downloadPdfBtn.addEventListener('click', function() {
        downloadSummary('pdf');
    });

    downloadDocxBtn.addEventListener('click', function() {
        downloadSummary('docx');
    });

    // Yardımcı Fonksiyonlar
    function handleResponse(data) {
        if (data.success) {
            contentTitle.textContent = data.title;
            summaryDiv.innerHTML = formatSummary(data.summary);
            
            // Thumbnail varsa göster
            if (data.thumbnail) {
                thumbnailImg.src = data.thumbnail;
                thumbnailImg.classList.remove('d-none');
            } else {
                thumbnailImg.classList.add('d-none');
            }
            
            // İşlem süresini göster
            if (data.duration) {
                processingTime.textContent = `İşlem Süresi: ${data.duration}`;
                processingTime.classList.remove('d-none');
            }
            
            resultDiv.classList.remove('d-none');
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
            showError(data.error || 'Bilinmeyen bir hata oluştu');
        }
    }

    function formatSummary(text) {
        if (!text) return '<div class="alert alert-warning">Özet oluşturulamadı</div>';
        
        return text.split('\n').map(paragraph => {
            if (!paragraph.trim()) return '';
            
            // Başlık tespiti
            if (paragraph.match(/^[A-ZÇĞİÖŞÜ][^•:]*[.:]?$/)) {
                return `<h5 class="mt-3 mb-2 fw-bold">${paragraph}</h5>`;
            }
            
            // Madde işaretleri
            if (paragraph.match(/^\s*[-*•]\s/)) {
                return `<div class="mb-2 ps-3"><i class="bi bi-arrow-right me-2"></i>${paragraph.replace(/^\s*[-*•]\s/, '')}</div>`;
            }
            
            return `<p class="mb-3">${paragraph}</p>`;
        }).join('');
    }

    function startLoading(type) {
        clearError();
        
        if (type === 'yt') {
            document.getElementById('ytSpinner').classList.remove('d-none');
            document.getElementById('ytButtonText').classList.add('d-none');
            summarizeBtn.disabled = true;
        } else {
            document.getElementById('pdfSpinner').classList.remove('d-none');
            document.getElementById('pdfButtonText').classList.add('d-none');
            pdfForm.querySelector('button[type="submit"]').disabled = true;
        }
        
        loadingDiv.classList.remove('d-none');
        resultDiv.classList.add('d-none');
    }

    function stopLoading(type) {
        if (type === 'yt') {
            document.getElementById('ytSpinner').classList.add('d-none');
            document.getElementById('ytButtonText').classList.remove('d-none');
            summarizeBtn.disabled = false;
        } else {
            document.getElementById('pdfSpinner').classList.add('d-none');
            document.getElementById('pdfButtonText').classList.remove('d-none');
            pdfForm.querySelector('button[type="submit"]').disabled = false;
        }
        
        loadingDiv.classList.add('d-none');
    }

    function showError(message) {
        errorText.textContent = message;
        errorDiv.classList.remove('d-none');
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function clearError() {
        errorDiv.classList.add('d-none');
    }

    function downloadSummary(format) {
        const title = contentTitle.textContent;
        const content = summaryDiv.textContent;
        
        if (!title || !content) {
            showError('İndirilecek içerik bulunamadı');
            return;
        }
        
        startLoading('download');
        
        fetch(`/download_${format}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Dosya oluşturulamadı');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/[^a-z0-9]/gi, '_')}_özet.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            showError(`İndirme hatası: ${error.message}`);
            console.error('İndirme hatası:', error);
        })
        .finally(() => {
            stopLoading('download');
        });
    }
});