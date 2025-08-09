# Firebase Authentication Setup

## 🔥 URGENT: Fix Configuration Error

You're getting "auth/configuration-not-found" error. Follow these steps:

### 1. Enable Email/Password Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **genz-wallet-ff649**
3. Click **"Authentication"** in the left sidebar
4. Click **"Get started"** if you haven't already
5. Go to **"Sign-in method"** tab
6. Click on **"Email/Password"**
7. **Toggle ON** "Enable"
8. Click **"Save"**

### 2. Verify Project Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"**
3. Make sure your web app is listed
4. If not, click **"Add app"** → **Web app**
5. Register with name: **"genz-wallet-web"**

### 3. Check Configuration Values
Your current config in `firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyA_Szgk94MddbIuZGxAp2i3lPOK7Uh2JWw",
  authDomain: "genz-wallet-ff649.firebaseapp.com",
  projectId: "genz-wallet-ff649",
  storageBucket: "genz-wallet-ff649.firebasestorage.app",
  messagingSenderId: "86564029473",
  appId: "1:86564029473:web:7fa86a78e1b2df63220f60"
};
```

**Verify these match your Firebase project settings exactly.**

### 4. Test Authentication
After enabling Email/Password auth:
1. Refresh your app
2. Try signing up again
3. The error should be gone

## Quick Setup for Demo

### 1. Create Firebase Project ✅ (DONE)
- Project: genz-wallet-ff649 ✅

### 2. Enable Authentication ⚠️ (NEEDS ATTENTION)
- Go to Authentication → Sign-in method
- Enable Email/Password provider

### 3. Get Configuration ✅ (DONE)
- Config is already in firebase.ts

### 4. Test Authentication ⚠️ (NEEDS ATTENTION)
- Enable Email/Password auth first
- Then test signup/signin

## Features Implemented
- ✅ User registration with email/password
- ✅ User sign in with email/password
- ✅ Protected dashboard route
- ✅ User profile display (name/email)
- ✅ Logout functionality
- ✅ Loading states
- ✅ Error handling
- ✅ Redirect to signin if not authenticated

## Demo Flow
1. **Signup**: Create new account with name, email, phone, password
2. **Signin**: Login with email and password
3. **Dashboard**: Protected route showing user info and logout button
4. **AI Features**: All existing AI functionality preserved
5. **Logout**: Sign out and redirect to signin page

## For Judges Demo
- Show the signup process
- Demonstrate signin functionality
- Show protected dashboard with user info
- Test logout and redirect
- Highlight the AI features still working
- Show Nigerian Pidgin support in AI responses
