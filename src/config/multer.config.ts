import { diskStorage } from 'multer';

export const multerProfileConfig = {
  storage: diskStorage({
    destination: './uploads/profile',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
};
