import { getConnectionToken } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import { OrganizationSchema } from "src/database/models/organization.model";

export const organizationProviders = [
    {
        provide: "Organization",
        useFactory: (connection: Connection) =>
            connection.model("Organization", OrganizationSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    }
];
