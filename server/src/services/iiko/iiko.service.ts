import { IIiko } from "./iiko.abstract";

export class IikoService implements IIiko {
    async create() {
        console.log("SEND REQUEST TO IIKO");

        return Math.random() * 100;
    }
}
