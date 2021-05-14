#!/bin/sh
# скопировать VUE на SMF
rm -r /mnt/f/OpenServer/domains/woodcraftsman//Themes/japanese-red-rsp/scripts/css
rm -r /mnt/f/OpenServer/domains/woodcraftsman//Themes/japanese-red-rsp/scripts/js

cp -r ./s3-vue-upload/dist/css /mnt/f/OpenServer/domains/woodcraftsman//Themes/japanese-red-rsp/scripts/css
cp -r ./s3-vue-upload/dist/js /mnt/f/OpenServer/domains/woodcraftsman//Themes/japanese-red-rsp/scripts/js
cp ./s3-vue-upload/dist/module-names.js /mnt/f/OpenServer/domains/woodcraftsman//Themes/japanese-red-rsp/scripts/js
cp ./s3-vue-upload/src/test/vue-load.js /mnt/f/OpenServer/domains/woodcraftsman//Themes/japanese-red-rsp/scripts/js