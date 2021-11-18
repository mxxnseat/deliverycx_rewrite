import { CategoryUsecase } from "./components/category/domains/usecase/category.usecase";
import { TYPES } from "./ioc/types.ioc";
import { container } from "./ioc/container.ioc";



const categoryUsecase = container.get<CategoryUsecase>(TYPES.CategoryUsecase);


console.log(categoryUsecase.getOne("2").then(el=>console.log(el)));