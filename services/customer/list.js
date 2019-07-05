import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  var customerId = "a463d360-9e62-11e9-bb80-6fcef29d77cd";
  if (event.queryStringParameters && event.queryStringParameters.customerId){
    customerId = event.queryStringParameters.customerId;
  }
  const params = {
    TableName: process.env.tableNamePrefix + "-customers",
    KeyConditionExpression: "customerId = :customerId",
    ExpressionAttributeValues: {
      ":customerId": customerId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    console.log(" DB call successful");
    console.log(result.Items);
    return success(result.Items);
  } catch (e) {
    console.log(" DB call failed" + e);
    return failure({ status: false });
  }
}
