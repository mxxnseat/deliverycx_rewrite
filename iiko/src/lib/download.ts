import * as uuid from "uuid";
import axios from "axios";
import { createWriteStream } from "fs";

export class DownloadImage {
    async download(url: string) {
        if (!url) {
            return "";
        }
        try {
            const response = await axios.get(url, { responseType: "stream" });
            const ext = response.data.headers["content-type"].split("/")[1];
            const imageName = `${uuid.v4()}_${Date.now()}.${ext}`;

            response.data.pipe(createWriteStream(`/data/iiko/${imageName}`));

            return `/static/shop/${imageName}`;
        } catch (e) {
            return url;
        }
    }
}

const inst = new DownloadImage();
inst.download(
    `https://102922.selcdn.ru/nomenclature_images/fe470000-906b-0025-00f6-08d8de6557e1/4a6d26f1-344b-4df4-a000-555974a096d5.png`
);
