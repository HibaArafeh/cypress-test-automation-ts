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
    const apiUrl: string = 'https://dummyjson.com';
  
    it('should update an existing product and validate the response', () => {
      const productId: number = 1;
      const updatedProduct = {
        title: 'Updated-Product',
        description: 'This is the description of the updated product.',
        price: 250,
        category: 'updated-product-category'
      };
  
      // Ensure the product exists
      cy.request(`${apiUrl}/products/${productId}`).then((response) => {
        expect(response.status).to.eq(200); // Ensure product exists
      });
  
      // Send PUT request to update the product
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/products/${productId}`,
        body: updatedProduct,
        headers: {
          'Content-Type': 'application/json',    // Ensure that the response is in JSON format.
        },
      }).then((response) => {
        // Cast response to Product type for type safety
        const productResponse: Product = response.body;
  
        // Log the response for debugging purposes
        cy.log(JSON.stringify(response.body));
  
        // Validate the response
        expect(response.status).to.eq(200);
  
        // validate whether the properties of the productresponse(id,title,description, price, and category) matched the values of productID
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