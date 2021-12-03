import { Connection } from "mongoose";

import { OrganizationSchema } from "src/database/models/organization.model";

export const organizationProviders = [
    {
        provide: "ORGANIZATION_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("organization", OrganizationSchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
