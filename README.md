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