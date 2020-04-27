import React, { Component } from 'react';

class PageNotFound extends Component {
    render(){
        return (
            <div className="text-center page-not-found-image-container">
                <img className="page-not-found-image" src="/404.png" alt="" />
            </div>
        );
    }
}

export default PageNotFound;