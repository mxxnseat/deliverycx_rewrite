export interface ICity {
  _id: string,
  name: string
}
export interface IPoint {
  contacts: {
      phone: string,
      email: string
  },
  _id: string,
  city: ICity,
  latitude: number,
  longitude: number,
  workTime: string,
  street: string
}