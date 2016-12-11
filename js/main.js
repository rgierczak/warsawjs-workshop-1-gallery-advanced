function getGalleryPhotos() {
    let $thumbsGallery = document.getElementById("thumbs-gallery");
    return $thumbsGallery.getElementsByTagName("img");
}

function setCurrentPhotoSrc(arrayPhoto) {
    let $currentPhoto = document.getElementById("current-photo");
    $currentPhoto.src = arrayPhoto.src;
}

function findPhotoByCurrentId(images, id) {
    for (let i = 0; i < images.length; i++) {
        if (images[i].id === id) {
            return images[i];
        }
    }
}

function isPhotoCurrent(galleryPhotoId, currentPhotoId) {
    return Number(galleryPhotoId) === currentPhotoId;
}

const IMAGES_ARRAY_SIZE = 5;

class Gallery {
    constructor() {
        this.images = [];
        this.currentPhotoId = 0;
        
        this.buildImagesArray();
        this.displayCurrentPhoto();
        this.setupClickListeners();
    }
    
    buildImagesArray() {
        for (let i = 0; i < IMAGES_ARRAY_SIZE; i++) {
            this.images.push({
                id: i,
                src: './assets/photo' + i + '.jpg'
            });
        }
    }
    
    setCurrentPhotoId(value) {
        switch (value) {
            case 'next':
                if (this.currentPhotoId < this.images.length - 1) {
                    this.currentPhotoId += 1;
                }
                break;
            
            case 'previous':
                if (this.currentPhotoId > 0) {
                    this.currentPhotoId -= 1;
                }
                break;
            
            default:
                this.currentPhotoId = value;
        }
    }
    
    setupClickListeners() {
        //1) Pobrać z DOM przyciski: previous-button, next-button.
        let $nextButton = document.getElementById("next-button");
        let $previousButton = document.getElementById("previous-button");
        
        //2) Dodać nasłuchiwanie na tych przyciskach.
        $nextButton.addEventListener("click", () => {
            
            //3) Uruchomić funkcję zmieniającą zdjęcie.
            this.clickHandler("next");
        });
        
        $previousButton.addEventListener("click", () => {
            this.clickHandler("previous");
        });
        
        // 4) ZADANIE DODATKOWE
        // Dodanie nasłuchiwania kliknięcia na miniaturkę.
        this.addPhotosListener();
    }
    
    addPhotosListener() {
        // 1) Pobieramy kolekcję HTML miniaturek zdjęć z DOM.
        let $galleryPhotosHTMLCollection = getGalleryPhotos();
        
        // 2) Tworzymy tablicę z tej kolekcji HTML.
        let photos = Array.from($galleryPhotosHTMLCollection);
        
        // 3) Dodajemy nasłuchiwanie na zdarzenie kliknięcia na każdą z miniatur.
        photos.forEach((photo) => {
            photo.addEventListener("click", (event) => {
                
                // 4) Uruchamiamy handler kliknięcia, gdy kliknięto na miniaturę.
                this.clickHandler(Number(event.target.id));
            });
        });
    }
    
    clickHandler(value) {
        // 1) Zmienić currentPhotoId.
        this.setCurrentPhotoId(value);
        
        // 2) Wyświetlić nowe aktualne zdjęcie.
        this.displayCurrentPhoto();
        
        // 3) ZADANIE DODATKOWE
        // Ustawić kolorowe obramowanie na miniaturze aktualnego zdjęcia.
        this.setActivePhotoBorder();
    }
    
    displayCurrentPhoto() {
        // 1) Pobrać zdjęcie z tablicy zdjęć na podstawie aktualnego id (currentPhotoId).
        let currentArrayPhoto = findPhotoByCurrentId(this.images, this.currentPhotoId);
        
        // 2) Wstawić zdjęcie do HTML.
        setCurrentPhotoSrc(currentArrayPhoto);
    }
    
    setActivePhotoBorder() {
        // 1) Pobieramy kolekcję HTML miniaturek zdjęć z DOM.
        let $galleryPhotosHTMLCollection = getGalleryPhotos();
        
        // 2) Tworzymy tablicę z tej kolekcji HTML.
        let photos = Array.from($galleryPhotosHTMLCollection);
        
        // 3) Uaktualniamy nazwę klasy DOM dla każdej miniatury.
        photos.forEach((photo) => {
            this.updatePhotoClassName(photo);
        });
    }
    
    updatePhotoClassName($photo) {
        // Jeśli natrafiono na zdjęcie, którego ID jest takie samo jak ID aktualnego zdjęcia,
        // nadajemy klasę 'border-active'
        if (isPhotoCurrent($photo.id, this.currentPhotoId)) {
            $photo.className = 'border-active';
        } else {
            $photo.className = '';
        }
    }
}

// Czekamy na DOM
document.addEventListener("DOMContentLoaded", function () {
    new Gallery();
});
