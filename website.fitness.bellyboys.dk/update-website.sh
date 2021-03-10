aws s3 sync ../docs/public/ s3://fitness.bellyboys.dk/ 
aws s3 website s3://fitness.bellyboys.dk/ --index-document index.html --error-document error.html
aws s3api put-bucket-policy --bucket fitness.bellyboys.dk --policy file://bbfitness-policy.json
