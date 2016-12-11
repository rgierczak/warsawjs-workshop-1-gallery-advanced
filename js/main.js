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
    
    setCurrentPhotoId(event) {
        let dataSet = event.target.dataset;
        let eventValue = dataSet.id || dataSet.direction;
        this.handleEventValue(eventValue);
    }
    
    handleEventValue(value) {
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
                this.currentPhotoId = Number(value);
        }
    }
    
    setupClickListeners() {
        let $nextButton = document.getElementById("next-button");
        let $previousButton = document.getElementById("previous-button");
        this.addClickedListener($nextButton);
        this.addClickedListener($previousButton);
        this.addPhotosListener();
    }
    
    addClickedListener($nextButton) {
        $nextButton.addEventListener("click", (event) => this.clickHandler(event));
    }
    
    addPhotosListener() {
        let $galleryPhotosHTMLCollection = getGalleryPhotos();
        let $photos = Array.from($galleryPhotosHTMLCollection);
        $photos.forEach(($photo) => this.addClickedListener($photo));
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
        photos.forEach((photo) => this.updatePhotoClassName(photo));
    }
    
    updatePhotoClassName($photo) {
        if (isPhotoCurrent($photo.dataset.id, this.currentPhotoId)) {
            $photo.className = 'border-active';
        } else {
            $photo.className = '';
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new Gallery();
});
