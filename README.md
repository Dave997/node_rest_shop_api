# REST api for product management

**Usage** 
> GET 

To retrieve all products: 

``` url
https://localhost.com:3000/products
```
To retrieve a specific product: 

``` url
https://localhost.com:3000/products/<productID>
```

> POST

Create a product 

POST request to: `https://localhost.com:3000/products`

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
https://localhost.com:3000/products/<productID>
```

> UPDATE

PATCH request to: `https://localhost.com:3000/products/<productID>`

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