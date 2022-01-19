import { Module } from "@nestjs/common";
import { organizationProviders } from "src/components/organization/providers/organization.provider";
import { stopListProviders } from "src/components/stopList/providers/stopList.provider";
import { StopListRepository } from "src/components/stopList/repositories/base.repository";
import { IStopListRepository } from "src/components/stopList/repositories/interface.repository";
import { iikoAxiosProviders } from "src/services/iiko/iiko.axios";
import { IikoWebsocketGateway } from "src/services/iiko/iiko.gateway";
import { DatabaseModule } from "./database.module";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...iikoAxiosProviders,
        ...stopListProviders,
        ...organizationProviders,
        {
            provide: IStopListRepository,
            useClass: StopListRepository
        }
    ],
    exports: [
        ...iikoAxiosProviders,
        ...stopListProviders,
        ...organizationProviders,
        {
            provide: IStopListRepository,
            useClass: StopListRepository
        }
    ]
})
export class IikoModule {}
