import { Model, Transient } from '@progbu/dynamo-easy'

@Model()
class MyModel {
  @Transient()
  myPropertyToIgnore: any
}
