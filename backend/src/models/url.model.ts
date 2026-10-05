import mongoose from "mongoose"
import nanoid from "nanoid"

const urlSchema = new mongoose.Schema({
    fullPath: {
        type: String,
        required: true,
    },
    shortPath: {
        type: String,
        required: true,
        default: () => nanoid.nanoid().substring(0,10)
    },
    clicks: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export const URLModel = mongoose.model("URL", urlSchema)