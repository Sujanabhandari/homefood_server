const { AWS_BUCKET_NAME } = process.env;

const getAmazonS3Url = (url, key, bucket_name=AWS_BUCKET_NAME) => {
    const baseUrl = url.match(/s3\..*?.com/gi);
    const passedBucketName = url.match(new RegExp('//' + '(.*)' + '.s3'));
    // Check if the passed bucket name is exactly equal to one or all the words in passedBucketName
    // Example: bucket_name = sujana
    // Then some of the possible cases for passedBucketName are: sujana, sujana.sujana, sujana.sujana.sujana
    // Throw error if one of the word in passedBucketName is not equals to bucket_name
    const bucketNameList = passedBucketName && passedBucketName[1].split(".");
    bucketNameList.forEach(element => {
        if (element !== bucket_name){
            throw 'The Url is incorrect.';
        }
    });
    if (baseUrl.length > 0) {
        return `https://${bucket_name}.${baseUrl[0]}/${key}`; 
    }
    return url;
}

module.exports = getAmazonS3Url;
