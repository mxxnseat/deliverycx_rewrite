/**
 * @abstract
 * @type {R} тип entities класса
 * @protected {entities} обект логики
 * @method getEntities отдает текущую логику(entities)
 * @method init заменяет текущую логику(entities)
 */
export default abstract class <R> {
  static _instanse = null
  protected entities:R | Record<string, unknown> = {}
  public get getEntities() {
    return this.entities
  }
  public init<T extends R>(entiti:R | T): T | R | void {
    return this.entities = entiti
  }
  static getInstance(_Class:any) {
    if (!_Class._instanse) {
      _Class._instanse = new _Class()
    }
    return _Class._instanse
  }
  
}