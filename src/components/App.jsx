import { Component } from 'react';
import css from './App.module.css';
import { getSearchData } from 'tools/getSearchData';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { FallingLines } from 'react-loader-spinner';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    searchData: [],
    page: 1,
    isLoadedGallery: true,
    canLoadMore: false,
  }

  onSubmit = (newQuery) => {
    if (!newQuery) {
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
        .then(({hits, total}) => {
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

  onLoadMore = () => {
    getSearchData(this.state.searchQuery, this.state.page)
      .then(res => res.json())
      .then(({ hits }) => {
        if (hits.length < 12) this.setState({ canLoadMore: false });
        
        this.setState((prevState) => {
          return {
            searchData: [...prevState.searchData, ...hits],
            page: prevState.page + 1,
          }
        })
      })
  }
  
  render() {
    return (
      <div className={css.app}>
        <Searchbar
          onSubmit={this.onSubmit}
        />

        {!this.state.isLoadedGallery && 
          <div className={css.loader}>
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel='falling-lines-loading'
            />
          </div>          
        }      

        {this.state.searchData.length > 0 && <ImageGallery collection={this.state.searchData} />}
        {this.state.canLoadMore && <Button onLoadMore={this.onLoadMore} />}

      </div>
    );
  }
};
