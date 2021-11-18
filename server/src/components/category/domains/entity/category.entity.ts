export class CategoryEntity{
    constructor(
        public id: UniqueId,
        public name: string,
        public description: string,
        public code: string,
        public order: number,
        public image: string
    ){}
}


export interface ICategoryEntity{
    id: UniqueId,
    name: string,
    description: string,
    code: string,
    order: number,
    image: string
}