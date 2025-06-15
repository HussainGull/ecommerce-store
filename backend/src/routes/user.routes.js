import {Router} from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updatePassword, getCurrentUser, updateAccountDetails
} from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register-user').post(registerUser);               // ✅ create
router.route('/login').post(loginUser);                          // ✅ login action

// Secured Routes
router.route('/logout').post(verifyJWT, logoutUser);             // ✅ destructive action
router.route('/refresh-token').post(refreshAccessToken);         // ✅ token exchange

router.route('/update-password').patch(verifyJWT, updatePassword);          // 🟢 PATCH = partial update
router.route('/get-current-user').get(verifyJWT, getCurrentUser);           // 🟢 GET = fetch user data
router.route('/update-account-details').patch(verifyJWT, updateAccountDetails); // 🟢 PATCH = update fields

export {router}