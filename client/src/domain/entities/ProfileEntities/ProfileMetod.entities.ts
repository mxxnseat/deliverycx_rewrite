export interface IProfileEntitiesMetod{
  AuthFailAction(state:any):void
}
/**
 * @method AuthFailAction ошибка проверки авторизации, токена
 */
export class ProfileEntitiesMetod{
  public static AuthFailAction(state:any) {
    state.isAuth = true
  }
}