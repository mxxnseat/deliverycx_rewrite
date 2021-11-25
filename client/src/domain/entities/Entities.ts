/**
 * @abstract
 * @type {R} тип entities класса
 * @protected {entities} обект логики
 * @method getEntities отдает текущую логику(entities)
 * @method init заменяет текущую логику(entities)
 */
export default abstract class <R> {
  protected entities:R | Record<string, unknown> = {}
  public get getEntities() {
    return this.entities
  }
  public init<T extends R>(entiti:R | T): T | R | void {
    return this.entities = entiti
  }
  
}