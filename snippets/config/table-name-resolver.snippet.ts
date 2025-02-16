import { TableNameResolver, updateDynamoEasyConfig } from '@progbu/dynamo-easy'

const myTableNameResolver: TableNameResolver = (tableName: string) => {
  return `myPrefix-${tableName}`
}

updateDynamoEasyConfig({
  tableNameResolver: myTableNameResolver
})
