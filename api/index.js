import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to mongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.listen(3001, () => {
    console.log('server is running in port 3000..');
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    console.log(err);
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statuscode).json({
        success : false,
        statuscode,
        message,
    })
})