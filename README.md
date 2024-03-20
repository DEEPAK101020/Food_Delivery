## Register User

This endpoint allows the client to register a new user.

### Request Body

The request body should contain the following fields:

- `name` (text, required): The name of the user.
- `email` (text, required): The email address of the user.
- `password` (text, required): The password for the user account.
- `address.street` (text, required): The street address of the user.
- `address.city` (text, required): The city of the user's address.
- `address.state` (text, required): The state of the user's address.
- `address.country` (text, required): The country of the user's address.
- `address.zip` (text, required): The zip or postal code of the user's address.

### Endpoint

`POST /user/register`

### Example

```http
POST /user/register HTTP/1.1
Host:https://food-delivery-2gec.onrender.com/
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "Somestate",
    "country": "Somecountry",
    "zip": "12345"
  }
}
```

## User Login

This endpoint allows users to log in by providing their email and password.

### Request Body

The request body should contain the following fields:

- `email` (string, required): The email of the user.
- `password` (string, required): The password of the user.

### Endpoint

`POST /user/login`

### Example

```http
POST /user/login HTTP/1.1
Host: https://food-delivery-2gec.onrender.com/
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

This endpoint allows the user to reset their password by sending an HTTP PUT request to the specified URL. The request should include the user's ID in the URL and the new password in the request body.
Request Body
password (text) - The current password of the user.
newPassword (text) - The new password that the user wants to set.


## Create a New Restaurant

This endpoint allows you to create a new restaurant by sending an HTTP POST request to the specified URL. The request should include the restaurant's name, address, and menu details in the request body.

### Request Body

The request body should contain the following fields:

- `name` (string, required): The name of the restaurant.
- `address` (object, required): The address of the restaurant, including street, city, state, country, and zip.
- `menu` (array, required): An array of objects containing details of the menu items, including name, description, price, and image.

### Endpoint

`POST /restaurants`

### Example

```http
POST /restaurants HTTP/1.1
Host: https://food-delivery-2gec.onrender.com/
Content-Type: application/json

{
  "name": "Example Restaurant",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "Somestate",
    "country": "Somecountry",
    "zip": "12345"
  },
  "menu": [
    {
      "name": "Burger",
      "description": "Juicy beef burger with lettuce and tomato",
      "price": 9.99,
      "image": "burger.jpg"
    },
    {
      "name": "Pizza",
      "description": "Delicious pizza with various toppings",
      "price": 12.99,
      "image": "pizza.jpg"
    },
    {
      "name": "Salad",
      "description": "Fresh garden salad with vinaigrette dressing",
      "price": 7.99,
      "image": "salad.jpg"
    }
  ]
}

```https://food-delivery-2gec.onrender.com/restaurant/restaurants

This endpoint makes an HTTP GET request to retrieve a list of restaurants. The response will be in JSON format with an array of restaurant objects, each containing the address, restaurant ID, name, and menu items. The address object includes street, city, state, country, and zip code. The menu array includes the name, description, price, and image of each menu item.

https://food-delivery-2gec.onrender.com/restaurant/restaurants/:id

This endpoint makes an HTTP GET request to retrieve details of a specific restaurant by its ID. The response will have a status code of 200, indicating a successful request, and the data will be in JSON format. The response will include the address, ID, name, and menu of the restaurant, along with a version identifier. The address will have fields for street, city, state, country, and zip code, while the menu will consist of items with their name, description, price, image, and ID.

## Retrieve Menu of a Specific Restaurant

This endpoint retrieves the menu of a specific restaurant identified by its ID. The response will contain an array of menu items, where each item includes the name, description, price, image, and ID.
```

### Endpoint

`GET /restaurant/restaurants/:id/menu`

- `:id` (string, required): The ID of the specific restaurant.

### Example Response

```json
[
    {
        "name": "Burger",
        "description": "Juicy beef burger with lettuce and tomato",
        "price": 9.99,
        "image": "burger.jpg",
        "_id": "605cd65b82111f1234567890"
    },
    {
        "name": "Pizza",
        "description": "Delicious pizza with various toppings",
        "price": 12.99,
        "image": "pizza.jpg",
        "_id": "605cd65b82111f1234567891"
    },
    {
        "name": "Salad",
        "description": "Fresh garden salad with vinaigrette dressing",
        "price": 7.99,
        "image": "salad.jpg",
        "_id": "605cd65b82111f1234567892"
    }
]





