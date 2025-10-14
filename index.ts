import express from 'express';
import cors from "cors";
import routes from "./routes/index.route";
import dotenv from "dotenv";
import { connectDB } from './config/database';
import cookieParser = require('cookie-parser');

// Load biến môi trường
dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

// Kết nối DB
connectDB();

// Cấu hình CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://webbe-b4zv.onrender.com',
      'https://webfe-static.onrender.com',
      'https://webfe-8xdu.onrender.com',
      // Thêm các domain khác nếu cần
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Cho phép gửi cookie
}));

// Cho phép gửi data lên dạng json
app.use(express.json());

// Cấu hình lấy cookie
app.use(cookieParser());

// Thiết lập đường dẫn
app.use("/", routes);

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});