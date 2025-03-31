// src/api/apiFactory.js
class ApiFactory {
    createProductApi() {
        throw new Error("Method 'createProductApi()' must be implemented.");
    }

    createDiscountApi() {
        throw new Error("Method 'createDiscountApi()' must be implemented.");
    }

    createOrderApi() {
        throw new Error("Method 'createOrderApi()' must be implemented.");
    }
}

export default ApiFactory;
