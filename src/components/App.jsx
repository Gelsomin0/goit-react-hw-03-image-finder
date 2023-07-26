import { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  }

  handleSearchQuery = (searchText) => {
    console.log(searchText);
  }

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSearchQuery={this.handleSearchQuery} />
        <ImageGallery/>
      </div>
    );
  }
};
