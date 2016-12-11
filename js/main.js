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
        let $nextButton = document.getElementById("next-button");
        let $previousButton = document.getElementById("previous-button");
        
        $nextButton.addEventListener("click", () => {
            this.clickHandler("next");
        });
        
        $previousButton.addEventListener("click", () => {
            this.clickHandler("previous");
        });
        this.addPhotosListener();
    }
    
    addPhotosListener() {
        let $galleryPhotosHTMLCollection = getGalleryPhotos();
        let photos = Array.from($galleryPhotosHTMLCollection);
        
        photos.forEach((photo) => {
            photo.addEventListener("click", (event) => {
                this.clickHandler(Number(event.target.id));
            });
        });
    }
    
    clickHandler(value) {
        this.setCurrentPhotoId(value);
        this.displayCurrentPhoto();
        this.setActivePhotoBorder();
    }
    
    displayCurrentPhoto() {
        let currentArrayPhoto = findPhotoByCurrentId(this.images, this.currentPhotoId);
        setCurrentPhotoSrc(currentArrayPhoto);
    }
    
    setActivePhotoBorder() {
        let $galleryPhotosHTMLCollection = getGalleryPhotos();
        let photos = Array.from($galleryPhotosHTMLCollection);
        
        photos.forEach((photo) => {
            this.updatePhotoClassName(photo);
        });
    }
    
    updatePhotoClassName($photo) {
        if (isPhotoCurrent($photo.id, this.currentPhotoId)) {
            $photo.className = 'border-active';
        } else {
            $photo.className = '';
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new Gallery();
});
