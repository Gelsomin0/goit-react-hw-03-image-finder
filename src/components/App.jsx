import { Component } from 'react';
import css from './App.module.css';
import { getSearchData } from 'tools/getSearchData';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    collection: [],
    isLoading: false,
    isLoadingMore: false,
    isLargeImage: false,
    isFinish: true,
    isFinded: true,
    largeImageUrl: '',
  }

  handleSearchQuery = async (searchText) => {
    await this.setState(({
      page: 1,
      searchQuery: searchText,
      isLoading: true,
      isFinish: true,
      isFinded: true,
      collection: [],
    }));
    getSearchData(this.state.searchQuery, this.state.page)
      .then(res => res.json())
      .then(async res => {
        if (res.total === 0) {
          this.setState(({
            isLoading: false,
            isFinded: false,
          }));
          return res.total;
        }
        await this.setState(() => {
          return {
            collection: [...res.hits],
            isLoading: false,
            isFinish: false,
          }
        })

        if (res.total < 12) {
          this.setState(({isFinish: true}))
        }
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
      return {
        page: prevState.page + 1,
        isLoadingMore: true,
      }
    });

    getSearchData(this.state.searchQuery, this.state.page)
      .then(res => res.json())
      .then(res => {
        this.setState((prevState) => {
          if (res.hits.length !== 12) {
            this.setState(({isFinish: true}))
          }
          return {
            collection: [...prevState.collection, ...res.hits],
            isLoadingMore: false,
          }
        })
      })
  }

  getOkStatus = () => {
    this.setState(({isFinded: true}))
  }

  render() {
    return (
      <div className={css.app}>
        {!this.state.isFinded && <ErrorMessage getOkStatus={ this.getOkStatus } />}
        <Searchbar handleSearchQuery={this.handleSearchQuery} />
        {this.state.isLoading && <Loader/>}
        <ImageGallery
          collection={this.state.collection}
          openLargeImage={this.openLargeImage}
        >
          {!this.state.isFinish && <Button loadMore={this.loadMore} />} 
        </ImageGallery>
        {this.state.isLoadingMore && <Loader/>}
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
