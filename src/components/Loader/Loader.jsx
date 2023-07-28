import { Component } from "react";
import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';

export class Loader extends Component {
    render() {
        return (
            <div className={css.loader}>
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#c0efff'
                    color='#c40e0e'
                />    
            </div>
            
        );
    }
}