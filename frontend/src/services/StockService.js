import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class StockService {

    getStocks() {
        const url = `${API_URL}/api/stockuser/`;
        return axios.get(url, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(response => response.data);
    }
    getStocksByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(response => response.data);
    }
    createStockUser(params) {
        const url = `${API_URL}/api/stockuser/save`;
        return axios.post(url, {
            stock: params.stock.ticket,
            price_min: params.price_min.price_min,
            price_max: params.price_max.price_max
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).catch(
            function (error) {
                console.log('Show error notification!')
                return false
            }
        )
    }
    deleteStock(pk) {
        const url = `${API_URL}/api/stockuser/delete`;
        return axios.post(url, {
            id: pk,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).catch(
            function (error) {
                console.log('Show error notification!')
                return false
            }
        )
    }
    updateTimer(minutes) {
        const url = `${API_URL}/api/scheduler/1`;
        return axios.put(url, {
            minutes: minutes
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).catch(
            function (error) {
                console.log('Show error notification!')
                return false
            }
        )
    }
    getTimer() {
        const url = `${API_URL}/api/scheduler/`;
        return axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).catch(
            function (error) {
                console.log('Show error notification!')
                return false
            }
        )
    }
}