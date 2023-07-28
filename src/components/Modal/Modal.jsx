import { Component } from "react";
import css from './Modal.module.css';

export class Modal extends Component {
    render() {
        return (
            <div
                onClick={this.props.closeModal}
                className={css.overlay}
            >
                <div className={css.modal}>
                    <img
                        className={css.modal_image}
                        src={this.props.largeImageUrl}
                        alt=""
                    />
                </div>
            </div>
        );
    }
}