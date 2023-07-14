import env from "../util/validateEnv";

import mongoose from 'mongoose'

const uri: string = env.MONGODB_URI || 'mongodb://localhost:27017/noteapp';

export default uri;