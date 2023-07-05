import multer from "multer";
import path from "path";
const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: (req,res, cb) => {
        if(req.files.photo){
            if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
                cb(null, path.join(__dirname, "public/images"));
            }
        }
    }
});

export const profile_pic = multer({
    storage,
}).fields([
    {
        name: "photo". maxcount:1
    }
])