# Contact Management
### Servers

There are two servers
* server.js     -   connected to DB
* serverAuth.js -   authorization 

### API functions

### Endpoint</br>
1. '/posts' (for token generation)</br>
* POST
```sh
POST http://localhost:4000/login
Content-Type : application/json

{
    "username": "<name>"
}
```


2. '/db' (requires authorization)

* GET
```sh
GET http://localhost:3000/db
Content-Type: application/json
Authorization: Bearer <token>
```

* POST
```sh
POST http://localhost:3000/db
Content-Type: application/json
Authorization: Bearer <token>

{
    "name": "<name>",
    "email": "<uniqueEmail>",
    "phone": "<phone>",
    "linkedinURL": "<url>"
}
```

  
