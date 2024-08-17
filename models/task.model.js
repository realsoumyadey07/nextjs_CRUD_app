import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema({
    title: String,
    description: String
}, {timestamps: true});

export const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);
