import { Module } from "@nestjs/common";
import { stopListProviders } from "src/components/stopList/providers/stopList.provider";
import { stopListRepository } from "src/components/stopList/repositories/base.repository";
import { IStopListRepository } from "src/components/stopList/repositories/interface.repository";
import { iikoAxiosProviders } from "src/services/iiko/iiko.axios";
import { DatabaseModule } from "./database.module";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...iikoAxiosProviders,
        ...stopListProviders,
        {
            provide: IStopListRepository,
            useClass: stopListRepository
        }
    ],
    exports: [
        ...iikoAxiosProviders,
        ...stopListProviders,
        {
            provide: IStopListRepository,
            useClass: stopListRepository
        }
    ]
})
export class IikoModule {}
