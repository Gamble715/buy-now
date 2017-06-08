import React, { Component, PropTypes } from 'react';
import ReactRating from 'react-rating';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProductsActions from '../actions/products';
import style from './App.css';

@connect(
  state => ({
    products: state.products
  }),
  dispatch => ({
    actions: bindActionCreators(ProductsActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    products: PropTypes.object
  };

  navigate(url) {
    chrome.tabs.create({ url });
  }

  otherContent(content) {
    const subset = content.slice(0, 3);
    return subset.map(entry => (
      <a href={entry.permalink} style={{ cursor: 'pointer', margin: '0 5px' }} key={entry.permalink} onClick={() => this.navigate(entry.permalink)}>
        <img alt="content" src={entry.photoUrl} height="50px" />
      </a>
    ));
  }


  renderProducts() {
    // TODO make it all pretty like
    const { products } = this.props;
    if (products.count > 0) {
      const buttonStyle = {
        backgroundColor: '#19AA8E',
        color: 'white',
        borderRadius: '3px',
        width: '100px',
        height: '30px',
        paddingTop: '8px',
        textAlign: 'center',
        marginLeft: '60%',
        fontWeight: 500,
        cursor: 'pointer'
      };
      return products.data.map(product => (
        <div key={product.productId} style={{ width: '100%' }}>
          <div style={{ width: '40%', float: 'left' }}>
            { product.productImageURL && <img alt="product" style={{ height: 100 }} src={product.productImageURL} />}
          </div>
          <div style={{ marginLeft: '40%' }}>
            <ul style={{ listStyleType: 'none' }}>
              <li>
                <b>Brand</b> { product.brand }
              </li>
              <li>
                <b>Name</b> { product.productName }
              </li>
              <li>
                <b>Rating</b>
                <div>
                  <ReactRating
                    style={{ color: '#19AA8E' }}
                    empty="fa fa-star-o fa-2x"
                    full="fa fa-star fa-2x"
                    fractions={2}
                    readonly
                    initialRate={product.productRating}
                  />
                </div>
              </li>
              <li style={{ margin: '5px 0 5px -5px' }}>
                {this.otherContent(product.content)}
              </li>
            </ul>
          </div>
          <div style={buttonStyle} onClick={() => this.navigate(product.buyNow.productPageURL)}>
              Buy Now
          </div>
          <hr />
        </div>
      ));
    }
  }


  render() {
    return (
      <div className={style.normal}>
        <div>
          <h1>Buy Now</h1>
        </div>
        { this.renderProducts() }
      </div>
    );
  }
}
