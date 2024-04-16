/**
 * @module decorators
 */
import * as DynamoDB from '@aws-sdk/client-dynamodb'
import { IndexType } from './index-type.enum'
import { initOrUpdateIndex } from './util'

/**
 * decorator to use property as GSI sort key
 */
export function GSISortKey(indexName: string): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    if (typeof propertyKey === 'string') {
      initOrUpdateIndex(IndexType.GSI, { name: indexName, keyType: DynamoDB.KeyType.RANGE }, target, propertyKey)
    }
  }
}
