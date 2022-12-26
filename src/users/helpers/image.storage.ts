import { diskStorage } from 'multer';

import fs = require('fs');
const FileType = require('file-type')

// Must be imported in this format
import path = require('path');

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];


export const saveImageToStorage = {
  storage: diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const fileExtenstion: string = path.extname(file.originalname);
      const fileName: string = uniqueName() + fileExtenstion;
      cb(null, fileName);
    }
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  }
}

export const isFileExtensionSafe =
  async (fullFilePath: string): Promise<boolean> => {

    return await FileType.fromFile(fullFilePath)
      .then(
        (fileExtensionAndMimeType: { ext: validFileExtension, mime: validMimeType }) => {

          if (!fileExtensionAndMimeType) return false;

          const isFileTypeLegit = validFileExtensions.includes(fileExtensionAndMimeType.ext);
          const isMimeTypeLegit = validMimeTypes.includes(fileExtensionAndMimeType.mime);
          const isFileLegit = isFileTypeLegit && isMimeTypeLegit;
          return isFileLegit;
        })
  }

export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlink(fullFilePath, () => { });
  } catch (error) {
    console.error(error)
  }
}

function uniqueName() {
  return (Math.random() * Math.pow(36, 6) | 0).toString(36);
}

