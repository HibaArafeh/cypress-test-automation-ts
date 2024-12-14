// Interface for the DELETE response structure
interface DeleteProductResponse {
  id: number;
  isDeleted: boolean;
  deletedOn: string; 
}

// Test suite for deleting a product
describe('Delete Product', () => {
  // Define the base API URL, defaulting to 'https://dummyjson.com
  const apiUrl: string = 'https://dummyjson.com';

  // Test case: Deletes an existing product and validates the responses
  it('should delete an existing product and validate the response', () => {
    const productId: number = 19;  // The ID of the product to be deleted
   
    cy.request('DELETE',`${apiUrl}/products/${productId}`).then((response) => {
      // Log the DELETE response
      cy.log('DELETE Response:', JSON.stringify(response.body));
      expect(response.headers['content-type']).to.include('application/json');

      //Validate the DELETE response
      expect(response.status).to.eq(200); // Check that the response status is 200 (OK)
      expect(response.body).to.have.property('id', productId); // Ensure the response includes the correct product ID
      expect(response.body).to.have.property('isDeleted', true); // Confirm the product is marked as deleted
      expect(response.body).to.have.property('deletedOn').to.be.a('string'); // Validate the timestamp is a string

      // Optionally, validate the timestamp format
      expect(response.body.deletedOn).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/); // ISO 8601 format
    });

    //request function accepts an object(HTTP method,url, and optional configurations)
    cy.request({
      method: 'GET', // HTTP method to fetch the product details
      url: `${apiUrl}/products/${productId}`, // API endpoint to retrieve the product
      failOnStatusCode: false, // Allow 4xx responses without failing the test
    }).then((response) => {
      //Log the GET response
      cy.log('GET Response:', JSON.stringify(response.body));

      //Validate the GET response status
      expect(response.status).to.eq(200); // Confirm that the product is still retrievable

      //Log a note about the absence of the `isDeleted` property in the GET response
      cy.log('The `isDeleted` property is not present in the GET response.  Which Confirm API behavior.');
    });
  });
});
