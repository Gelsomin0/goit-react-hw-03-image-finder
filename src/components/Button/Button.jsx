import { Component } from "react";
import css from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {
    render() {
        return (
            <button
                className={css.button}
                onClick={this.props.loadMore}
            >Load more</button>
        );
    }
}

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}