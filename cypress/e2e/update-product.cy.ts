//define interface to represent the products structure.
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  // Optional properties
  discountPercentage?: number;  
  stock?: number;  
  rating?: number;  
  images?: string[];  
  thumbnail?: string;  
  brand?: string;  
}
describe('Update Existing Product', () => { 
  it('should update an existing product and validate the response', () => {
    const apiUrl: string = 'https://dummyjson.com';
    const productId: number = 19;
    const updatedProduct = {
      title: 'Updated-Product-title',
      description: 'This is the description of the updated product.',
      price: 250,
      category: 'updated-product-category',
    };

    // 1. Ensure the product exists
    cy.request('GET', `${apiUrl}/products/${productId}`).then((response) => {
      expect(response.status).to.eq(200); // Ensure the product exists
    });

    // 2. Update the product
    cy.request('PUT',`${apiUrl}/products/${productId}`,updatedProduct).then((response) => {
      
      const productResponse: Product = response.body;
      cy.log(JSON.stringify(response.body));
      // Validate the updated product
      expect(response.status).to.eq(200);
      expect(productResponse.id).to.eq(productId);
      expect(productResponse.title).to.eq(updatedProduct.title);
      expect(productResponse.description).to.eq(updatedProduct.description);
      expect(productResponse.price).to.eq(updatedProduct.price);
      expect(productResponse.category).to.eq(updatedProduct.category);

      
      // can validate other properties if they are relevant for the test scenario
      //if the test case involves checking the discount
      if (productResponse.discountPercentage !== undefined) {
        expect(productResponse.discountPercentage).to.be.a('number');
      }
      //if the test case involves checking the product's availability in stock
      if (productResponse.stock !== undefined) {
        expect(productResponse.stock).to.be.a('number');
      }
      //if the test case involves checking the product reviews
      if (productResponse.rating !== undefined) {
        expect(productResponse.rating).to.be.a('number');
      }
      //if the test case involves checking the product image
      if (productResponse.images !== undefined) {
        expect(productResponse.images).to.be.an('array');
      }
      //if the test case involves checking the product image
      if (productResponse.thumbnail !== undefined) {
        expect(productResponse.thumbnail).to.be.a('string');
      }
      //if the test case involves checking the product's brand
      if (productResponse.brand !== undefined) {
        expect(productResponse.brand).to.be.a('string');
      }
    });
  });
});
