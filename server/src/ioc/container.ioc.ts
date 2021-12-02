import "reflect-metadata";

import { Container } from "inversify";

import { TYPES } from "./types.ioc";
import { IUserRepository } from "../components/user/repositories/interface.repository";
import { UserRepository } from "../components/user/repositories/base.repository";
import { UserUsecase } from "../components/user/usecases/user.usecase";

import { IProductRepository } from "../components/product/repositories/interface.repository";
import { ProductRepository } from "../components/product/repositories/base.repository";
import { ProductUsecase } from "../components/product/usecases/product.usecase";

import { ICategoryRepository } from "../components/category/repositories/interface.repository";
import { CategoryRepository } from "../components/category/repositories/base.repository";
import { CategoryUsecase } from "../components/category/usecases/category.usecase";

import { ICityRepository } from "../components/city/repositories/interface.repository";
import { CityRepository } from "../components/city/repositories/base.repository";
import { CityUsecase } from "../components/city/usecases/city.usecase";

import { IOrganizationRepository } from "../components/organization/repositories/interface.repository";
import { OrganizationRepository } from "../components/organization/repositories/base.repository";
import { OrganizationUsecase } from "../components/organization/usecases/organization.usecase";

import { ICartRepository } from "../components/cart/repositories/interface.repository";
import { CartRepository } from "../components/cart/repositories/base.repository";
import { CartUsecase } from "../components/cart/usecases/cart.usecase";

const container = new Container();

container
    .bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
container
    .bind<UserUsecase>(TYPES.UserUsecase)
    .to(UserUsecase)
    .inSingletonScope();

container
    .bind<IProductRepository>(TYPES.ProductRepository)
    .to(ProductRepository)
    .inSingletonScope();
container
    .bind<ProductUsecase>(TYPES.ProductUsecase)
    .to(ProductUsecase)
    .inSingletonScope();

container
    .bind<ICategoryRepository>(TYPES.CategoryRepository)
    .to(CategoryRepository)
    .inSingletonScope();
container
    .bind<CategoryUsecase>(TYPES.CategoryUsecase)
    .to(CategoryUsecase)
    .inSingletonScope();

container
    .bind<ICityRepository>(TYPES.CityRepository)
    .to(CityRepository)
    .inSingletonScope();
container
    .bind<CityUsecase>(TYPES.CityUsecase)
    .to(CityUsecase)
    .inSingletonScope();

container
    .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
    .to(OrganizationRepository)
    .inSingletonScope();
container
    .bind<OrganizationUsecase>(TYPES.OrganizationUsecase)
    .to(OrganizationUsecase)
    .inSingletonScope();

container
    .bind<ICartRepository>(TYPES.CartRepository)
    .to(CartRepository)
    .inSingletonScope();
container
    .bind<CartUsecase>(TYPES.CartUsecase)
    .to(CartUsecase)
    .inSingletonScope();

export { container };
