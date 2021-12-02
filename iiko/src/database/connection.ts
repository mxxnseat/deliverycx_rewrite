import { connect } from "mongoose";

export function connection() {
    return connect(process.env.CONNECTION as string);
}
