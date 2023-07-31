import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({collection, onOpenOverlay}) => {
    return (
        <ul className={css.gallery}>
            {collection.map((card) => {
                return (
                    <ImageGalleryItem
                        card={card}
                        key={card.id}
                        onOpenOverlay={onOpenOverlay}
                    />)
            })}
        </ul>
    );
}