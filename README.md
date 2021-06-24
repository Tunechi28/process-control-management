# Process Control Manager

> an Api built with Express and Node

## Featured Endpoints 

### products
- getProducts
- getProductById
- deleteProduct
- createProduct
- updateProduct
- supervisorUpdate
- productsPendingSupervisorApproval
- productsPendingManagerApproval
- managerUpdate

### admin
- authAdmin
- createAdmin
- getAdmins
- getAdminById
- deleteAdmin
- updateAdmin

## Usage

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

### Env Variables

Create a .env file in then root and add the following

```
PRODUCTION_DB_DSN = your production mongodb uri
DEVELOPMENT_DB_DSN = your devlopment mongodb uri
TEST_DB_DSN = your test mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies 

```
npm install

```

### Run

```
# backend (:3000)
npm start
```
### test

```
npm test
```
### Seed Database

You can use the following commands to seed the database with some sample admins and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```