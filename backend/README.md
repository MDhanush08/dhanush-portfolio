# Portfolio Backend API

Production-ready NestJS backend service for the developer portfolio. It provides a secure contact form endpoint that stores inquiries in Supabase and emails notifications via Resend, an uptime health check that keeps the free Supabase database warm, and an extensible skeleton module for a future Gemini + RAG AI assistant.

---

## Features

- **Contact Form (`POST /api/contact`)**:
  - Validates inputs strictly with `class-validator` and `class-transformer`.
  - Silent honeypot field (`website`) to neutralise automated spam bots without leaking detection.
  - Resilient submission: records the inquiry in Supabase, dispatches a notification email via Resend, and returns a user-friendly error only if both fail.
  - Rate limited to 5 submissions per 10 minutes per IP.
- **Health & Keep-Alive (`GET /api/health` & `GET /api/health/db`)**:
  - `/api/health` returns process uptime and timestamp for deployment monitoring.
  - `/api/health/db` performs a lightweight query on the `contact_messages` table to prevent free Supabase projects from pausing.
- **AI Assistant Skeleton (`POST /api/assistant/chat`)**:
  - Ready-made skeleton adhering to an `LlmProvider` interface for upcoming Gemini integration with pgvector RAG retrieval.
  - Currently returns 501 Not Implemented with a clean response.
- **Security & Reliability**:
  - Helmet for security headers and disabled `x-powered-by`.
  - Reverse proxy support (`trust proxy` enabled for Render).
  - Strict CORS limited to approved frontend origins.
  - Request body size capped at 20 KB.
  - Centralised exception filter that strips internal details and prevents credential leakage.
  - Interactive Swagger OpenAPI documentation at `/api/docs`.

---

## Local Development

### 1. Prerequisites
- Node.js `>=22.22.3` (Node 24 or 26 recommended)
- npm

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```
*(See the Environment Variables table below for details on each parameter)*

### 4. Run the Development Server
```bash
npm run start:dev
```
The server will boot on `http://localhost:3000/api` (or your configured `PORT`).

---

## Environment Variables

| Variable | Required | Purpose | Example |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | No (default: `development`) | Runtime environment (`development`, `production`, `test`) | `development` |
| `PORT` | No (default: `3000`) | Port on which the HTTP server listens | `3000` |
| `FRONTEND_ORIGIN` | **Yes** | Comma-separated list of allowed browser origins for CORS | `http://localhost:5173,https://myportfolio.com` |
| `SUPABASE_URL` | **Yes** | Supabase project URL | `https://abcdefghijkl.supabase.co` |
| `SUPABASE_SECRET_KEY` | **Yes** | Supabase `service_role` secret key (bypasses RLS server-side; never exposed to clients) | `eyJhbGciOi...` |
| `RESEND_API_KEY` | **Yes** | Outbound transactional mail API key from Resend | `re_123456789_abcdef` |
| `NOTIFY_EMAIL` | **Yes** | Destination email address to receive contact notifications | `your-email@example.com` |
| `MAIL_FROM` | No (default: `Portfolio Contact <onboarding@resend.dev>`) | Sender header used in outgoing notification emails | `Portfolio Contact <onboarding@resend.dev>` |
| `ENABLE_SWAGGER` | No (default: `true` in dev, `false` in prod) | Whether to expose Swagger UI at `/api/docs` | `true` |

> **Important**: The application validates all required environment variables on startup. If any required variable is missing or empty, startup will fail immediately with a readable list of missing keys.

---

## Endpoints

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Returns server status and uptime without querying the database.
- **Example cURL**:
  ```bash
  curl -X GET http://localhost:3000/api/health
  ```
- **Response (200 OK)**:
  ```json
  {
    "status": "ok",
    "uptime": 45.12,
    "timestamp": "2026-11-10T14:30:00.000Z"
  }
  ```

### 2. Database Keep-Alive / Health
- **Endpoint**: `GET /api/health/db`
- **Description**: Executes a fast read (`limit 1`) on Supabase to keep the free project active. Rate limited to 10 requests per minute.
- **Example cURL**:
  ```bash
  curl -X GET http://localhost:3000/api/health/db
  ```
- **Response (200 OK)**:
  ```json
  {
    "status": "ok"
  }
  ```

### 3. Contact Form Submission
- **Endpoint**: `POST /api/contact`
- **Description**: Validates the message, saves it to the database, and dispatches a notification email via Resend. Rate limited to 5 submissions per 10 minutes per IP.
- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Alex Smith",
      "email": "alex.smith@example.com",
      "subject": "Freelance Opportunity",
      "message": "Hi, I came across your portfolio and would like to discuss a project."
    }'
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Thanks! Your message has been sent. I will get back to you soon."
  }
  ```

### 4. AI Assistant Chat (Skeleton)
- **Endpoint**: `POST /api/assistant/chat`
- **Description**: Validates user query and conversation history (up to 10 turns). Returns 501 Not Implemented until Gemini integration is added. Rate limited to 10 requests per minute.
- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/assistant/chat \
    -H "Content-Type: application/json" \
    -d '{
      "message": "What technologies do you work with?"
    }'
  ```
- **Response (501 Not Implemented)**:
  ```json
  {
    "statusCode": 501,
    "error": "Not Implemented",
    "message": "The AI assistant is not available yet."
  }
  ```

### 5. Swagger API Documentation
- **Endpoint**: `GET /api/docs`
- **Description**: Interactive OpenAPI documentation and test interface (accessible when `ENABLE_SWAGGER=true`).

---

## Testing with Postman

1. Open Postman and create a new request.
2. Select **POST** and enter URL: `http://localhost:3000/api/contact` (or your deployed URL).
3. Under the **Headers** tab, ensure `Content-Type` is set to `application/json`.
4. Under the **Body** tab, choose **raw** and format as **JSON**:
   ```json
   {
     "name": "Test Visitor",
     "email": "visitor@example.com",
     "subject": "Postman Test",
     "message": "Testing the portfolio backend contact API."
   }
   ```
5. Click **Send**. You should receive a `201 Created` status with `{ "success": true, ... }`.

---

## Resend Free Plan Note

> **Note on Resend Free Tier**:
> The free Resend sandbox plan (`onboarding@resend.dev`) can **only** deliver emails to the email address used to register the Resend account.
> Set `NOTIFY_EMAIL` in `.env` to that exact registered email. To deliver notifications to a different custom inbox or domain, you must verify your custom sending domain inside the Resend dashboard.

---

## Render Deployment Guide

Deploying the backend as a Web Service on [Render](https://render.com):

1. **Create Web Service**: Connect your GitHub repository to Render.
2. **Settings**:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
3. **Environment Variables**:
   In Render's **Environment** tab, configure:
   - `NODE_VERSION`: `24`
   - `NODE_ENV`: `production`
   - `FRONTEND_ORIGIN`: Your production frontend URL (e.g. `https://your-portfolio.vercel.app`)
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SECRET_KEY`: Your Supabase `service_role` secret key
   - `RESEND_API_KEY`: Your Resend API key
   - `NOTIFY_EMAIL`: Your notification destination email
   - `MAIL_FROM`: `Portfolio Contact <onboarding@resend.dev>` (or your verified domain sender)
   - `ENABLE_SWAGGER`: `false` (or `true` if you wish to expose `/api/docs` publicly)
4. **Health Check Path**:
   - Set to `/api/health` so Render can verify zero-downtime rollouts.
