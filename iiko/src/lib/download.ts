import * as Jimp from "jimp";
import * as uuid from "uuid";

export class DownloadImage {
    async download(url: string) {
        if (!url) {
            return "";
        }
        try {
            const image = await Jimp.read(url);
            const ext = image._originalMime.split("/")[1];
            const imageName = `${uuid.v4()}_${Date.now()}.${ext}`;

            await image.resize(300, Jimp.AUTO);
            await image.writeAsync(`${process.cwd()}/static/${imageName}`);

            return `/static/shop/${imageName}`;
        } catch (e) {
            return url;
        }
    }
}
