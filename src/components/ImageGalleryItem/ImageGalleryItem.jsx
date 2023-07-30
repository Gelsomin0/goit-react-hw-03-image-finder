import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ card }) => {
    const { id, webformatURL, tags } = card;
    return (
        <li key={id} className={css.gallery_item}>
            <img
                className={css.imageGalleryItem_image}
                src={webformatURL} alt={tags}
            />
        </li>
    );    
}
