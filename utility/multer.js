import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now());
    }
});
// brand logo
export const BrandLogo = multer({ storage: storage }).single("logo");

// category logo
export const CategoryLogo = multer({ storage: storage }).single("cat_photo");
// product photo
export const ProductPhoto = multer({ storage: storage }).array("productPhoto");
