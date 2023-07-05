import bcrypt from "bcryptjs";

/**
 * make has and salt
 */

export const makeHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}