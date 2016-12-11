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
    }
};

export default Helpers;
