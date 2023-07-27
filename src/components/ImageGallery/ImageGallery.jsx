import { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
    render() {
        return (
            <>
                <ul className={css.image_gallery}>
                    {this.props.collection.map((card) => {
                        return (
                            <ImageGalleryItem
                                key={card.id}
                                card={card}
                                openLargeImage={this.props.openLargeImage}
                            />
                        )
                    })}
                </ul>
                <div>{this.props.children}</div>
            </>
            
        );
    }
}