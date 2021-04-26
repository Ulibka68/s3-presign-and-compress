import { compressImage } from "./ImageCompress";
import { YC } from "./yc";
require("dotenv").config();

/*
 inpBacketName: string,
  inpPictName,
  width: number,
  height: number,
  imageFormat: 'jpg' | 'png' = 'jpg',
  fit: keyof FitEnum = sharp.fit.contain,
  position: number | string = sharp.gravity.centre,
  bckgrndColor: RGBA = { r: 46, g: 138, b: 138, alpha: 1 },
 */

module.exports.handler = async function (event: YC.CloudFunctionsHttpEvent) {
  const retParm = {
    httpMethod: event.httpMethod,
    queryStringParameters: event.queryStringParameters,
  };

  const { httpMethod, queryStringParameters } = event;

  if (httpMethod != "GET")
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        errMsg: "Используйте метод GET для получения картинки",
      }),
      isBase64Encoded: false,
    };

  const mustHaveParams = ["inpPictName"];
  if (!mustHaveParams.every((element) => queryStringParameters[element]))
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        errMsg:
          "Вы не передали один из обязательных параметров : 'inpBacketName', 'inpPictName', 'width', 'height'",
      }),
      isBase64Encoded: false,
    };

  const retImgs = await compressImage(
    process.env.TMPBACKETNAME,
    queryStringParameters.inpPictName
  );
  // compressImage('pict26', 'imgs/20210323_070123.jpg', 400, 400, 'png');

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    // body: JSON.stringify(retParm),
    body: JSON.stringify(retImgs),
    isBase64Encoded: false,
  };
};
