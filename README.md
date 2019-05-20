#Marathon App (Backend)

For demonstration purposes only.

### Author: Giorgi Khundzakishvili

This is backend repository. frontend can be found [here](https://github.com/Khundzaka/demo-marathon-front).

## Introduction

Application is meant to be used during sport competitions.

built-in api and socket gives ability to track events in real time.

Application contains demo data only. for complete usage, it has to be extended.

## Logic

- Athlete is crossing corridor gate, event should be sent to a rest api
- Athlete is crossing finish gate, event should be sent to a rest api
- When all athletes cross the line, reset api endpoint can be triggered to clean events
- Frontend shows table in real time.
- When api is triggered, corresponding event is being sent to real time stream
- Frontend shows athlete name when there is at least one event available for given athlete
- Frontend is being scrolled automatically when new entry arrives
- Table is cleaned when reset request is received from api
- There is special script included which simulates client by triggering api endpoints

## Technical details

Technologies used in backend:
- NodeJS
- Express (for api)
- Sequelize (ORM)
- PostgreSQL
- Socket.io (Websocket)
- SQLite (for tests)
- Chai and Mocha (for automated testing)

Technologies used in frontend:
- Angular
- Socket.io client
- Bootstrap framework



## Installation

- to install dependencies, run
```bash 
$ npm install
```

- .env.example should be copied as .env

- then it is necessary to have sequelize-cli installed

```bash
$ npm install -g sequelize-cli
```

Now you can run CLI using following command anywhere

```bash
$ sequelize
```

Install CLI locally to your `node_modules` folder with

```bash
$ npm install --save sequelize-cli
```

You should be able to run CLI with

```bash
$ node_modules/.bin/sequelize
```

- commands needed to finish setting up database
```bash
$ sequelize db:create    #if not created
$ sequelize db:migrate   #for creating tables
$ sequelize db:seed:all    #for creating test data
```

- running the application using cli
```
$ npm run dev
```

- running automated test suite using cli
```
$ npm run test
```

- running test client for automatic api triggering
```
$ npm run client
```

## Possible improvements to be done

- If frontend loses connection, it should call history api once again
- There is a partial implementation of stopping event streaming when app goes in the background, and continue when it returns in foreground. it can be connected to listener of corresponding event

## Additional details

- Backend project is done from scratch.
- Frontend project is started using angular cli.
- Project is created for presentation purposes only
