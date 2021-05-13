chmod 777 ./s3-compress-after-presign/deploy/t.sh

chmod 777 ./s3-compress-after-presign/deploy/first-setup-func.sh
chmod 777 ./s3-compress-after-presign/deploy/deploy.sh
./s3-compress-after-presign/deploy/deploy.sh

chmod 777 ./s3-presign/deploy/first-setup-func.sh
chmod 777 ./s3-presign/deploy/deploy.sh

chmod 777 ./s3-delete/deploy/first-setup-func.sh
./s3-delete/deploy/first-setup-func.sh
chmod 777 ./s3-delete/deploy/deploy.sh
./s3-delete/deploy/deploy.sh

-




для запуска ts-node нужно дополнить PATH


echo $PATH

export PATH=$PATH:export PATH=$PATH:/root/_prj/yandex/s3-presign-and-compress/s3-compress-after-presign/node_modules/.bin

cd s3-compress-after-presign  

ts-node ./src/test/testcompress.ts

ts-node ./src/test/generatePictName.ts

# Пример upload
https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/

https://github.com/aws-samples/happy-path/

https://github.com/aws-samples/amazon-s3-presigned-urls-aws-sam


https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/

https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/javascriptv3/example_code/s3/photoExample/src/s3_PhotoExample.html

https://docs.aws.amazon.com/AmazonS3/latest/userguide/copy-object.html

copyobject
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property