import * as Jimp from "jimp";
import * as uuid from "uuid";

export class DownloadImage {
    download(url: string) {
        return new Promise<string>(async (resolve, reject) => {
            if (!url) {
                resolve("");

                return;
            }

            const timerId = setTimeout(() => {
                resolve(url);

                clearTimeout(timerId);
            }, 20000);

            const image = await Jimp.read(url);
            const ext = image._originalMime.split("/")[1];
            const imageName = `${uuid.v4()}_${Date.now()}.${ext}`;

            await image.resize(300, Jimp.AUTO);
            await image.writeAsync(`/data/iiko/${imageName}`);

            resolve(`/static/shop/${imageName}`);
        });
    }
}
