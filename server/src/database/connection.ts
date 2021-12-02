import dotenv from "dotenv";
dotenv.config({
    path: __dirname + "/../../.env"
});

import { connect } from "mongoose";

export function connection() {
    return connect(process.env.CONNECTION as string);
}
