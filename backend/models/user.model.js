import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: { type: String, require: true, trim: true, unique: true },
    fullName: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true, minLength: 6 },
    email: { type: String, require: true, trim: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: []}],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: []}],
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    bio: { type: String, default: ""},
    link: { type: String, default: ""},
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "POST",
            default: []
        }
    ]
}, { timestamps: true });


userSchema.pre("save", async function(next) {
    try {
        if(this.isModified("password")) {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt)
        }
        next();
    } catch (error) {
        throw error;
    }
});

userSchema.methods.isPasswordValid = async function(plainPassword) {
    try {
        return await bcrypt.compare(plainPassword, this.password || "");
    } catch (error) {
        throw error;
    }
}

const UserModel = mongoose.model("User", userSchema);

export default UserModel;