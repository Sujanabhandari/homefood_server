const getAmazonS3Url = require('./utils');
const { AWS_BUCKET_NAME } = process.env;

let testUrl = "https://homemadeuploads.homemadeuploads.s3.eu-central-1.amazonaws.com/1667202210126.jpeg";
let testKey = "1667202210126.jpeg";
let correctUrl = "https://homemadeuploads.s3.eu-central-1.amazonaws.com/1667202210126.jpeg";
let bucket_name = "homemadeuploads";

test('returns correct url for duplicate bucket name in the url and correct key', () => {
    expect(getAmazonS3Url(testUrl, testKey, bucket_name)).toBe(correctUrl);
});

test('returns correct url for given url and key', () => {
    testUrl = "https://homemadeuploads.s3.eu-central-1.amazonaws.com/1667202210126.jpeg";
    expect(getAmazonS3Url(testUrl, testKey, bucket_name)).toBe(correctUrl);
});

test('returns false url for wrong url and key', () => {
    testUrl = "https://s3homemadeuploads.s3.eu-central-1.amazonaws.com/1667202210126.jpeg";
    expect(() => {
        getAmazonS3Url(testUrl, testKey, bucket_name);
    }).toThrow(new Error('The Url is incorrect.'));
});

test('test for different keys in url and key variable', () => {
    testUrl = "https://homemadeuploads.homemadeuploads.s3.eu-central-1.amazonaws.com/16672022.jpeg";
    expect(() => {
        getAmazonS3Url(testUrl, testKey, bucket_name);
    }).toThrow(new Error('The key in the url and the passed key does not match.'));
});

test('returns true url for diffrent bucket zone', () => {
    testUrl = "https://homemadeuploads.s3.asia-central-1.amazonaws.com/1667202210126.jpeg";
    correctUrl = "https://homemadeuploads.s3.asia-central-1.amazonaws.com/1667202210126.jpeg";
    expect(getAmazonS3Url(testUrl, testKey, bucket_name)).toBe(correctUrl);
});

test('returns true url for different bucket name', () => {
    testUrl = "https://bhandari.s3.asia-central-1.amazonaws.com/1667202210126.jpeg";
    correctUrl = "https://bhandari.s3.asia-central-1.amazonaws.com/1667202210126.jpeg";
    bucket_name = "bhandari";
    expect(getAmazonS3Url(testUrl, testKey, bucket_name)).toBe(correctUrl);
});

test('returns correct url without passing bucket name', () => {
    testUrl = `https://${AWS_BUCKET_NAME}.${AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com/1667202210126.jpegz`;
    correctUrl = `https://${AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com/1667202210126.jpeg`;
    expect(getAmazonS3Url(testUrl, testKey)).toBe(correctUrl);
});
