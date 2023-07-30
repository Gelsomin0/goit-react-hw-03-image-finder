import { Component } from 'react';
import css from './App.module.css';
import { getSearchData } from 'tools/getSearchData';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
    searchData: [],
    page: 1,
  }

  onSubmit = (newQuery) => {
    this.setState({ searchQuery: newQuery });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery === '') {
      return;
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      getSearchData(this.state.searchQuery, this.state.page)
        .then(res => res.json())
        .then((res) => {
          this.setState({ searchData: [...res.hits] });
        })  
      return;
    }
  }
  
  render() {
    return (
      <div className={css.app}>
        <Searchbar
          onSubmit={this.onSubmit}
        />

        {this.state.searchData.length > 0 && <ImageGallery collection={this.state.searchData} />}

      </div>
    );
  }
};
