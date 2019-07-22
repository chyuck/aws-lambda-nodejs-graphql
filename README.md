## CRUD API application for AWS Lambda (NodeJS)
Application provides GraphQL APIs for manipulation of orders with the following attributes:
- ID
- Product
- Quantity
- Active Flag
- Create Time
- Change Time


## Setup ##
1. Install [NodeJS](https://nodejs.org/)
2. Install [Yarn](https://yarnpkg.com/en/docs/install)
3. Install [Serverless](https://serverless.com/):
```bash
npm install serverless -g
```
4. Install dependencies
```bash
yarn install
```


## Deployment ##
1. Setup AWS credentials:
```bash
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."
```
2. Deploy:
```bash
yarn deploy
```


## Testing ##

### Create Order ###
```bash
curl -G https://rgtwdxbfd8.execute-api.us-east-1.amazonaws.com/dev/query --data-urlencode 'query=mutation{createOrder(product:"Apple",quantity:3){id,product,quantity,active,created,updated}}'
```
Result:
```json
{  
   "data":{  
      "createOrder":{  
         "id":"5ea68890-acae-11e9-924d-d3c4082e5cdb",
         "product":"Apple",
         "quantity":3,
         "active":true,
         "created":"2019-07-22T18:27:32.376Z",
         "updated":"2019-07-22T18:27:32.376Z"
      }
   }
}
```

### Get Order ###
```bash
curl -G https://rgtwdxbfd8.execute-api.us-east-1.amazonaws.com/dev/query --data-urlencode 'query={order(id:"5ea68890-acae-11e9-924d-d3c4082e5cdb"){id,product,quantity,active,created,updated}}'
```
Result:
```json
{  
   "data":{  
      "order":{  
         "id":"5ea68890-acae-11e9-924d-d3c4082e5cdb",
         "product":"Apple",
         "quantity":3,
         "active":true,
         "created":"2019-07-22T18:27:32.376Z",
         "updated":"2019-07-22T18:27:32.376Z"
      }
   }
}
```

### Update Order ###
```bash
curl -G https://rgtwdxbfd8.execute-api.us-east-1.amazonaws.com/dev/query --data-urlencode 'query=mutation{updateOrder(id:"5ea68890-acae-11e9-924d-d3c4082e5cdb",product:"Orange",quantity:1){id,product,quantity,active,created,updated}}'
```
Result:
```json
{  
   "data":{  
      "updateOrder":{  
         "id":"5ea68890-acae-11e9-924d-d3c4082e5cdb",
         "product":"Orange",
         "quantity":1,
         "active":true,
         "created":"2019-07-22T18:27:32.376Z",
         "updated":"2019-07-22T18:34:19.640Z"
      }
   }
}
```

### List Orders ###
```bash
curl -G https://rgtwdxbfd8.execute-api.us-east-1.amazonaws.com/dev/query --data-urlencode 'query={orders{id,product,quantity,active,created,updated}}'
```
Result:
```json
{  
   "data":{  
      "orders":[  
         {  
            "id":"5ea68890-acae-11e9-924d-d3c4082e5cdb",
            "product":"Orange",
            "quantity":1,
            "active":true,
            "created":"2019-07-22T18:27:32.376Z",
            "updated":"2019-07-22T18:34:19.640Z"
         }
      ]
   }
}
```

### Delete Order ###
```bash
curl -G https://rgtwdxbfd8.execute-api.us-east-1.amazonaws.com/dev/query --data-urlencode 'query=mutation{deleteOrder(id:"5ea68890-acae-11e9-924d-d3c4082e5cdb")}'
```
Result:
```json
{  
   "data":{  
      "deleteOrder":"5ea68890-acae-11e9-924d-d3c4082e5cdb"
   }
}
```