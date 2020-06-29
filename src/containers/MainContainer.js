import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolioIds: [],
    filter: 'All',
    sort: 'None'
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks").then(resp => resp.json()).then(json => this.setState({stocks: json}))
  }

  addStockToPortfolio = (stockId) => {
    if (!this.state.portfolioIds.find(portfolioId => portfolioId === stockId)){
      this.setState({
        portfolioIds: [...this.state.portfolioIds, stockId]
      })
    }
  }

  removeStockFromPortfolio = (stockId) => {
    this.setState({
      portfolioIds: this.state.portfolioIds.filter(portfolioId => portfolioId !== stockId) 
    })
  }

  updateFilter = type  => {
    this.setState({ filter: type })
  }

  updateSort = sortBy => {
    this.setState({ sort: sortBy })
  }

  displayStocks = () => {
    let filteredStocks = [...this.state.stocks]
    if(this.state.filter !== "All"){
      filteredStocks =  filteredStocks.filter(stock => stock.type === this.state.filter)        
    } 

    switch(this.state.sort){
      case "Alphabetically":
        return filteredStocks.sort((a,b) => a.name > b.name ? 1 : -1)
      case "Price":
          return filteredStocks.sort((a,b) => a.price > b.price ? 1 : -1)
      default:
        return filteredStocks
    }
  }

  render() {
    const portfolioStocks = this.state.portfolioIds.map(portfolioId => this.state.stocks.find(stock => stock.id === portfolioId))
    return (
      <div>
        <SearchBar filter={this.state.filter} sort={this.state.sort} updateFilter={this.updateFilter} updateSort={this.updateSort} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.displayStocks()} addStockToPortfolio={this.addStockToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={portfolioStocks} removeStockFromPortfolio={this.removeStockFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
