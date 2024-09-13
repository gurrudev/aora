import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { env } from '@/env.local';

// Init your React Native SDK 
const client = new Client();
const { 
    APPWRITE_DATABASE_ID, 
    APPWRITE_ENDPOINT, 
    APPWRITE_PLATFORM, 
    APPWRITE_PROJECT_ID, 
    APPWRITE_STORAGE_ID, 
    APPWRITE_USER_COLLECTION_ID, 
    APPWRITE_VIDEO_COLLECTION_ID 
} = env

client
    .setEndpoint(APPWRITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(APPWRITE_PROJECT_ID) // Your project ID
    .setPlatform(APPWRITE_PLATFORM) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(String(error))
    }
}

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error
        const avatarsUrl = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_USER_COLLECTION_ID,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarsUrl
            }
        )
        return newUser
    } catch (error) {
        throw new Error(String(error))
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error
        const currentUser = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_USER_COLLECTION_ID,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_VIDEO_COLLECTION_ID
        )
        return posts.documents
    } catch (error) {
        throw new Error(String(error))
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_VIDEO_COLLECTION_ID,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents
    } catch (error) {
        throw new Error(String(error))
    }
}
