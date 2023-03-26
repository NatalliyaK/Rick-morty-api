import React, { Component } from 'react';
import './card-item.scss';
export default class CardItem extends Component {
    render() {
        return (
                <div key={this.props.data.id} className='cards-item__container'>
                    <img src = {this.props.data.image} alt='item' className='cards-item__image' />
                    <h2 className='cards-item__title'>{this.props.data.name}</h2>
                </div>
        )
    }
}