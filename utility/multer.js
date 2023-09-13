import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now());
    }
});
// brand logo
export const BrandLogo = multer({ storage: storage }).single("logo");
