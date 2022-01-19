export interface ICategory {
    image: string;
    id: string;
    name: string;
}
export interface IProduct<C = ICategory> {
    id: string;
    name: string;
    description: string;
    additionalInfo: string;
    price: number;
    weight: number;
    measureUnit: string;
    image: string;
    categoryImage: string;
    isFav: boolean;
}
export interface IFavorites {
    list: string[];
}
export interface IResponseProductCard {
    sauces: IProduct[];
    product: IProduct;
    group: ICategory;
}
export interface IStopList{
    organization: string,
    stopList: TStopListItems[]
}
export type TStopListItems = {
    balance: number,
    productId:string
}