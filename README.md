# 🔐 Firebase Auth Demo

A simple React app that demonstrates Firebase Authentication with multiple OAuth providers — including Google, Microsoft, GitHub, and Yahoo.

> Built with React, Firebase, React Router, and React Hot Toast.

![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow)
![React](https://img.shields.io/badge/React-18%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- Sign in with:
  - ✅ Google
  - ✅ Microsoft
  - ✅ GitHub
  - ✅ Yahoo
- View user profile info (name, email, photo)
- Sign out
- React Context for auth state
- Toast notifications for actions

---

## 📦 Tech Stack

- React 18+
- Firebase Auth (v12+)
- React Router DOM (v7)
- React Hot Toast for UX
- CRA (Create React App) boilerplate

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/firebase-auth-demo.git
cd firebase-auth-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Firebase config

Create a `.env` file in the root with the following:

```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_FIREBASE_CLIENT_ID_google=...
REACT_APP_FIREBASE_CLIENT_ID_github=...
REACT_APP_FIREBASE_CLIENT_ID_microsoft=...
REACT_APP_FIREBASE_CLIENT_ID_yahoo=...
```

(Adjust env var names as per your implementation.)

### 4. Start the app

```bash
npm start
```

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Firebase Docs](https://firebase.google.com/docs/auth)
- [React Docs](https://reactjs.org)
- [Create React App](https://create-react-app.dev/)

---

📖 [View Setup Guide](docs/SETUP.md)  
📊 [View Project Status](docs/PROJECT_STATUS.md)
🤝 [View Contributing Guidelines](docs/CONTRIBUTING.md)
