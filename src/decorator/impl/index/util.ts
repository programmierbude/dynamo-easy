import * as DynamoDB from 'aws-sdk/clients/dynamodb'
import { PropertyMetadata } from '../../metadata/property-metadata.model'
import { initOrUpdateProperty } from '../property/init-or-update-property.function'
import { KEY_PROPERTY } from '../property/key-property.const'
import { IndexType } from './index-type.enum'

export interface IndexData {
  name: string
  keyType: DynamoDB.KeyType
}

export function initOrUpdateIndex(indexType: IndexType, indexData: IndexData, target: any, propertyKey: string): void {
  const properties: Array<PropertyMetadata<any>> = Reflect.getMetadata(KEY_PROPERTY, target.constructor) || []
  const existingProperty = properties.find(property => property.name === propertyKey)

  let propertyMetadata: Partial<PropertyMetadata<any>>
  switch (indexType) {
    case IndexType.GSI:
      propertyMetadata = initOrUpdateGSI(
        existingProperty && existingProperty.keyForGSI ? existingProperty.keyForGSI : {},
        indexData,
      )
      break
    case IndexType.LSI:
      propertyMetadata = initOrUpdateLSI(
        existingProperty && existingProperty.sortKeyForLSI ? existingProperty.sortKeyForLSI : [],
        indexData,
      )
      break
    default:
      throw new Error(`unsupported index type ${indexType}`)
  }

  initOrUpdateProperty(propertyMetadata, target, propertyKey)
}

function initOrUpdateGSI(
  indexes: Record<string, DynamoDB.KeyType>,
  indexData: IndexData,
): Partial<PropertyMetadata<any>> {
  if (indexes[indexData.name]) {
    // TODO LOW:INVESTIGATE when we throw an error we have a problem where multiple different classes extend one base class, this will be executed by multiple times
    // throw new Error(
    //   'the property with name is already registered as key for index - one property can only define one key per index'
    // )
  } else {
    indexes[indexData.name] = indexData.keyType
  }

  return { keyForGSI: indexes }
}

function initOrUpdateLSI(indexes: string[], indexData: IndexData): Partial<PropertyMetadata<any>> {
  indexes.push(indexData.name)
  return { sortKeyForLSI: indexes }
}
