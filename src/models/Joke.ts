import mongoose, { Document, Schema } from 'mongoose';

interface IJoke extends Document {
    content: string;
    user: mongoose.Schema.Types.ObjectId;
}

const jokeSchema = new Schema<IJoke>({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Joke = mongoose.model<IJoke>('Joke', jokeSchema);
export default Joke;
