import { Component } from "react";
import css from './ErrorMessage.module.css';

export class ErrorMessage extends Component {
    render() {
        return (
            <div className={css.error_module}>
                <p>There is no result by your search word!</p>
                <p>Please, try another search word.</p>
            </div>
        );
    }
}