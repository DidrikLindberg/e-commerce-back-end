# E-commerce Back End
[![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)](https://www.javascript.com/)
[![Express](https://img.shields.io/badge/Express.js-gray?style=rounded-square)](https://expressjs.com/)
[![Node.js Badge](https://img.shields.io/badge/Node.js-green)](https://nodejs.org/en)
[![npm Badge](https://img.shields.io/badge/npm-gray)](https://npmjs.com)
[![mySQL2 Badge](https://img.shields.io/badge/mySQL2-orange)](https://www.mysql.com/)


## Description
This is a project that involves creating an e-commerce site's backend and database using various technologies such as MySQL2, Express, Sequelize, and dotenv. There is no functional frontend as of now, but the functionality can easily be tested in insomnia. The app is able to complete API GET, POST, PUT, and DELETE requests to Categories, Products, and tags

  ## Table of Contents

  * [Usage](#usage)

  * [License](#license)

  * [Code Highlights](#Code)

  * [Contributing](#contributing)

  * [Questions](#questions)

## walkthrough
[See how this backend e-commerce app work behind the scenes!](https://drive.google.com/file/d/1xg4zgZmMQwJ0_Ec48R2ACjjOGPwQMS75/view)

## Insomnia requests
CRUD Requests to /api/categories

![CRUD Categories Requests](./assets/gifs/GET%20Categories.gif)


CRUD Requests to /api/products

![CRUD Products Requests](./assets/gifs/CRUD%20Products.gif)


CRUD Requests to /api/tags

![CRUD Tags Requests](./assets/gifs/CRUD%20Tags.gif)





## Usage

After cloning the repo your project directory should look like this:
```
config/
├─ connection.js
db/
├─ schema.sql
models/
├─ index.js
├─ Product.js
├─ Category.js
├─ Tag.js
├─ ProductTag.js
public/
routes/
├─ api/
│  ├─ tag-routes.js
│  ├─ product-routes.js
│  ├─ index.js
│  ├─ Category-routes.js
├─ inedex.js
seeds/
├─ category-seeds.js
├─ index.js
├─ product-seeds.js
├─ product-tag-seeds.js
├─ tag-seeds.js
.gitignore
package.json
README.md
server.js
```
You will need to create a .env file that includes:
```.en
DB_NAME='ecommerce_db'
DB_USER='root'
DB_PASSWORD='YourmySQLpassword'
```
run the following commands to initiate the server and seed the database

```
npm i
```
```
cd .\db\
mysql -u root -p
source schema.sql
quit
cd ..
```
```
npm run seed
npm start
```


  ## License
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  This project is licensed under the MIT License


  ## Code Highlights
  GET request
  ```java
  // get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json(err);
  }

});
```
CREATE Request
```java
// create new product
router.post('/', async (req, res) => {
  Product.create(req.body)
    .then((product) => {
      
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
```