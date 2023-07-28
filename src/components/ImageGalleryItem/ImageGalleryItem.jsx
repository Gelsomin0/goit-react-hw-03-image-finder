import { Component } from "react";
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
    render() {
        const { tags, webformatURL, largeImageURL } = this.props.card;
        return (
            <li className={css.gallery_item}>
                <img
                    onClick={()=>this.props.openLargeImage(largeImageURL)}
                    className={css.gallery_item_image}
                    src={webformatURL}
                    alt={tags}
                />
            </li>    
        );
        
    }
}

ImageGalleryItem.propTypes = {
    card: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
    openLargeImage: PropTypes.func.isRequired,
}