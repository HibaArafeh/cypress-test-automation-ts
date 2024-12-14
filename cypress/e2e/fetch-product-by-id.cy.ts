//define interface to represent the products structure.
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}
describe('Fetch Single Product by ID', () => {
  it('should fetch a product by its ID and validate the response', () => {
    const productId: number = 3; // Example product ID from the Dummy JSON API

    // Sending GET request to fetch a product by ID
    cy.request('GET', `https://dummyjson.com/products/${productId}`).then((response) => {
      cy.log(JSON.stringify(response.body));
      // Validate status code
      expect(response.status).to.eq(200);

      // Validate the structure of the response
      expect(response.body).to.have.property('id'); // Ensure 'id' exists in the response
      expect(response.body.id).to.eq(productId); // Ensure the 'id' matches the requested productId

      // Ensure 'title', 'description', 'price', and 'category' properties exist in the response
      // and verify their types (string for 'title', 'description', 'category', and number for 'price')
      expect(response.body).to.have.property('title').and.to.be.a('string');   
      expect(response.body).to.have.property('description').and.to.be.a('string');
      expect(response.body).to.have.property('price').and.to.be.a('number');
      expect(response.body).to.have.property('category').and.to.be.a('string');
    });
  });
});
