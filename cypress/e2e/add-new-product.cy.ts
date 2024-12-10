//define interface to represent the products structure.
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}
describe('Add New Product', () => {
  it('should add a new product and validate the response', () => {
    // Define the product structure and type it for TypeScript
    const newProduct: Product = {
      id: 0,
      title: 'new Product',
      description: 'This is the new product description.',
      price: 80,
      category: 'new-product-category',
    };

    // Send POST request to add the product
    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/products/add', // Endpoint to add a new product
      body: newProduct, // Send the new product details as the body of the request
      headers: {
        'Content-Type': 'application/json', // Ensure that the response is in JSON format.
      }
    }).then((response) => {
      cy.log(JSON.stringify(response.body)); // Log the response body for debugging

      // Assert the status code is 201 (Created) for a successful creation
      expect(response.status).to.eq(201);

      // Validate the response body properties using chaining
      expect(response.body).to.have.property('id').to.be.a('number');
      expect(response.body).to.have.property('title').to.eq(newProduct.title);  
      expect(response.body).to.have.property('description').to.eq(newProduct.description);  
      expect(response.body).to.have.property('price').to.be.a('number'); 
      expect(response.body).to.have.property('category').to.eq(newProduct.category);
    });
  });
});
