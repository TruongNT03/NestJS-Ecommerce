import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigType } from '@nestjs/config';
import { s3Configuration } from 'src/config';
import { UploadResponseDto } from 'src/common/dto/upload-reponse.dto';
import { preProcessFileName } from 'src/common/utils/pre-process-file-name.util';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly cloudFrontUrl: string;
  private readonly bucketFolder: string;
  constructor(
    @Inject(s3Configuration.KEY)
    private readonly s3Config: ConfigType<typeof s3Configuration>,
  ) {
    this.client = new S3Client({
      region: this.s3Config.region,
      credentials: {
        accessKeyId: this.s3Config.accessKey,
        secretAccessKey: this.s3Config.secretAccessKey,
      },
    });
    this.bucket = this.s3Config.bucketName;
    this.cloudFrontUrl = this.s3Config.cloudfrontUrl;
    this.bucketFolder = 'public';
  }

  async getPresign(
    fileName: string,
    contentType: string,
    bucketFolder?: string,
  ): Promise<UploadResponseDto> {
    fileName = preProcessFileName(fileName);
    bucketFolder
      ? (fileName = `${bucketFolder}/${fileName}`)
      : (fileName = `${this.bucketFolder}/${fileName}`);

    const fileUrl = `${this.cloudFrontUrl}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      ContentType: contentType,
    });

    const presignUrl = await getSignedUrl(this.client, command, {
      expiresIn: 300,
    });

    return {
      presignUrl,
      fileUrl,
    };
  }
}
