import { OneImgInfo, ResultURLs, useImages } from "@/state/composition-state";

const MAX_IMAGE_SIZE = 20_000_000;
const YANDEX_FUNC_GET_PRESIGNED_URL =
  "https://functions.yandexcloud.net/d4e9kl5pgpjg1tl244gr";
const YANDEX_FUNC_COMPRESS_IMGS =
  "https://functions.yandexcloud.net/d4ej8v25ovjhutkflldc";
const stateImgs = useImages();

// type FileReaderResult = string | ArrayBuffer | null ;
type FileReaderResult = string;
let imageStream: FileReaderResult = "";
// let imageStream: typeof FileReader.result = "";

async function createImage(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // eslint-disable-next-line
      if ((e.target!.result as any).length > MAX_IMAGE_SIZE) {
        reject("Image is loo large.");
      }

      // eslint-disable-next-line
      imageStream = e.target!.result as FileReaderResult;
      resolve(imageStream);
    };
    reader.readAsDataURL(file);
  });
}

// Версия на fetch - не используется
// eslint-disable-next-line
async function uploadImage(fileData: File, URL: string) {
  await createImage(fileData);
  // console.log("length : ", imageStream.length, " key : ", fileData.name);

  const binary = atob(imageStream.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  const blobData = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

  // eslint-disable-next-line
  const result = await fetch(URL, {
    method: "PUT",
    body: blobData,
  });
  // console.log("Result: ", result);
}

function XHRupload(
  blobData: Blob,
  URL: string,
  img: OneImgInfo
): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    // отслеживаем процесс отправки
    req.upload.onprogress = (event) => {
      const percentComplete = (event.loaded / event.total) * 100;
      // console.log("XHRupload percentComplete ", percentComplete);
      img.progress = percentComplete;
    };

    // Ждём завершения: неважно, успешного или нет
    req.onloadend = function () {
      if (req.status == 200) {
        // console.log("Успешно загружено");
        resolve("OK");
      } else {
        console.log("Ошибка " + this.status);
        reject("Upload error");
      }
    };

    req.open("PUT", URL, true);
    req.send(blobData);
  });
}

async function uploadImageXHR(
  fileData: File,
  URL: string,
  img: OneImgInfo
): Promise<string> {
  await createImage(fileData);
  // console.log("length : ", imageStream.length, " key : ", fileData.name);

  const binary = atob(imageStream.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  const blobData = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

  return await XHRupload(blobData, URL, img);
}

export async function getPreSignedUrlsObject(
  newNames: Array<string>
  // eslint-disable-next-line
): Promise<any> {
  const result = await fetch(YANDEX_FUNC_GET_PRESIGNED_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNames),
  }).then((response) => {
    return response.json();
  });
  // console.log(result["storage-new-features-social.png"]);
  return result;
}

export async function sendFileArray(): Promise<string> {
  /*console.log(
    "sendFileArray  stateImgs.state.imgInfo",
    stateImgs.state.imgInfo
  );*/
  const newNamesTmp = [];
  for (let i = 0; i < stateImgs.state.imgInfo.length; i++) {
    const img = stateImgs.state.imgInfo[i];
    newNamesTmp.push(img.newName);
  }

  const URLs = await getPreSignedUrlsObject(newNamesTmp);
  // console.log("upload sendFileArray URL : ", URLs);

  let logMsg = "";
  for (let i = 0; i < stateImgs.state.imgInfo.length; i++) {
    const img = stateImgs.state.imgInfo[i];

    const startTime = Math.floor(Date.now() / 1000);

    logMsg = logMsg + `${img.file.name} -- ${img.file.size}\n`;
    // await uploadImage(img.file, URLs[newNamesTmp[i]]);
    await uploadImageXHR(img.file, URLs[newNamesTmp[i]], img);

    const endTime = Math.floor(Date.now() / 1000) - startTime;
    logMsg = logMsg + `Uploaded ${img.file.name} at ${endTime} seconds\n`;

    img.state = "Upload finished";
    img.progress = 100;
  }
  return logMsg;
}

// сжать изображения
export async function compressArray(): Promise<ResultURLs> {
  stateImgs.state.compressState = "compressStart";

  const newNamesTmp = [];
  for (let i = 0; i < stateImgs.state.imgInfo.length; i++) {
    const img = stateImgs.state.imgInfo[i];
    newNamesTmp.push(img.newName);
  }

  const result = await fetch(YANDEX_FUNC_COMPRESS_IMGS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNamesTmp),
  }).then((response) => {
    stateImgs.state.compressState = "compressFinished";
    return response.json();
  });
  // console.log(result["storage-new-features-social.png"]);

  return result;
}
