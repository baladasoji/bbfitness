aws s3 sync ../docs/every-move-counts/build s3://www.everymovecounts.dk/ 
aws s3 website s3://www.everymovecounts.dk/ --index-document index.html --error-document index.html
aws s3api put-bucket-policy --bucket www.everymovecounts.dk --policy file://emc-policy.json
