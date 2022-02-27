import { Module } from "@nestjs/common";
import { PersonalCabinetController } from "src/components/personalCabinet/controllers/personalCabinet.controller";
import { personalCabinetProviders } from "src/components/personalCabinet/providers/personalCabinet.provider";

@Module({
    controllers: [PersonalCabinetController],
    providers: [...personalCabinetProviders]
})
export class PersonalCabinetModule {}
