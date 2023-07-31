import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
    componentDidMount() {
        this.props.handleModalEventListener();
    }
    render() {
        return (
            <div onClick={this.props.closeModalByClick} className={css.overlay}>
                <div className={css.modal}>
                    <img className={css.image} src={this.props.imageURL} alt="" />
                </div>
            </div>
        );    
    };
}