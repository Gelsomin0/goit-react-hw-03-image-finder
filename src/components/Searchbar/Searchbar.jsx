import { Component } from "react";
import { ImSearch } from "react-icons/im";
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

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
        return (
            <header className={css.searchbar}>
                <form className={css.search_form} onSubmit={this.getSeachQuery}>
                    <button type="submit" className={css.search_form_button}>
                        <ImSearch className={css.serach_icon} />
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

Searchbar.propTypes = {
    handleSeachQuery: PropTypes.func,
}