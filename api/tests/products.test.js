const request = require('supertest');

const url = "https://node-restful-shop-api.herokuapp.com";

// to test the status code
test('GET /products return 200', async () => {
  const response = await request(url+'/products').get('/'); // in get write the path (eg :id)
  expect(response.statusCode).toBe(200);
});


// to test the content on the response
test('GET /products/id should return information', async () => {
    const response = await request(url+'/products').get('/5bddaf964f94a367bb087c51');  // in get write the path (eg :id)
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();

    // info to check
    expect(response.body.product['name']).toBe("Harry Potter 5");
  });
