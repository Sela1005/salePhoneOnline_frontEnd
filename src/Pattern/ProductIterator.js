class ProductIterator {
    constructor(products) {
      this.products = products;
      this.index = 0;
    }
  
    hasNext() {
      return this.index < this.products.length;
    }
  
    next() {
      if (this.hasNext()) {
        return this.products[this.index++];
      }
      return null;
    }
  
    reset() {
      this.index = 0;
    }
  }
  
  export default ProductIterator;
  