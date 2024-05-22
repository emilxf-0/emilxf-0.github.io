document.addEventListener('DOMContentLoaded', function() {
    var downloadButton = document.getElementById('downloadpdf');
    
    downloadButton.addEventListener('click', function() {
        var element = document.getElementById('cv-section');
        var opt = {
            margin: 0.56,
            filename: 'emilforsen-cv.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            enableLinks: true,
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    });
});
