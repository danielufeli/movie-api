[![Node.js CI](https://github.com/danielufeli/movie-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/danielufeli/movie-api/actions/workflows/node.js.yml)

# Simple Movie API

A simple Movie API


## Built With

- JavaScript
- NodeJs
- MongoDB
- Docker


## Swagger Documentation
API endpoints Documentation URL - https://movie-api-dan.herokuapp.com/docs/

## API Information
API endpoints URL - https://movie-api-dan.herokuapp.com/

|METHOD  |DESCRIPTION                             |ENDPOINT                                  |
|------- |----------------------------------------|------------------------------------------|
|POST    |Sign In                                 |auth                                      |
|POST    |Create a Movie                          |movie                                     |
|GET     |Get all Movies                          |movie                                     |

___
### Sample Users
1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

___

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) 14.0.0 installed and [POSTMAN](https://www.getpostman.com/downloads/).

```sh
git clone git@github.com:danielufeli/movie-api.git
cd movie-api
npm install
npm start
```

The app should now be running on [localhost:3000](http://localhost:3000/).
___

```
Authorization: Bearer <token>
```

# Authorization service

To authorize users please use our simple auth service based on JWT tokens.
Auth service code is located under `./src` directory

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally with docker

1. Clone this repository
2. Run from root dir

```
JWT_SECRET=secret docker-compose up -d
```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```

## JWT Secret

To generate tokens in auth service you need to provide env variable `JWT_SECRET`. 

## MongoDb URI

To connect to mongodb you need to provide env variable `mongodbURI`.

## Author

👤 **Daniel Ufeli**

- GitHub: [@danielufeli](https://github.com/danielufeli)
- Twitter: [@danielufeli](https://twitter.com/danielufeli)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/danielcode)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Appreciation to the Netguru Team

## 📝 License

This project is [MIT](./MIT.md) licensed.
