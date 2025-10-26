import express from 'express';
import cors, { CorsOptions } from 'cors';
import routes from './routes/index.route';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://webbe-b4zv.onrender.com',
  'https://webfe-static.onrender.com',
  'https://webfe-8xdu.onrender.com',
  'https://webbe-bz2v.onrender.com',
];

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Không được phép bởi chính sách CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
  ],
  exposedHeaders: [
    'Content-Length',
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function (body) {
    if (body?.token) {
      res.cookie('token', body.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });
      delete body.token;
    }
    return oldJson.call(this, body);
  };
  next();
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});