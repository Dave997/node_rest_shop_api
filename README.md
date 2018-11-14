# REST api for product management

**N.B** In all the operations that require an authentications, there must be in the POST request header the `Authorization` field with the following content: ```Bearer <user token>``` (the space is required!)

**Usage** 
> GET 

To retrieve all products: 

``` url
https://node-restful-shop-api.herokuapp.com/products
```
To retrieve a specific product: 

``` url
https://node-restful-shop-api.herokuapp.com/products/<productID>
```

> POST

Create a product 

POST request to: `https://node-restful-shop-api.herokuapp.com/products`

with the following data: 
```json
{
    "name": "product name",
    "price": 123.45
}
```

> DELETE

Delete a specific product 

DELETE request to the following url:

``` url
https://node-restful-shop-api.herokuapp.com/products/<productID>
```

> UPDATE

PATCH request to: `https://node-restful-shop-api.herokuapp.com/products/<productID>`

with the following data: 
```json
[
    {
        "propName": "name",
        "value": "newValue"
    }
    {
        "propName": "price",
        "value": 234.56
    }
]

```
N.B. you can also send only one property if you want

## User management

### login
> POST
request to `http://node-restful-shop-api.herokuapp.com/users/login`

```json
{
	"email": "test@test.it",
	"password": "test"
}
```

### signup
> POST
request to `http://node-restful-shop-api.herokuapp.com/users/signup`

```json
{
	"email": "test@test.it",
	"password": "test"
}
```