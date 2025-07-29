import { DynamoStore } from '@progbu/dynamo-easy'
import { Person } from '../models'
import { DynamoDB } from '@aws-sdk/client-dynamodb'

new DynamoStore(Person, new DynamoDB({}))
  .scan()
  .whereAttribute('yearOfBirth').equals(1958)
  .execFetchAll()
  .then(res => console.log('ALL items with yearOfBirth == 1958', res))
