import Helpers from './helpers';

const IMAGES_ARRAY_SIZE = 5;

class Gallery {
    constructor() {
        this.images = [];
        this.currentPhotoId = 0;
        this.$thumbsGallery = null;
        this.$currentPhoto = null;
        this.$nextButton = null;
        this.$previousButton = null;
        
        this.setup();
    }
    
    setup() {
        this.setupDOMElements();
        this.buildImagesArray();
        this.setupClickListeners();
        this.displayCurrentPhoto();
    }
    
    setupDOMElements() {
        this.$thumbsGallery = document.getElementById("thumbs-gallery");
        this.$currentPhoto = document.getElementById("current-photo");
        this.$nextButton = document.getElementById("next-button");
        this.$previousButton = document.getElementById("previous-button");
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
        this.addClickedListener(this.$nextButton);
        this.addClickedListener(this.$previousButton);
        this.addPhotosListener();
    }
    
    addClickedListener($nextButton) {
        $nextButton.addEventListener("click", (event) => this.clickHandler(event));
    }
    
    addPhotosListener() {
        let $galleryPhotosHTMLCollection = Helpers.getGalleryPhotos(this.$thumbsGallery);
        let $photos = Array.from($galleryPhotosHTMLCollection);
        $photos.forEach(($photo) => this.addClickedListener($photo));
    }
    
    clickHandler(value) {
        this.setCurrentPhotoId(value);
        this.displayCurrentPhoto();
        this.setActivePhotoBorder();
    }
    
    displayCurrentPhoto() {
        let currentArrayPhoto = Helpers.findPhotoByCurrentId(this.images, this.currentPhotoId);
        this.$currentPhoto.src = currentArrayPhoto.src
    }
    
    setActivePhotoBorder() {
        let $galleryPhotosHTMLCollection = Helpers.getGalleryPhotos(this.$thumbsGallery);
        let photos = Array.from($galleryPhotosHTMLCollection);
        photos.forEach((photo) => this.updatePhotoClassName(photo));
    }
    
    updatePhotoClassName($photo) {
        if (Helpers.isPhotoCurrent($photo.dataset.id, this.currentPhotoId)) {
            $photo.className = 'border-active';
        } else {
            $photo.className = '';
        }
    }
}

export default Gallery;
