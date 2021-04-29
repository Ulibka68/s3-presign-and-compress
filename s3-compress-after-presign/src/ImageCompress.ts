import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable, Duplex } from "stream";
import sharp = require("sharp");
import { FitEnum, GravityEnum } from "sharp";
require("dotenv").config();
const ReadableStreamClone = require("./cloneReadableStream");
require("./memoryUsage");
import { getFileName } from "./uid-filenames";

export interface RGBA {
  r: number;
  g: number;
  b: number;
  alpha: number;
}

// Create S3 service object
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  apiVersion: "latest",
  // credentials: { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET },
  // credential автоматически грузится из .env
});

const CompressBacketName = process.env.COMPRESSBACKETNAME;

export const compressImage = async (
  inpBacketName: string,
  inpPictName,
  fit: keyof FitEnum = sharp.fit.contain,
  position: number | string = sharp.gravity.centre,
  bckgrndColor: RGBA = { r: 46, g: 138, b: 138, alpha: 1 }
): Promise<{
  jpg1600?: string;
  jpg350?: string;
  errName?: string;
}> => {
  // Set the parameters.
  const getParams = {
    Bucket: inpBacketName,
    Key: inpPictName,
  };

  try {
    const data = await s3.send(new GetObjectCommand(getParams));

    const inpStream: Readable = data.Body as Readable;
    const readClone1 = new ReadableStreamClone(inpStream, {
      highWaterMark: inpStream.readableHighWaterMark,
    });
    const readClone2 = new ReadableStreamClone(inpStream, {
      highWaterMark: inpStream.readableHighWaterMark,
    });

    const transformerJPEG1600: Duplex = sharp()
      .rotate()
      .resize({
        width: 1600,
        fit,
        position,
        background: bckgrndColor,
        fastShrinkOnLoad: true,
      })
      .toFormat(sharp.format.jpeg);

    const transformerJPEG350: Duplex = sharp()
      .rotate()
      .resize({
        width: 350,
        fit,
        position,
        background: bckgrndColor,
        fastShrinkOnLoad: true,
      })
      .toFormat(sharp.format.jpeg);

    const outpName = getFileName(inpPictName);

    const uploadParamsJPEG1600 = {
      Bucket: CompressBacketName,
      Key: outpName + "-1600.jpeg",
      Body: readClone1.pipe(transformerJPEG1600),
      ContentType: "image/jpeg",
    };
    const uploadParams350 = {
      Bucket: CompressBacketName,
      Key: outpName + "-350.jpeg",
      Body: readClone2.pipe(transformerJPEG350),
      ContentType: "image/jpeg",
    };

    let dataPut = await s3.send(new PutObjectCommand(uploadParamsJPEG1600));

    dataPut = await s3.send(new PutObjectCommand(uploadParams350));

    return {
      jpg1600:
        "https://storage.yandexcloud.net/" +
        CompressBacketName +
        "/" +
        outpName +
        "-1600.jpeg",
      jpg350:
        "https://storage.yandexcloud.net/" +
        CompressBacketName +
        "/" +
        outpName +
        "-350.jpeg",
    };
  } catch (err) {
    console.error("ERROR : ", err.name);
    if (err.name === "NoSuchKey")
      return {
        errName:
          "Не найдено входящее изображение : " +
          inpBacketName +
          "/" +
          inpPictName,
      };
    else return { errName: err.errName };
  }
};
