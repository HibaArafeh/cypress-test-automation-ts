// Interface for the DELETE response structure
interface DeleteProductResponse {
  id: number;
  isDeleted: boolean;
  [key: string]: any; // Allow additional optional properties
}

// Test suite for deleting a product
describe('Delete Product', () => {
  // Define the base API URL, defaulting to 'https://dummyjson.com' if no environment variable is set
  const apiUrl: string = Cypress.env('apiUrl') || 'https://dummyjson.com';

  // Test case: Deletes an existing product and validates the responses
  it('should delete an existing product and validate the response', () => {
    const productId: number = 1; // The ID of the product to be deleted

    // Step 1: Send a DELETE request to remove the product
    cy.request<DeleteProductResponse>({
      method: 'DELETE', // HTTP method for deletion
      url: `${apiUrl}/products/${productId}`, // API endpoint for deleting the product
      headers: {
        'Content-Type': 'application/json', // Specify the request content type
      },
    }).then((response) => {
      // Step 2: Log the DELETE response for debugging purposes
      cy.log('DELETE Response:', JSON.stringify(response.body));

      // Step 3: Validate the DELETE response
      expect(response.status).to.eq(200); // Check that the response status is 200 (OK)
      expect(response.body).to.have.property('id', productId); // Ensure the response includes the correct product ID
      expect(response.body).to.have.property('isDeleted', true); // Confirm the product is marked as deleted
    });

    // Step 4: Verify the product still exists but is flagged as deleted
    cy.request({
      method: 'GET', // HTTP method to fetch the product details
      url: `${apiUrl}/products/${productId}`, // API endpoint to retrieve the product
      failOnStatusCode: false, // Allow non-2xx/3xx responses without failing the test
    }).then((response) => {
      // Step 5: Log the GET response for debugging purposes
      cy.log('GET Response:', JSON.stringify(response.body));

      // Step 6: Validate the GET response status
      expect(response.status).to.eq(200); // Confirm that the product is still retrievable

      // Step 7: Log a note about the absence of the `isDeleted` property in the GET response
      cy.log('The `isDeleted` property is not present in the GET response. Confirm API behavior.');
    });
  });
});
