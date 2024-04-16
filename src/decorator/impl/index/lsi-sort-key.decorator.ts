/**
 * @module decorators
 */
import * as DynamoDB from '@aws-sdk/client-dynamodb'
import { IndexType } from './index-type.enum'
import { initOrUpdateIndex } from './util'

/**
 * Marks a property as the sort key attribute of a local secondary index (the partition key must be same as in base table)
 */
export function LSISortKey(indexName: string): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    if (typeof propertyKey === 'string') {
      initOrUpdateIndex(IndexType.LSI, { name: indexName, keyType: DynamoDB.KeyType.RANGE }, target, propertyKey)
    }
  }
}
