//define interface to represent the products structure.
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
  }
  
  describe('Fetch List of Products', () => {
    it('should fetch a list of products and validate the response', () => {
      // Send a GET request to fetch the list of products
      cy.request('GET', 'https://dummyjson.com/products?skip=164').then((response) => {
        cy.log(JSON.stringify(response.body));

        cy.log('Limit: ' + response.body.limit); //maximum number of products per request
        cy.log('Total: ' + response.body.total);  //Total amount of products in this case 194
        cy.log('Skip: ' + response.body.skip);    //how many items have been skipped from the start of the dataset.

        // Validate the status code
        expect(response.status).to.eq(200);
  
        // validate that the response returned by the API is in the expected format.
        expect(response.headers['content-type']).to.include('application/json');

        // Validate the structure of the response body
        expect(response.body).to.have.property('products');
        expect(response.body.products).to.be.an('array');
  
        // use the product interface and iterate through the products to validate each product's properties.
        response.body.products.forEach((product: Product) => {
          //for each product, check if the id is a number, and the value is not null
          expect(product).to.have.property('id').that.is.a('number').and.to.not.be.null;
          //for each product, check if the title is a string, and the value is not empty
          expect(product).to.have.property('title').that.is.a('string').and.to.not.be.empty;
          //for each product, check if the price is a number, and the value is not null
          expect(product).to.have.property('price').that.is.a('number').and.to.not.be.null;
          //for each product, check if the description is a string, and the value is not empty
          expect(product).to.have.property('description').that.is.a('string').and.to.not.be.empty;
  
        });
  
        // Check if the response returned an empty array for Better Test Coverage (edge cases)
        if (response.body.products.length === 0) {
          expect(response.body.products).to.be.an('array').that.is.empty;
        }
      });
    });
  });
  