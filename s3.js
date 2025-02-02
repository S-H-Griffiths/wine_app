// // const aws = require("aws-sdk");
// const fs = require("fs");

// let secrets;
// if (process.env.NODE_ENV == "production") {
//     secrets = process.env; // in prod the secrets are environment variables
// } else {
//     secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
// }

// const s3 = new aws.S3({
//     accessKeyId: secrets.AWS_KEY,
//     secretAccessKey: secrets.AWS_SECRET,
// });

// exports.upload = (req, res, next) => {
//     if (!req.file) {
//         console.log("Multer failure");
//         return res.sendStatus(500);
//     }
//     const { filename, mimetype, size, path } = req.file;

//     s3.putObject({
//         Bucket: "spicedling",
//         ACL: "public-read",
//         Key: filename,
//         Body: fs.createReadStream(path),
//         ContentType: mimetype,
//         ContentLength: size,
//     })
//         .promise()
//         .then(() => {
//             fs.unlink(path, () => {});
//             next();
//         })
//         .catch((err) => {
//             // uh oh
//             console.log(err);
//             res.sendStatus(500);
//         });
// };

// exports.deleteImg = (url) => {
//     console.log("trying to get the urls for deletion", url);
//     s3.deleteObject({
//         Bucket: "spicedling",
//         Key: url,
//     })
//         .promise()
//         .then(() => {
//             // next();
//             console.log("success");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
