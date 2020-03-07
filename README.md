# Installation
- Install **postgresql** (you can change a db in config file ```"./src/config/database.js"```)
- Install dependecies ```npm install ``` or ```yarn install```.

#### Requirements of software that was used on development.
- Node.js v8.9.4
- npm v5.8.0
- PostgreSQL 9.6.1

#### Environment variables required to run application in development mode.
- **NODE_ENV** - development
- **PORT** - port that will use for start the server
- **DB_USERNAME** - is the database user (by default, $USER variable is used, which stores the user name of the current user of the system)
- **DB_PASSWORD** - database user password (if not used - leave it blank)
- **CONFIRMATION_TOKEN_TTL** - the lifetime of the token for confirmation of email after registration
- **SESSION_TTL** - the lifetime of the user token
- **SECRET** - the secret text ("salt") for generate tokens

_*You can use the dotenv file to set project variables.
Just create the env.development file in the config directory and put your variables there._

#### List of NPM commands ("scripts")
```bash
    npm start # start the application
    npm test # run the unit tests, check coverage, check lint and check security of npm dependencies 
    npm run test:unit # run the unit tests of application
    npm run test:coverage # run the unit tests and check coverage
    npm run lint # run eslint
    npm run secure # check security of npm dependencies (NSP)

```

#### The convention of the file naming
Used next structure for naming of files: "basename.namespace.ext".

- basename - base name of file
- namespace - type to which the module belongs
- ext - extensions of file

For separating parts of name use "." dot.
For separating words in one part use dash ("the-dash-case-notation").

For example, we have a class AuthController.
A file for an AuthController should be write like "auth.controller.js".
If we have a file with utilities for error handled, we can write file name like "errors.utility.js".


#### SMTP Server for development
For send and get mail in development use https://mailcatcher.me
