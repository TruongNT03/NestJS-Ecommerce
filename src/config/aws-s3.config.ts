import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  accessKey: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  bucketName: process.env.BUCKET_NAME,
  region: process.env.REGION,
  iamId: process.env.IAM_ID,
  iamAlias: process.env.IAM_ALIAS,
  cloudfrontUrl: process.env.CLOUDFRONT_URL,
}));
