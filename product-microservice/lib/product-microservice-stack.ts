import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as path from "path";
import {Duration} from "aws-cdk-lib";

export class ProductMicroserviceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
        ],
      },
      environment: {
        // todo - add environment variables
      },
      runtime: Runtime.NODEJS_18_X,
    }

    const getProductsListLambda = new NodejsFunction(this, 'getProductsList', {
      timeout: Duration.seconds(30),
      entry: path.join(__dirname, '..', 'lambdas', 'get-products-list.ts'),
      ...nodeJsFunctionProps,
    });

    const createProductLambda = new NodejsFunction(this, 'createProduct', {
      timeout: Duration.seconds(30),
      entry: path.join(__dirname, '..', 'lambdas', 'create-product.ts'),
      ...nodeJsFunctionProps,
    });

    const getOneProductLambda = new NodejsFunction(this, 'getProductsById', {
      timeout: Duration.seconds(30),
      entry: path.join(__dirname, '..', 'lambdas', 'get-product-by-id.ts'),
      ...nodeJsFunctionProps,
    });

    // Integrate the Lambda functions with the API Gateway resource
    const getProductsListIntegration = new LambdaIntegration(getProductsListLambda);
    const createProductIntegration = new LambdaIntegration(createProductLambda);
    const getOneProductIntegration = new LambdaIntegration(getOneProductLambda);

    // Create an API Gateway resource for each of the CRUD operations
    const api = new RestApi(this, 'productsApi', {
      restApiName: 'Product Service'
    });

    const productsResource = api.root.addResource('products');
    productsResource.addMethod(HttpMethod.GET, getProductsListIntegration);
    productsResource.addMethod(HttpMethod.POST, createProductIntegration);
    addCorsOptions(productsResource);

    const singleProductResource = productsResource.addResource('{productId}');
    singleProductResource.addMethod(HttpMethod.GET, getOneProductIntegration);
    addCorsOptions(singleProductResource);
  }
}

function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod('OPTIONS', new MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
}
