import { Component } from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handleEscKey);
    } 

    handleEscKey = (e) => {
        if (e.key === 'Escape') {
            this.props.closeModal(e);
            return;
        }
    }

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

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
}