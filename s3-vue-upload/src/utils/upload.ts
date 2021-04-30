import { store } from "@/store";

const MAX_IMAGE_SIZE = 20_000_000;
const YANDEX_FUNC_GET_PRESIGNED_URL =
  "https://functions.yandexcloud.net/d4e9kl5pgpjg1tl244gr";
const YANDEX_FUNC_COMPRESS_IMGS =
  "https://functions.yandexcloud.net/d4ej8v25ovjhutkflldc";

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

async function uploadImage(fileData: File, URL: string) {
  await createImage(fileData);
  console.log("length : ", imageStream.length, " key : ", fileData.name);

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

export async function getPreSignedUrlsObject(): Promise<any> {
  const newNames: Array<string> = [];
  for (let i = 0; i < store.state.counter.imagesInfo.length; i++) {
    newNames.push(store.state.counter.imagesInfo[i].newName);
  }

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

export async function sendFileArray(): Promise<void> {
  const URLs = await getPreSignedUrlsObject();

  for (let i = 0; i < store.state.counter.imagesInfo.length; i++) {
    const image = store.state.counter.imagesInfo[i];
    image.presignedUrl = URLs[image.newName];
    //
    store.commit("setLoadingState", { id: image.id, state: "Загружается" });
    await uploadImage(image.file, image.presignedUrl);
    store.commit("setLoadingState", {
      id: image.id,
      state: "Успешно загружено",
    });
  }
}

// сжать изображения
export async function compressArray(): Promise<void> {
  const newNames: Array<string> = [];
  for (let i = 0; i < store.state.counter.imagesInfo.length; i++) {
    newNames.push(store.state.counter.imagesInfo[i].newName);
  }

  const result = await fetch(YANDEX_FUNC_COMPRESS_IMGS, {
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
