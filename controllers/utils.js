const { AWS_BUCKET_NAME } = process.env;

const getAmazonS3Url = (url, key) => {
    const baseUrl = url.match(/s3\..*?.com/gi);
    if (baseUrl.length > 0) {
        return `https://${AWS_BUCKET_NAME}.${baseUrl[0]}/${key}`; 
    }
    return url;
}

module.exports = getAmazonS3Url;
