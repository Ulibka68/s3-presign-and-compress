#!/bin/sh
#export $(grep -v '^#' ./.env | xargs -d '\n')
# deploy s3-compress-after-presign

./s3-compress-after-presign/deploy/deploy.sh