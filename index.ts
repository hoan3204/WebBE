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
    // Cho phép các yêu cầu không có origin (như từ ứng dụng di động hoặc curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://webbe-b4zv.onrender.com',
      'https://webfe-static.onrender.com',
      'https://webfe-8xdu.onrender.com',
      'https://webbe-bz2v.onrender.com',
      // Thêm các domain khác nếu cần
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Set the Access-Control-Allow-Origin header to the specific origin
      callback(null, true);
    } else {
      callback(new Error('Không được phép bởi chính sách CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Accept', 
    'Origin', 
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  exposedHeaders: [
    'Content-Length', 
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  credentials: true, // Cho phép gửi cookie qua các domain khác nhau
  preflightContinue: false, // Không tiếp tục xử lý preflight request
  optionsSuccessStatus: 204 // Mã trạng thái thành công cho OPTIONS request
}));

// Cho phép gửi data lên dạng json
app.use(express.json());

// Cấu hình cookie
app.use(cookieParser());

// Cấu hình bảo mật cho cookie
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  next();
});

// Thiết lập đường dẫn
app.use("/", routes);

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});