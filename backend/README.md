# FoodByMe Backend

Express.js backend server for the FoodByMe food delivery application.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

This will install:
- express - Web server
- cors - Cross-origin requests
- bcryptjs - Password encryption
- jsonwebtoken - Authentication tokens
- dotenv - Environment variables
- body-parser - Parse request data

### 2. Start the Server
```bash
npm run dev
```

Server will run on: **http://localhost:<PORT>** (from `backend/.env`)

### 3. Test the Server
Open browser and visit:
- http://localhost:5001/ - Should show "FoodByMe API Server"
- http://localhost:5001/api/health - Health check
- http://localhost:5001/api/restaurants - Restaurant list

## API Endpoints

### Public Endpoints
- `GET /` - Server status
- `GET /api/health` - Health check
- `POST /api/auth/signup` - Request signup OTP (mobile SMS)
- `POST /api/auth/signup/verify-otp` - Verify OTP and create user
- `POST /api/auth/signup/resend-otp` - Resend signup OTP
- `POST /api/auth/login` - Login user
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID

### Protected Endpoints (Require JWT Token)
- `POST /api/orders/place-order` - Place order
- `GET /api/orders/my-orders` - Get user orders

## Environment Variables

Create `.env` file (already created):
```
PORT=5001
JWT_SECRET=foodbyme_secret_key_2026
NODE_ENV=development
DEFAULT_COUNTRY_CODE=+91
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ALLOW_DEV_OTP_FALLBACK=false
```

### Twilio Setup (Real Mobile OTP)
1. Create a Twilio account.
2. In Twilio console, create a **Verify Service**.
3. Add your phone number as a verified recipient (for trial accounts).
4. Put `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_VERIFY_SERVICE_SID` in `backend/.env`.
5. Restart backend server.
6. Keep `ALLOW_DEV_OTP_FALLBACK=false` for real OTP-only flow.

If Twilio config is missing and fallback is disabled, signup OTP requests fail by design.

### Cross-Device Requirement
For OTP and login from your mobile or any other device:
1. Backend must be reachable from that device (deployed server or same LAN IP, not localhost).
2. Frontend must call that reachable backend URL via `VITE_API_URL`.
3. CORS should include your frontend origin using `CORS_ORIGIN` in backend env.

## Project Structure
```
backend/
├── data/
│   └── restaurants.json    # Restaurant data
├── middleware/
│   └── auth.js            # JWT authentication
├── routes/
│   ├── auth.js           # Signup/Login
│   ├── health.js         # Health check
│   ├── orders.js         # Order management
│   └── restaurants.js    # Restaurant endpoints
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
└── server.js           # Main server file
```

## Testing

### Using Browser
Visit: http://localhost:5173/test-connection

### Using curl
```bash
curl http://localhost:5001/api/health
curl http://localhost:5001/api/restaurants
```

## Notes
- Users are persisted in `backend/data/users.json` for local/dev use
- In production, replace with a real database (MongoDB, PostgreSQL, etc.)
- JWT tokens expire after 24 hours
- OTP is sent via Twilio Verify SMS when configured.
- In production, SMS OTP config is required.
