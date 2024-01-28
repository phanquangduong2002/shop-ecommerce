'use strict'

const {
  uploadImageFromUrl,
  uploadImageFromLocal,
  uploadImageFromLocalFiles,
  uploadImageFromLocalS3
} = require('../services/upload.service')

const { SuccessResponse } = require('../core/success.response')
const { BadRequestError } = require('../core/error.response')

class UploadController {
  uploadFile = async (req, res, next) => {
    new SuccessResponse({
      message: 'Upload file success!',
      metaData: await uploadImageFromUrl()
    }).send(res)
  }

  uploadImageFromLocal = async (req, res, next) => {
    const { file } = req
    if (!file) {
      throw new BadRequestError('File missing')
    }
    new SuccessResponse({
      message: 'Upload file success!',
      metaData: await uploadImageFromLocal({
        path: file.path
      })
    }).send(res)
  }

  uploadImageFromLocalFiles = async (req, res, next) => {
    const { files } = req
    if (!files.length) {
      throw new BadRequestError('File missing')
    }
    new SuccessResponse({
      message: 'Upload file success!',
      metaData: await uploadImageFromLocalFiles({
        files
      })
    }).send(res)
  }

  uploadImageFromLocalS3 = async (req, res, next) => {
    const { file } = req
    if (!file) {
      throw new BadRequestError('File missing')
    }
    new SuccessResponse({
      message: 'Upload file successfully uploaded use S3Client',
      metaData: await uploadImageFromLocalS3({
        file
      })
    }).send(res)
  }
}

module.exports = new UploadController()
