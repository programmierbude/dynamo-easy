import { ScanInput } from 'aws-sdk/clients/dynamodb'
import { Observable } from 'rxjs/Observable'
import { DynamoRx } from '../../dynamo/dynamo-rx'
import { Request } from '../request.model'
import { Response } from '../response.model'
import { ConditionBuilder } from '../utils/condition-builder'
import { ConditionFunction } from '../utils/condition-function'

// inspired by https://github.com/ryanfitz/vogels/blob/master/lib/scan.js
export class ScanRequest<T> extends Request<T, ScanInput> {
  constructor(dynamoRx: DynamoRx, modelClazz: { new (): T }) {
    super(dynamoRx, modelClazz)
  }

  where(keyName: keyof T): ConditionFunction<ScanRequest<T>> {
    return ConditionBuilder.addCondition<ScanRequest<T>>(keyName, this, this.metaData.forProperty(keyName))
  }

  execNoMap(): Observable<Response<T>> {
    delete this.params.Select

    return this.dynamoRx.scan(this.params).map(queryResponse => {
      const response: Response<T> = {}
      Object.assign(response, queryResponse)
      response.Items = queryResponse.Items!.map(item => this.mapFromDb(<any>item))

      return response
    })
  }

  exec(): Observable<T[]> {
    delete this.params.Select

    return this.dynamoRx.scan(this.params).map(response => response.Items!.map(item => this.mapFromDb(<any>item)))
  }

  execSingle(): Observable<T | null> {
    delete this.params.Select

    return this.dynamoRx.scan(this.params).map(response => this.mapFromDb(<any>response.Items![0]))
  }

  execCount(): Observable<number> {
    const params = { ...this.params }
    params.Select = 'COUNT'

    return this.dynamoRx.scan(params).map(response => response.Count!)
  }
}
