# 🚀 Firebase Auth React App — Setup Guide

A React application with Firebase Authentication supporting Google, Microsoft, GitHub, and Yahoo login. Includes protected routes and automatic account linking.

---

## ✨ Features

- 🔐 Multi-provider Authentication:
  - Google
  - Microsoft
  - GitHub
  - Yahoo
- 🛡️ Protected routes (Dashboard only accessible when logged in)
- 🔄 Auto redirection based on authentication state
- 👤 User profile display
- 🍞 Toast notifications for feedback
- 🔗 Account linking for existing accounts
- ⚠️ Robust error handling

---

## 🔧 Setup Instructions

### 1. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable Authentication:
   - Navigate to **Authentication > Sign-in method**
   - Enable:
     - Google
     - Microsoft
     - GitHub
     - Yahoo
   - Add your development and production domains to **Authorized Domains**
4. Get your Firebase config:
   - Go to **Project Settings > General**
   - Under "Your apps", click the web icon (`</>`)
   - Copy the config object

---

### 2. Add Firebase Configuration

#### ✅ Option A: Using `.env.local` (Recommended)

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your Firebase project values:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_FIREBASE_CLIENT_ID_google=...
REACT_APP_FIREBASE_CLIENT_ID_github=...
REACT_APP_FIREBASE_CLIENT_ID_microsoft=...
REACT_APP_FIREBASE_CLIENT_ID_yahoo=...
```

#### 🛠 Option B: Hardcoded config (for quick testing)

Open `src/firebase.js` and replace the config object with your values.

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Run the Application

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🔗 Provider Setup Details

### 🔧 GitHub

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth app:
   - Homepage: `http://localhost:3000`
   - Callback: `https://your-project.firebaseapp.com/__/auth/handler`
3. Add the client ID and secret to Firebase GitHub provider settings

### 🔧 Microsoft

1. Go to [Azure Portal](https://portal.azure.com) > Azure AD > App registrations
2. Register a new app
3. Under **Authentication**, add the redirect URI
4. Copy the App ID to Firebase Microsoft provider settings

### 🔧 Yahoo

1. Use [Yahoo Developer Console](https://developer.yahoo.com/apps/)
2. Register a new app
3. Add redirect URI
4. Add credentials to Firebase Yahoo provider settings

---

## 📁 Project Structure

```
src/
├── assets/               # Assets
├── components/
│   ├── Dashboard.js      # Protected dashboard
│   ├── Dashboard.css
│   ├── Login.js          # Multi-provider login
│   ├── Login.css
│   └── ProtectedRoute.js # Route guard wrapper
├── contexts/
│   └── AuthContext.js    # Firebase Auth context
├── firebase.js           # Firebase app config
├── App.js                # App routing and structure
└── App.css               # Global styles
```

---

## 🚦 Route Behavior

| Path         | Access        | Description                      |
|--------------|---------------|----------------------------------|
| `/`          | Public        | Redirects to `/login`            |
| `/login`     | Public/Auth'd | Redirects to dashboard if signed in |
| `/dashboard` | Auth only     | Protected route                  |

---

## 📣 Usage Flow

1. Visit `/login` and select a provider
2. On success, user is redirected to `/dashboard`
3. If not logged in, dashboard redirects to login
4. User can sign out from dashboard

---

## 🧪 Advanced Error Handling

### 🔗 Account Linking Flow

When signing in with a provider but an account exists with a different one:
1. The app detects the conflict
2. Shows existing provider info
3. Prompts to link accounts
4. Signs in with existing provider
5. Links the new one
6. Completes sign-in flow

### 🔔 Friendly Error Messages

Handles:
- Pop-up blocked/closed
- Network issues
- Too many attempts
- Email already linked to different provider

---

## 🧰 Technologies Used

- React 19.x
- Firebase 12.x
- React Router DOM 7.x
- React Hot Toast
- Plain CSS (can replace with Tailwind or styled-components)

---

📖 Return to the main [README](../README.md).
