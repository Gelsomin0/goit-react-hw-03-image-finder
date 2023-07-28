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
    page: 1,
    collection: [],
    isLoading: false,
    isLargeImage: false,
    largeImageUrl: '',
  }

  handleSearchQuery = async (searchText) => {
    await this.setState(({ page: 1, searchQuery: searchText }));
    getSearchData(this.state.searchQuery, this.state.page)
      .then(res => res.json())
      .then(res => {
        this.setState(() => {
          return {collection: [...res.hits]}
        })
      })
  }

  openLargeImage = (imageUrl) => {
    this.setState(({isLargeImage: true, largeImageUrl: `${imageUrl}` }));
  }

  closeModal = ({target}) => {
    if (target.src !== this.state.largeImageUrl) {
      this.setState(({isLargeImage: false, largeImageUrl: ''}))   
    }
  }

  loadMore = async () => {
    await this.setState((prevState) => {
      return { page: prevState.page + 1 }
    });
    getSearchData(this.state.searchQuery, this.state.page)
      .then(res => res.json())
      .then(res => {
        this.setState((prevState) => {
          return {collection: [...prevState.collection, ...res.hits]}
        })
      })
  }

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSearchQuery={this.handleSearchQuery} />
        <ImageGallery
          collection={this.state.collection}
          openLargeImage={this.openLargeImage}
        >
          {this.state.collection.length > 0 && <Button loadMore={this.loadMore} />}          
        </ImageGallery>
        {this.state.isLargeImage &&
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            closeModal={this.closeModal}
          />
        }
      </div>
    );
  }
};
