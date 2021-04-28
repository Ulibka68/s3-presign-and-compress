const MAX_IMAGE_SIZE = 20_000_000;
const YANDEX_FUNC_GET_PRESIGNED_URL =
  "https://functions.yandexcloud.net/d4e9kl5pgpjg1tl244gr";

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
  console.log("length : ", imageStream.length);

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

async function getPreSignedUrl(
  fname: string
): Promise<{ preSignedUrl: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(YANDEX_FUNC_GET_PRESIGNED_URL);
    url.searchParams.set("inpPictName", fname);

    const xhr = new XMLHttpRequest();

    // console.log("url.toString() : ", url.toString());
    xhr.open("GET", url.toString());
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = function () {
      if (xhr.status != 200) {
        // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        reject(xhr.statusText);
      } else {
        // если всё прошло гладко, выводим результат
        resolve(xhr.response);
      }
    };
  });
}

export async function sendFile(fileData: File): Promise<void> {
  console.log(fileData.name);
  const URL = await getPreSignedUrl(fileData.name);
  // console.log("URL : ", URL.preSignedUrl);

  await uploadImage(fileData, URL.preSignedUrl);
}

export async function getPreSignedUrlsObject(files: Array<File>): Promise<any> {
  const nameArr: Array<string> = files.map((file) => file.name);
  // console.log(nameArr);
  const result = await fetch(YANDEX_FUNC_GET_PRESIGNED_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nameArr),
  }).then((response) => {
    return response.json();
  });
  // console.log(result["storage-new-features-social.png"]);
  return result;
}

export async function sendFileArray(files: Array<File>): Promise<void> {
  const URLs = await getPreSignedUrlsObject(files);
  console.log("URL : ", URLs);

  for (let i = 0; i < files.length; i++) {
    await uploadImage(files[i], URLs[files[i].name]);
  }
}
