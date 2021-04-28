require("dotenv").config();
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

import { PutObjectCommandInput } from "@aws-sdk/client-s3/commands/PutObjectCommand";

export type PreSignedUrl = Record<string, string>;

export const preSignedUrl = async (
  pictNames: Array<string>
): Promise<PreSignedUrl> => {
  try {
    // Create an Amazon S3 service client object.
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_ENDPOINT,
      apiVersion: "latest",
      // credentials: { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET },
      // credential автоматически грузится из .env
    });

    const signedUrls: PreSignedUrl = {};

    for (let i = 0; i < pictNames.length; i++) {
      const params: PutObjectCommandInput = {
        Bucket: process.env.TMPBACKETNAME,
        Key: pictNames[i],
        ContentType: "image/*",
        ACL: "public-read",
      };

      const command = new PutObjectCommand(params);

      // Create the presigned URL.
      const signedUrl: string = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });
      signedUrls[pictNames[i]] = signedUrl;
    }

    return signedUrls;
  } catch (err) {
    console.log("Error creating presigned URL", err);
    return { error: "Ошибка запроса URL" };
  }
};
