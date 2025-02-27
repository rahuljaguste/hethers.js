// const { createHash } = require("crypto");
// import fs from "fs";

// import AWS from 'aws-sdk';

import {createRelease} from "../github";
import { publishAll, getPublishOptions } from "../npm";

const forcePublish = (process.argv.slice(2).indexOf("--publish") >= 0);

/*

type PutInfo = {
    ACL: "public-read";
    Body: string | Buffer;
    Bucket: string;
    ContentType: string;
    Key: string;
}

export function putObject(s3: AWS.S3, info: PutInfo): Promise<{ name: string, hash: string }> {
    return new Promise((resolve, reject) => {
        s3.putObject(info, function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve({
                    name: info.Key,
                    hash: data.ETag.replace(/"/g, '')
                });
            }
        });
    });
}

export function invalidate(cloudfront: AWS.CloudFront, distributionId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudfront.createInvalidation({
            DistributionId: distributionId,
            InvalidationBatch: {
                CallerReference: `${ USER_AGENT }-${ parseInt(String((new Date()).getTime() / 1000)) }`,
                Paths: {
                    Quantity: 1,
                    Items: [
                        "/\*"
                    ]
                }
            }
        }, function(error, data) {
            if (error) {
                console.log(error);
                return;
            }
            resolve(data.Invalidation.Id);
        });
    });
}

*/

(async function() {

    const {publishNames} = await getPublishOptions();

    await publishAll('manual');

    if (publishNames.indexOf("hethers") >= 0 || forcePublish) {
        await createRelease('manual');

/*
        const minorVersion = patchVersion.split(".").slice(0, 2).join(".")

        const awsAccessId = await config.get("aws-upload-scripts-accesskey");
        const awsSecretKey = await config.get("aws-upload-scripts-secretkey");

        // Upload libs to the CDN (as hethers-v5.1 and hethers-5.1.x)
        {
            const bucketNameLib = await config.get("aws-upload-scripts-bucket");
            const originRootLib = await config.get("aws-upload-scripts-root");

            const bucketNameCors = await config.get("aws-upload-scripts-bucket-cors");
            const originRootCors = await config.get("aws-upload-scripts-root-cors");

            const s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                accessKeyId: awsAccessId,
                secretAccessKey: awsSecretKey
            });

            // Upload the libs to hethers-v5.1 and hethers-5.1.x
            const fileInfos: Array<{ bucketName: string, originRoot: string, filename: string, key: string, suffix?: string }> = [
                // The CORS-enabled versions on cdn-cors.hethers.io
                {
                    bucketName: bucketNameCors,
                    originRoot: originRootCors,
                    suffix: "-cors",
                    filename: "packages/hethers/dist/hethers.esm.min.js",
                    key: `hethers-${ patchVersion }.esm.min.js`
                },
                {
                    bucketName: bucketNameCors,
                    originRoot: originRootCors,
                    suffix: "-cors",
                    filename: "packages/hethers/dist/hethers.umd.min.js",
                    key: `hethers-${ patchVersion }.umd.min.js`
                },

                // The non-CORS-enabled versions on cdn.hethers.io
                {
                    bucketName: bucketNameLib,
                    originRoot: originRootLib,
                    filename: "packages/hethers/dist/hethers.esm.min.js",
                    key: `hethers-${ patchVersion }.esm.min.js`
                },
                {
                    bucketName: bucketNameLib,
                    originRoot: originRootLib,
                    filename: "packages/hethers/dist/hethers.umd.min.js",
                    key: `hethers-${ patchVersion }.umd.min.js`
                },
                {
                    bucketName: bucketNameLib,
                    originRoot: originRootLib,
                    filename: "packages/hethers/dist/hethers.esm.min.js",
                    key: `hethers-${ minorVersion }.esm.min.js`
                },
                {
                    bucketName: bucketNameLib,
                    originRoot: originRootLib,
                    filename: "packages/hethers/dist/hethers.umd.min.js",
                    key: `hethers-${ minorVersion }.umd.min.js`
                },
            ];

            for (let i = 0; i < fileInfos.length; i++) {
                const { bucketName, originRoot, filename, key, suffix } = fileInfos[i];
                await putObject(s3, {
                    ACL: "public-read",
                    Body: fs.readFileSync(resolve(filename)),
                    Bucket: bucketName,
                    ContentType: "application/javascript; charset=utf-8",
                    Key: (originRoot + key)
                });
                console.log(`${ colorify.bold("Uploaded:") } https://cdn${ suffix || "" }.hethers.io/lib/${ key }`);
            }
        }

        // Flush the edge caches
        {
            const distributionId = await config.get("aws-upload-scripts-distribution-id");

            const cloudfront = new AWS.CloudFront({
                //apiVersion: '2006-03-01',
                accessKeyId: awsAccessId,
                secretAccessKey: awsSecretKey
            });
            const invalidationId = await invalidate(cloudfront, distributionId);
            console.log(`${ colorify.bold("Invalidating Edge Cache:") } ${ invalidationId }`);
        }
 */
    }
})();
