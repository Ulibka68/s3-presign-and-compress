import { YC } from "./yc";
import { preSignedUrl } from "./s3-pre-sign-for-func";

module.exports.handler = async function (
  event: YC.CloudFunctionsHttpEvent,
  context: YC.CloudFunctionsContext
) {
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

  const preSignedUrlResult = await preSignedUrl(context.getPayload());

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },

    body: JSON.stringify(preSignedUrlResult),
    isBase64Encoded: false,
  };
};
