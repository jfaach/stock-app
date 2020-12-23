import React, { Component } from 'react';
import StockService from "../services/StockService";
import Table from 'react-bootstrap/Table'
import StockModal from '../components/StockAddModal.js'
import Button from 'react-bootstrap/Button'

const stockService = new StockService();

class StockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token == null) {
            window.location.href = '/';
        }

        var self = this;
        stockService.getStocks().then(function (result) {
            self.setState({ stocks: result.data, nextPageURL: result.nextlink })
        });
    }

    handleAdd(stock) {
        stockService.createStockUser(stock).then((result) => {
            window.location.reload()
        })
    }

    handleDelete(pk) {
        var self = this;
        stockService.deleteStock(pk).then(() => {
            var newArr = self.state.stocks.filter(function (obj) {
                return obj.pk !== pk;
            });
            self.setState({ stocks: newArr })
        });
    }

    nextPage() {
        var self = this;
        stockService.getStocksByURL(this.state.nextPageURL).then((result) => {
            self.setState({ stocks: result.data, nextPageURL: result.nextlink })
        });
    }

    render() {
        return (
            <div className="stocks--list">
                <StockModal
                    handleAdd={this.handleAdd}
                />
                <Table responsive className="table">
                    <thead key="thead">
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Price Min</th>
                            <th>Price Max</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stocks.map(c =>
                            <tr key={c.pk}>
                                <td>{c.stock.symbol}</td>
                                <td>{c.stock.name}</td>
                                <td>{c.stock.price}</td>
                                <td>{c.price_min}</td>
                                <td>{c.price_max}</td>
                                <td>
                                    <Button
                                        onClick={() => this.handleDelete(c.pk)}
                                        variant="danger">X</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <button className="btn btn-primary" onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

export default StockList;

