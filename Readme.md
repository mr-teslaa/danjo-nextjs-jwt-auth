# Django Backend with Next.js Frontend

This repository contains a Django backend and a Next.js frontend. The backend provides user authentication and API management, while the frontend serves as a modern, responsive user interface. The authentication system leverages HttpOnly cookies to securely manage JWT tokens.

## Features

### Backend Features
- **JWT Authentication**: HttpOnly cookies for secure storage of JWT tokens.
- **Social Authentication**: Login with Google and Facebook.
- **Environment-Specific Configuration**: `.env.local` support.
- **REST API**: Powered by Django REST Framework and Djoser.
- **Custom User Model**: Extends the default Django `User`.
- **CORS Support**: Configured for cross-origin requests.
- **Email Integration**: Supports email functionality via Amazon SES.

### Frontend Features
- **Framework**: Built with Next.js 13 for a modern frontend.
- **Global State Management**: Managed using Redux Toolkit.
- **TailwindCSS**: Responsive design with utility-first styling.
- **Toast Notifications**: Real-time feedback with `react-toastify`.
- **Icons and Components**: HeroIcons, Headless UI, and reusable components.

---

## Technologies

### Backend
- Django 5.1.3
- Django REST Framework
- Djoser
- Amazon SES
- SQLite (default, easily switchable to PostgreSQL or other databases)

### Frontend
- Next.js 13
- React 18
- Redux Toolkit
- TailwindCSS
- TypeScript
- React Toastify

---

## Prerequisites

1. Python 3.10+ for the backend.
2. Node.js 14+ and npm/yarn for the frontend.
3. `.env.local` file to store environment variables.

---

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mr-teslaa/djano-nextjs-jwt-auth
cd djano-nextjs-jwt-auth
```

---

### 2. Backend Setup

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables
Create a `.env.local` file in the backend directory with the following variables:

```env
# Django
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000
DOMAIN=your-backend-domain

# Amazon SES
AWS_SES_ACCESS_KEY_ID=your-aws-access-key
AWS_SES_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_SES_REGION_NAME=us-east-1
AWS_SES_FROM_EMAIL=your-email@example.com

# Social Auth
GOOGLE_AUTH_KEY=your-google-client-id
GOOGLE_AUTH_SECRET=your-google-client-secret
SOCIAL_AUTH_FACEBOOK_KEY=your-facebook-app-id
SOCIAL_AUTH_FACEBOOK_SECRET=your-facebook-app-secret
REDIRECT_URLS=http://localhost:3000/auth/callback
```

#### Apply Migrations
```bash
python manage.py migrate
```

#### Run the Development Server
```bash
python manage.py runserver
```

The backend will now run at `http://127.0.0.1:8000`.

---

### 3. Frontend Setup

Navigate to the `frontend` directory and follow these steps:

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start the Development Server
```bash
npm run dev
```

The frontend will now run at `http://localhost:3000`.

---

## JWT HttpOnly Token Authentication Workflow

### Backend Configuration
The backend uses Django REST Framework and Djoser to handle authentication. JWT tokens are stored in HttpOnly cookies to prevent access from JavaScript, enhancing security.

1. **Login Endpoint** (`POST /api/jwt/create/`):
   - Accepts username/email and password.
   - Issues access and refresh tokens.
   - Sets the access token in an HttpOnly cookie.

2. **Refresh Token Endpoint** (`POST /api/jwt/refresh/`):
   - Uses the refresh token to issue a new access token.
   - Updates the access token in the HttpOnly cookie.

3. **Logout Endpoint** (`POST /api/logout/`):
   - Clears the HttpOnly access token cookie.

### Frontend Implementation
The frontend interacts with the backend using Redux Toolkit for state management and Axios for API requests. Key details:

1. **Access Token Management**:
   - The `axios` client includes credentials (`withCredentials: true`) to handle HttpOnly cookies.
   - Redux Toolkit stores the app state but not the JWTs for enhanced security.

2. **API Middleware**:
   - Automatically refreshes the token if access is expired, using the `refresh` endpoint.
   - Handles logout by dispatching an action to clear the user's state.

3. **Authentication Flow**:
   - Users log in via a secure form, triggering a Redux action.
   - On logout, a backend request clears the JWT cookie.

---

## API Endpoints

### Authentication
- `POST /api/jwt/create/`: Obtain JWT tokens via username/email and password.
- `POST /api/jwt/refresh/`: Refresh JWT tokens using the refresh token.
- `POST /api/logout/`: Logout and clear HttpOnly cookies.

### Social Authentication
- `POST /api/o/<provider>/`: Login via social providers like Google or Facebook.

---

## Folder Structure

### Backend
```
backend/
├── backend/                  # Main Django project
│   ├── settings.py           # Django settings
│   ├── urls.py               # Root URL configuration
├── users/                    # Custom user app
│   ├── urls.py               # API URLs for users
│   ├── views.py              # API views for authentication
├── manage.py                 # Django management script
└── requirements.txt          # Backend dependencies
```

### Frontend
```
frontend/
├── pages/                    # Next.js pages
├── components/               # Reusable React components
├── redux/                    # Redux Toolkit slices and store
├── styles/                   # CSS/SCSS styles
├── public/                   # Static assets
└── package.json              # Frontend dependencies
```

---

## Deployment

### Backend
1. Use Gunicorn or uWSGI for serving Django.
2. Set up HTTPS with Nginx or Apache.
3. Configure `.env.local` for production.

### Frontend
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Serve the build files using platforms like Vercel or a Node.js server.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
