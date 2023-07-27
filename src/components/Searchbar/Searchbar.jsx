import { Component } from "react";
import css from './Searchbar.module.css'

export class Searchbar extends Component {
    state = {
        searchText: '',
    }

    handleSeachQuery = ({target:{value}}) => {
        this.setState({ searchText: value });
    }

    getSeachQuery = (e) => {
        e.preventDefault();
        this.props.handleSearchQuery(this.state.searchText);
        this.setState(({ searchText: '' }));
    }

    render() {
        const {handleSearchQuery} = this.props
        return (
            <header className={css.searchbar}>
                <form className={css.search_form} onSubmit={this.getSeachQuery}>
                    <button type="submit" className={css.search_form_button}>
                    <span className={css.search_form_button_label}>Search</span>
                    </button>

                    <input
                    className={css.search_form_input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleSeachQuery}
                    value={this.state.searchText}
                    />
                </form>
            </header>  
        );
    }
}