// src/api/concreteApiFactory.js
import ApiFactory from './apiFactory';
import axios from 'axios';

class ConcreteApiFactory extends ApiFactory {
    createProductApi(data) {
        return axios.post('/api/products', data);
    }

    createDiscountApi(data) {
        return axios.post('/api/discounts', data);
    }

    createOrderApi(data) {
        return axios.post('/api/orders', data);
    }
}

export default new ConcreteApiFactory();
