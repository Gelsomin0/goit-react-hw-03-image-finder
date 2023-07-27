import { Component } from 'react';
import css from './App.module.css';
import { getSearchData } from 'tools/getSearchData';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    collection: [],
    isLoading: false,
    isLargeImage: false,
    LargeImageUrl: '',
  }

  handleSearchQuery = async (searchText) => {
    await this.setState(({ searchQuery: searchText }));
    getSearchData(this.state.searchQuery)
      .then(res => res.json())
      .then(res => {
        this.setState(({ collection: [...res.hits] }));
      })
  }

  openLargeImage = (imageUrl) => {
    this.setState(({isLargeImage: true, LargeImageUrl: `${imageUrl}` }));
  }

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSearchQuery={this.handleSearchQuery} />
        <ImageGallery
          collection={this.state.collection}
          openLargeImage={this.openLargeImage}
        >
          {this.state.collection.length > 0 && <Button/>}          
        </ImageGallery>
        {this.state.isLargeImage && <Modal largeImageUrl={ this.state.LargeImageUrl } />}
      </div>
    );
  }
};
