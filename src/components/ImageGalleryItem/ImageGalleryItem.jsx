import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ card, onOpenOverlay }) => {
    const { id, webformatURL, largeImageURL, tags } = card;
    return (
        <li key={id} className={css.gallery_item}>
            <img
                className={css.imageGalleryItem_image}
                src={webformatURL} alt={tags}
                onClick={()=>onOpenOverlay(largeImageURL)}
            />
        </li>
    );    
}
