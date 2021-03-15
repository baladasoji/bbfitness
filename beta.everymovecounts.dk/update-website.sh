aws s3 sync ../docs/every-move-counts/build s3://beta.everymovecounts.dk/ 
aws s3 website s3://beta.everymovecounts.dk/ --index-document index.html --error-document index.html
aws s3api put-bucket-policy --bucket beta.everymovecounts.dk --policy file://emc-policy.json
