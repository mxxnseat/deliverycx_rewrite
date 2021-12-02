export const TYPES = {
    UserRepository: Symbol.for("IUserRepository"),
    UserUsecase: Symbol.for("UserUsecase"),

    ProductRepository: Symbol.for("IProductRepository"),
    ProductUsecase: Symbol.for("ProductUsecase"),

    CategoryRepository: Symbol.for("ICategoryRepository"),
    CategoryUsecase: Symbol.for("CategoryUsecase"),

    CityRepository: Symbol.for("ICityRepository"),
    CityUsecase: Symbol.for("CityUsecase"),

    OrganizationRepository: Symbol.for("IOrganizationRepository"),
    OrganizationUsecase: Symbol.for("OrganizationUsecase"),

    CartRepository: Symbol.for("ICartRepository"),
    CartUsecase: Symbol.for("CartUsecase")
};
