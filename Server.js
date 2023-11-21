import { createWorker } from "tesseract.js";
import { opendir, writeFile } from "node:fs/promises";

async function AllFiles() {
  try {
    const directory = await opendir("./img");
    const worker = await createWorker("eng");
    for await (const image of directory) {
      const filePath = `${image.path}/${image.name}`;
      //   console.log(filePath);
      const ImageText = await worker.recognize(filePath).then((info) => {
        return info.data.text;
      });
      console.log(ImageText);
      await writeFile("information.txt", ImageText, { flag: "a" });
    }
    await worker.terminate();
  } catch (err) {
    console.error(err);
  }
}

AllFiles();
