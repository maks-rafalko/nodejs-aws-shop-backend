# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


## Development

How to run functions locally, e.g. `getProductsList`:

```bash
npm run local:invoke-product-list
```

How to run a server with lambda functions locally:

```bash
npm run local:start-api
```

then, you can send requests to `http://127.0.0.1:3000/products`, `http://127.0.0.1:3000/products/:id` etc.

## Working with `typeorm` CLI:

To initialize database schema run:

```bash
npm run typeorm schema:sync -- --dataSource=lambdas/data-source.ts
```

Migrations can be executed by running:

```bash
docker compose exec app npm run typeorm migration:run -- --dataSource=lambdas/data-source.ts
```

