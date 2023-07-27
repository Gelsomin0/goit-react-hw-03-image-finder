import { Component } from "react";
import css from './Modal.module.css';

export class Modal extends Component {
    closeModal = () => {
        console.log('hello');
    }

    render() {
        return (
            <div onKeyDown={this.closeModal} className={css.overlay}>
                <div className={css.modal}>
                    <img src={this.props.largeImageUrl} alt="" />
                </div>
            </div>
        );
    }
}