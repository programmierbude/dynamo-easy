import { DynamoStore } from '@progbu/dynamo-easy'
import { Person } from '../models'
import { DynamoDB } from '@aws-sdk/client-dynamodb'

new DynamoStore(Person, new DynamoDB({}))
  .batchGet([{ id: 'a' }, { id: 'b' }])
  .exec()
  .then(res => console.log('fetched items:', res))
