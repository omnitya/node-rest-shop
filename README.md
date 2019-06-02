# node-rest-shop
A nodejs project backed by Express framework to perform restful web calls and persist data in AWS Mongo Altas cluster.
Steps to initiate the application
npm start -> starts the applicaiton (nodemon listens to change request and restart server when change detected).
Rest Calls : 
url :[POST] localhost:3000/orders
body : {
	"product" : "5cf3a35a92cbb522d4670d66",
	"quantity" : 7
}
Response : 
{
    "descr": "Order Created Succesfully.",
    "order": {
        "product": "5cf3a35a92cbb522d4670d66",
        "quantity": 7,
        "Id": "5cf3bf0ba9649a19b0a5418c"
    }
}

url :[POST] localhost:3000/products
body : {
	"name" : "Xiaomi Laptop",
	"price" : 640
}
Response: {
    "descr": "Product Created Succesfully.",
    "product": {
        "name": "Xiaomi Laptop",
        "price": 640,
        "Id": "5cf3b3255fd02d1250a4edfc"
    }
}
url : [GET] localhost:3000/products
Response : {
    "count": 7,
    "products": [
        {
            "name": "Mac Book Air",
            "price": 399,
            "Id": "5cf386a42a67d422a4d712e3",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/products/5cf386a42a67d422a4d712e3"
            }
        },
        {
            "name": "Del Vostro",
            "price": 289,
            "Id": "5cf38858beb6040ab0d63b16",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/products/5cf38858beb6040ab0d63b16"
            }
        },
        {
            "name": "Dell XPS 15 2-in-1",
            "price": 189,
            "Id": "5cf3a2f692cbb522d4670d43",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/products/5cf3a2f692cbb522d4670d43"
            }
        },
        {
            "name": "Acer Predator Helios 300",
            "price": 180,
            "Id": "5cf3a31492cbb522d4670d44",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/products/5cf3a31492cbb522d4670d44"
            }
        },
        {
            "name": "Asus ROG Zephyrus S GX701",
            "price": 445,
            "Id": "5cf3a33492cbb522d4670d45",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/products/5cf3a33492cbb522d4670d45"
            }
        },
        {
            "name": "Huawei MateBook 13. Our new pick for the best laptop in the world.",
            "price": 740,
            "Id": "5cf3a35a92cbb522d4670d46",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/products/5cf3a35a92cbb522d4670d46"
            }
        },
        {
            "name": "Xiaomi Laptop",
            "price": 640,
            "Id": "5cf3b3255fd02d1250a4edfc",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/products/5cf3b3255fd02d1250a4edfc"
            }
        }
    ]
}

url :[GET] localhost:3000/orders/5cf3bf0ba9649a19b0a5418c
Response : 
{
    "product": "5cf3a35a92cbb522d4670d66",
    "quantity": 7,
    "Id": "5cf3bf0ba9649a19b0a5418c",
    "request": {
        "type": "GET",
        "productUrl": "http://localhost:3000/products/5cf3a35a92cbb522d4670d66",
        "orderUrl": "http://localhost:3000/orders/5cf3bf0ba9649a19b0a5418c"
    }
}



##################
##################
 "author": "Omnitya Jha",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mongoose": "^5.5.12",
    "morgan": "^1.9.1"
  },
  "devDependencies": {
    "nodemon": "^1.19.1"
  }
