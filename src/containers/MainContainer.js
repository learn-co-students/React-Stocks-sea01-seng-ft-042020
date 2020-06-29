import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filter: 'All',
    sort: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        stocks: json, 
        stocksSet: json
      })
    })
  }

  render() {
    return (
      <div>
        <SearchBar sortStocks={this.sortStocks} filterStocks={this.filterStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.passStocks()} portfolioChange={this.portfolioChange}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolio} portfolioChange={this.portfolioChange}/>

            </div>
          </div>
      </div>
    );
  }

  portfolioChange = (where, id) => {
    if (where === 'Market') {
      this.addStock(id)
    } else {
      this.removeStock(id)
    }
  }

  addStock = (id) => {
    let newPortfolio = [...this.state.portfolio, this.state.stocks[id]]
    this.setState({
      portfolio: newPortfolio
    })
  }

  removeStock = (id) => {
    let newPortfolio = this.state.portfolio
    newPortfolio.splice(id,1)
    this.setState({
      portfolio: newPortfolio
    })
  }

  passStocks = () => {
    let passedStocks = [...this.state.stocks]

    if (this.state.filter !== "All") {
      passedStocks = passedStocks.filter(stock => stock.type === this.state.filter)
    }

    if (this.state.sort === 'Alphabetically') {
      passedStocks = passedStocks.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    } else if (this.state.sort === 'Price') {
      passedStocks = passedStocks.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
    } 

    return passedStocks
  }

  filterStocks = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  sortStocks = (event) => {
    if (event.target.value === 'Alphabetically' && event.target.checked) {
      document.getElementById("Price").checked = false
      this.setState({sort:event.target.value})
    } else if (event.target.value === 'Price' && event.target.checked) {
      document.getElementById("Alph").checked = false
      this.setState({sort:event.target.value})
    } else {
      this.setState({sort:null})
    }
  }

}

export default MainContainer;
