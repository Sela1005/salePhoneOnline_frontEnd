# TechSpherePhone 📱✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Node.js Version](https://img.shields.io/badge/Node.js-v14%2B-blue.svg)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.2-green.svg)](https://www.mongodb.com/)  
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)  
[![Vite](https://img.shields.io/badge/Vite-4.0-ffb13b.svg)](https://vitejs.dev/)

---

## 🌟 Tổng Quan

**TechSpherePhone** là ứng dụng web bán điện thoại toàn diện được xây dựng với:
- **Frontend:** React ⚛️ (sử dụng Vite)
- **Backend:** Node.js 🚀 với Express
- **Database:** MongoDB 🍃

Ứng dụng cung cấp các chức năng:
- **Xác thực người dùng:** Đăng nhập qua tài khoản thông thường và đăng nhập bằng Google.
- **Thanh toán:** Hỗ trợ thanh toán trực tiếp (COD) và qua PayPal.
- **Tra cứu đơn hàng:** Người dùng có thể theo dõi trạng thái đơn hàng.
- **Quản trị viên:** Quản lý sản phẩm, đơn hàng, doanh thu và người dùng.

---

## 🚀 Tính Năng Nổi Bật

- **Xác thực:** 
  - Đăng ký, đăng nhập thông thường với JWT.
  - Đăng nhập bằng Google OAuth 2.0.
- **Sản phẩm:** Hiển thị danh sách sản phẩm, chi tiết sản phẩm với hình ảnh sắc nét.
- **Giỏ hàng & Đặt hàng:** 
  - Quản lý giỏ hàng và đặt hàng.
  - Thanh toán linh hoạt với **COD** và **PayPal**.
- **Tra cứu đơn hàng:** Người dùng có thể kiểm tra trạng thái đơn hàng của mình.
- **Dashboard quản trị:** 
  - Quản lý sản phẩm, đơn hàng, doanh thu và người dùng.
  - Báo cáo và phân tích doanh thu.

---

## 🔧 Công Nghệ Sử Dụng

- **Frontend:** React, Vite, React Router, (Redux hoặc Context API)
- **Backend:** Node.js, Express
- **Database:** MongoDB (với Mongoose ORM)
- **Xác thực:** JSON Web Token (JWT) và Google OAuth 2.0
- **Thanh toán:** Tích hợp COD và PayPal
- **Realtime (tuỳ chọn):** WebSocket

---

## 🛠️ Cài Đặt & Chạy Ứng Dụng

### Yêu Cầu Hệ Thống

- **Node.js:** v14+ ([Download Node.js](https://nodejs.org/))
- **MongoDB:** Cài đặt cục bộ hoặc sử dụng [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**

### Các Bước

1. **Clone repository**:
   ```bash
   git clone https://github.com/Sela1005/salePhoneOnline_frontkEnd.git
   cd salePhoneOnline_backEnd
2. **Cài đặt dependencies**:
    ```bash
   npm install
3. **Thiết lập biến môi trường**:
    ```bash
    PORT=5000
    MONGO_DB=<chuỗi_kết_nối_mongodb_của_bạn>
    ACCESS_TOKEN=<access_token>
    REFRESH_TOKEN=<refresh_token>
    CLIENT_ID=<client_id>
    GOOGLE_CLIENT_ID=<google_client_id>
    SECRET_KEY=<secret_key>
    ACCESS_KEY=<access_key>
    FRONTEND_URL=https://frontend-salephones.vercel.app
4. **Chạy server**:
    ```bash
    npm start


## 🤝 Đóng Góp
Chào mừng mọi ý kiến đóng góp từ cộng đồng!

## 📞 Liên Hệ
Nếu có bất kỳ câu hỏi hoặc góp ý nào, hãy liên hệ qua email:
Email: khoikhoi0911@gmail.com
 
