import { Model, PartitionKey, SortKey } from '@progbu/dynamo-easy'

@Model()
export class MyModel {
  @PartitionKey()
  myPartitionKey: string

  @SortKey()
  mySortKey: number
}
