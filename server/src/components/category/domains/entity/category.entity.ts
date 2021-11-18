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