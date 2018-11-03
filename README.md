# REST api for product management

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