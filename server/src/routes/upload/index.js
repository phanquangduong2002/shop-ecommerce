'use strict'

const express = require('express')
const uploadController = require('../../controllers/upload.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')
const { uploadDisk, uploadMemory } = require('../../configs/multer.config')

const router = express.Router()

// authentication
// router.use(authenticationV2);

/////////////
router.post('/product', asyncHandler(uploadController.uploadFile))
router.post(
  '/product/single',
  uploadDisk.single('file'),
  asyncHandler(uploadController.uploadImageFromLocal)
)
router.post(
  '/product/multiple',
  uploadDisk.array('files', 3),
  asyncHandler(uploadController.uploadImageFromLocalFiles)
)

// upload s3
router.post(
  '/product/bucket',
  uploadMemory.single('file'),
  asyncHandler(uploadController.uploadImageFromLocalS3)
)

module.exports = router
