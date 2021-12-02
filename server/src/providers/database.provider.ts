import { connect } from "mongoose";

export const databaseProvider = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: () => connect(process.env.CONNECTION)
    }
];
