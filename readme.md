chmod 777 ./s3-compress-after-presign/deploy/t.sh

chmod 777 ./s3-compress-after-presign/deploy/first-setup-func.sh

chmod 777 ./s3-compress-after-presign/deploy/deploy.sh

echo $PATH

export PATH=$PATH:export PATH=$PATH:/root/_prj/yandex/s3-presign-and-compress/s3-compress-after-presign/node_modules/.bin

cd s3-compress-after-presign  
ts-node ./src/test/testcompress.ts
