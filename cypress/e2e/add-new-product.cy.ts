// Define an interface to specify the product structure and ensure correct data types.
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage?: number; 
  stock?: number;
  rating?: number;
  images?: string[];
  thumbnail?: string;
  brand?: string; 
}
describe('Add New Product', () => {
  it('should add a new product and validate the response', () => {
    const newProduct: Product = {
      id: 0,      //set it to 0, cuz the API will generates it
      title: 'new Product',
      description: 'This is the new product description.',
      price: 80,
      category: 'new-product-category',
    };

    // Send POST request to add the product
    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/products/add', // Endpoint to add a new product
      body: newProduct, // Send the new product as the body of the request
      headers: {
        'Content-Type': 'application/json', // Tells the server that the request body is in JSON format 
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

       //if the test case involves checking the discount
       if (newProduct.discountPercentage !== undefined) {
        expect(newProduct.discountPercentage).to.be.a('number');
      }
      //if the test case involves checking the product's availability in stock
      if (newProduct.stock !== undefined) {
        expect(newProduct.stock).to.be.a('number');
      }
      //if the test case involves checking the product reviews
      if (newProduct.rating !== undefined) {
        expect(newProduct.rating).to.be.a('number');
      }
      //if the test case involves checking the product image
      if (newProduct.images !== undefined) {
        expect(newProduct.images).to.be.an('array');
      }
      //if the test case involves checking the product image
      if (newProduct.thumbnail !== undefined) {
        expect(newProduct.thumbnail).to.be.a('string');
      }
      //if the test case involves checking the product's brand
      if (newProduct.brand !== undefined) {
        expect(newProduct.brand).to.be.a('string');
      }
    });
  });
});
