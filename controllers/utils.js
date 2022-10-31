const { AWS_BUCKET_NAME } = process.env;

const getAmazonS3Url = (url, key) => {
    let tmpUrl = url.split(AWS_BUCKET_NAME + '.');
    if (tmpUrl.length == 2) {
        const s3Url = tmpUrl[1].split('/' + key);
        if (s3Url.length >= 1) {
            return `https://${s3Url[0]}/${key}`;
        }
    }
    return url;
}

module.exports = getAmazonS3Url;
