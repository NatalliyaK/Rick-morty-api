import React, { Component } from 'react';
import "./spiner.scss";

export default class Spinner extends Component {
    render() {
        return (
            <div className='spinner'>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}