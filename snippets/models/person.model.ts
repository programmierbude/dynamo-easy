import { Model, PartitionKey } from '@progbu/dynamo-easy'

@Model()
export class Person {
  @PartitionKey()
  id: string
  name: string
  yearOfBirth: number
}
