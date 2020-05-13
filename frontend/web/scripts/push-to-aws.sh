#!/usr/bin/env bash

INPUT_FOLDER="./public"
OUTPUT_FOLDER="/home/$AWS_USER/samsite/frontend/web/public"

echo '**** REMOVING OLD PUBLIC FOLDER ****'
ssh -o StrictHostKeyChecking=no -i ~/.ssh/$SAMSITE_KEY $AWS_USER@$AWS_HOST "rm -rfv $OUTPUT_FOLDER"
echo '~ DONE ~'
echo ''
echo '**** COPYING NEW FILES ACROSS ****'
scp -o StrictHostKeyChecking=no -i ~/.ssh/$SAMSITE_KEY -r $INPUT_FOLDER $AWS_USER@$AWS_HOST:$OUTPUT_FOLDER
echo '~ DONE ~'
