import { MapperForType, NumberAttribute } from '@progbu/dynamo-easy'

export const dateToNumberMapper: MapperForType<Date, NumberAttribute> = {
  fromDb: attributeValue => new Date(parseInt(attributeValue.N, 10)),
  toDb: propertyValue => ({ N: `${propertyValue.getTime()}` }),
}
