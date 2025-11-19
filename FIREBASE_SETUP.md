# Firebase Setup Instructions

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## 2. Enable Firestore Database

1. In your Firebase project, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (for development) or set up security rules
4. Choose a location for your database

## 3. Get Your Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 4. Set Up Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase configuration.

## 5. Set Up Firestore Security Rules (Recommended)

Go to Firestore Database > Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to tasks collection
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow read/write access to history collection
    match /history/{historyId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note:** For development/testing, you can use:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Warning:** The above rule allows anyone to read/write. Only use for development!

## 6. Firestore Collections Structure

The app uses two collections:

### `tasks` collection
Each document contains:
- `templateId` (string)
- `name` (string)
- `description` (string | null)
- `icon` (string | null)
- `category` (string)
- `domain` (string: 'home' | 'car' | 'pet' | 'life')
- `frequency` (object)
- `cost` (number | null)
- `notes` (string | null)
- `brandModel` (string | null)
- `lastCompleted` (Timestamp | null)
- `nextDueDate` (Timestamp)
- `createdAt` (Timestamp)
- `notificationEnabled` (boolean)
- `customFields` (object)

### `history` collection
Each document contains:
- `taskInstanceId` (string)
- `taskName` (string)
- `category` (string)
- `domain` (string)
- `completedAt` (Timestamp)
- `notes` (string | null)
- `cost` (number | null)

## 7. Create Firestore Indexes (if needed)

If you see index errors in the console, Firestore will provide a link to create the required indexes automatically.

Common indexes needed:
- `tasks` collection: `domain` (ascending) + `createdAt` (descending)
- `history` collection: `domain` (ascending) + `completedAt` (descending)

## 8. Test the Connection

1. Start your development server: `npm run dev`
2. The app should connect to Firebase automatically
3. Check the browser console for any Firebase errors

## Troubleshooting

- **"Firebase: Error (auth/configuration-not-found)"**: Make sure your `.env.local` file exists and has all required variables
- **"Permission denied"**: Check your Firestore security rules
- **"Index required"**: Click the link in the error to create the required index
- **Data not loading**: Check browser console for errors and verify Firebase project ID is correct

