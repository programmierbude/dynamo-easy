/**
 * @module dynamo-easy
 */
import * as DynamoDB from '@aws-sdk/client-dynamodb'

/**
 * @hidden
 */
export interface ConditionalParamsHost {
  readonly params: ConditionalParams
}

/**
 * @hidden
 */
export interface ConditionalParams {
  expressionAttributeNames?: Record<string, string>
  expressionAttributeValues?: Record<string, DynamoDB.AttributeValue>
  [key: string]: any
}

/**
 * @hidden
 */
export interface UpdateParamsHost {
  readonly params: DynamoDB.UpdateItemInput | DynamoDB.Update
}
