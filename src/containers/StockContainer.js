import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  renderStocks = () => this.props.stocks.map(stock => <Stock  stockAction={this.props.buyStock} stock={stock} key={stock.id}></Stock>)
  
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
        this.renderStocks()
        }
      </div>
    );
  }

}

export default StockContainer;
