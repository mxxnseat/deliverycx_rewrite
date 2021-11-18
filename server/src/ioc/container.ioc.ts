import "reflect-metadata";

import {Container} from "inversify";
import { CategoryUsecase } from "../components/category/domains/usecase/category.usecase";
import { CategoryRepository } from "../components/category/repository/category.repository";
import {ICategoryRepository} from "../components/category/interfaces/category.repository-abs";
import { TYPES } from "./types.ioc";
import { ICategoryEntity } from "components/category/domains/entity/category.entity";

const container = new Container();

container.bind<CategoryUsecase>(TYPES.CategoryUsecase).to(CategoryUsecase);
container.bind<ICategoryRepository<ICategoryEntity>>(TYPES.CategoryRepository).to(CategoryRepository)

export {container};