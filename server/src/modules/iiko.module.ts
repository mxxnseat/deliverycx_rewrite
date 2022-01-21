import { Module } from "@nestjs/common";
import { CartRepository } from "src/components/cart/repositories/base.repository";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { organizationProviders } from "src/components/organization/providers/organization.provider";
import { OrganizationRepository } from "src/components/organization/repositories/base.repository";
import { IOrganizationRepository } from "src/components/organization/repositories/interface.repository";
import { stopListProviders } from "src/components/stopList/providers/stopList.provider";
import { StopListRepository } from "src/components/stopList/repositories/base.repository";
import { IStopListRepository } from "src/components/stopList/repositories/interface.repository";
import { StopListUsecase } from "src/components/stopList/usecases/stopList.usecase";
import { iikoAxiosProviders } from "src/services/iiko/iiko.axios";
import { IikoWebsocketGateway } from "src/services/iiko/iiko.gateway";
import { DatabaseModule } from "./database.module";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...iikoAxiosProviders,
        ...stopListProviders,
        {
            provide: IStopListRepository,
            useClass: StopListRepository
        },
        {
            provide: ICartRepository,
            useClass: CartRepository
        },
        {
            provide: StopListUsecase,
            useClass: StopListUsecase
        },
        {
            provide: IOrganizationRepository,
            useClass: OrganizationRepository
        }
    ],
    exports: [
        ...iikoAxiosProviders,
        ...stopListProviders,

        {
            provide: IStopListRepository,
            useClass: StopListRepository
        },
        {
            provide: StopListUsecase,
            useClass: StopListUsecase
        },
        {
            provide: ICartRepository,
            useClass: CartRepository
        },
        {
            provide: IOrganizationRepository,
            useClass: OrganizationRepository
        }
    ]
})
export class IikoModule {}
