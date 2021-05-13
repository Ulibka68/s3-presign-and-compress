import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { DeleteObjectsRequest } from "@aws-sdk/client-s3/models/models_0";
require("dotenv").config();

// Create S3 service object
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  apiVersion: "latest",
  // credentials: { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET },
  // credential автоматически грузится из .env
});

export const deleteImages = async (
  inpPictName: Array<string>
): Promise<boolean> => {
  // Set the parameters.
  const objectForDelete = inpPictName.map((value) => ({ Key: value }));
  const delParams: DeleteObjectsRequest = {
    Bucket: process.env.TMPBACKETNAME,
    Delete: { Objects: objectForDelete, Quiet: true },
  };

  try {
    const data = await s3.send(new DeleteObjectsCommand(delParams));
    return true;
  } catch (err) {
    console.error("ERROR : ", err.name);
    return false;
  }
};
