import { Component } from 'react';
import css from './App.module.css';
import { getSearchData } from 'tools/getSearchData';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { FallingLinesComponent } from './FallingLinesComponent/FallingLinesComponent';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchQuery: '',
    searchData: [],
    page: 1,
    isLoadedGallery: true,
    canLoadMore: false,
    isloadingMore: false,
    isModalOpen: false,
    largeImageURL: '',
  }

  onSubmit = (newQuery) => {
    if (!newQuery) {
      Notiflix.Notify.failure('Please, enter some keyword');
      return;
    }

    this.setState({
      searchQuery: newQuery,
      searchData: [],
      page: 1,
      isLoadedGallery: false,
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.searchQuery === '') {
      return;
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      getSearchData(this.state.searchQuery, this.state.page)
        .then(res => res.json())
        .then(({ hits, total }) => {
          Notiflix.Notify.success(`We found ${total} images for you.`);
          this.setState({ searchData: [...hits], isLoadedGallery: true });

          if (total > 12) this.setState((prevState) => {
            return {
              canLoadMore: true,
              page: prevState.page + 1,
            }
          });
        })  
      return;
    }
  }

  onLoadMore = async () => {
    await this.setState({
      canLoadMore: false,
      isloadingMore:true,
    })

    getSearchData(this.state.searchQuery, this.state.page)
      .then(res => res.json())
      .then(({ hits }) => { 
        this.setState((prevState) => {
          return {
            searchData: [...prevState.searchData, ...hits],
            page: prevState.page + 1,
            canLoadMore: true,
            isloadingMore: false,
          }
        })

        if (hits.length < 12) {
          this.setState({ canLoadMore: false });  
          Notiflix.Notify.info('The images are finished!');
        } 
      })
  }

  onOpenOverlay = (imageURL) => {
    this.setState({ 
      isModalOpen: true,
      largeImageURL: imageURL,
    });
  }

  closeModalByClick = ({target}) => {
    if (target.alt === undefined) this.setState({ isModalOpen: false });
  }

  closeModalByESC = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.setState({ isModalOpen: false });
    });
  }

  handleModalEventListener = () => {
    this.closeModalByESC();
    document.removeEventListener('keydown', this.closeModalByESC);
  }
  
  render() {
    return (
      <>
        {this.state.isModalOpen &&
          <Modal
            imageURL={this.state.largeImageURL}
            closeModalByClick={this.closeModalByClick}
            handleModalEventListener={this.handleModalEventListener}
          />}
        <div className={css.app}>
          <Searchbar
            onSubmit={this.onSubmit}
          />

          {!this.state.isLoadedGallery && <FallingLinesComponent />}
          {this.state.searchData.length > 0 &&
            <ImageGallery
              collection={this.state.searchData}
              onOpenOverlay={this.onOpenOverlay}
            />
          }
          {this.state.canLoadMore && <Button onLoadMore={this.onLoadMore} />}
          {this.state.isloadingMore && <FallingLinesComponent/>}
        </div>
          
      </>
    );
  }
};
