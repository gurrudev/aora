import { Client } from 'react-native-appwrite';
import { config } from 'dotenv';
config();

export const appwriteConfig = {
    endpoint: process.env.APPWRITE_ENDPOINT,
    platform: process.env.APPWRITE_PLATFORM,
    projectId: process.env.APPWRITE_PROJECT_ID,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID,
    videoCollectionId: process.env.APPWRITE_VIDEO_COLLECTION_ID,
    storageId: process.env.APPWRITE_STORAGE_ID
};

// Init your React Native SDK 
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint || '') // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId || '') // Your project ID
    .setPlatform(appwriteConfig.platform || '') // Your application ID or bundle ID.
;