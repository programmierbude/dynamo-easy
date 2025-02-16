import { updateDynamoEasyConfig } from '@progbu/dynamo-easy'
import { dateToNumberMapper } from '../models'

updateDynamoEasyConfig({
  dateMapper: dateToNumberMapper
})
