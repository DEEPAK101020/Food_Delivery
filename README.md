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
Host: localhost:3000
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

