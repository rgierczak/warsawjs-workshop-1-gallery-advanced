let Helpers = {
    getGalleryPhotos($thumbsGallery) {
        return $thumbsGallery.getElementsByTagName("img");
    },
    
    findPhotoByCurrentId(images, id) {
        for (let i = 0; i < images.length; i++) {
            if (images[i].id === id) {
                return images[i];
            }
        }
    },
    
    isPhotoCurrent(galleryPhotoId, currentPhotoId) {
        return Number(galleryPhotoId) === currentPhotoId;
    }
};

export default Helpers;
