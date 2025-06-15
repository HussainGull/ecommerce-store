import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";


// Generating Access & Refresh Tokens

const generateAccessAndRefreshToken = async (userId) => {

    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, error?.message || 'Something went wrong while Generating Access & Refresh Token ');
    }

};


// Register User

const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, password} = req.body;

    if ([fullName, email, password].some((field) => field?.trim === "")) {
        throw new ApiError(400, 'All fields are required');
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new ApiError(409, 'User already exists');
    }

    const user = await User.create({
        fullName, email, password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, 'Error Via Registering User');
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully !"));

});

// Login User

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        throw new ApiError(404, 'Email is required');
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new ApiError(404, 'Please Register First!');
    }

    const isPasswordValid = await User.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, 'Password Invalid!');
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true, secure: true
    };

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            status: 200, user: loggedInUser, accessToken, refreshToken, message: "User Logged Successfully!"
        });

});


// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, {
        new: true
    });

    const options = {
        httpOnly: true, secure: true
    }

    return res
        .status(200)
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .json(new ApiResponse(200, logoutUser, "User Logout Successfully !"));

});


// Refresh AccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, 'Refresh Token is required');
    }

    try {
        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, 'Invalid Refresh Token');
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, 'Invalid Refresh Token');
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id);
        user.refreshToken = newRefreshToken;
        await user.save({validateBeforeSave: false});

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', newRefreshToken, options)
            .json(new ApiResponse(200, {
                accessToken,
                refreshToken: newRefreshToken
            }, 'Access Token Refreshed Successfully!'));

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Expired or Invalid Refresh Token');
        }
        throw new ApiError(500, 'Internal Server Error');
    }
});


// Update Password
const updatePassword = asyncHandler(async (req, res) => {
    const {newPassword, oldPassword} = req.body;

    if (!(newPassword || oldPassword)) {
        throw new ApiError(401, 'Password is required');
    }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid Password');
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Password Changed Successfully !'))

});


// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User Fetched Successfully !"))

});

// Update User Account Details
const updateAccountDetails = asyncHandler(async (req, res) => {
    const {fullName, email} = req.body;

    if (!(fullName || email)) {
        throw new ApiError(401, 'Full Name Or Email is Required !');
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, {
            $set: {
                fullName,
                email
            }
        }, {new: true}
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account Details Updated Successfully !"))

})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updatePassword,
    getCurrentUser,
    updateAccountDetails
}



