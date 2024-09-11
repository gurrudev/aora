import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';
import { env } from '@/env.local';

// Init your React Native SDK 
const client = new Client();

client
    .setEndpoint(env.APPWRITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(env.APPWRITE_PROJECT_ID) // Your project ID
    .setPlatform(env.APPWRITE_PLATFORM) // Your application ID or bundle ID.

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
            env.APPWRITE_DATABASE_ID,
            env.APPWRITE_USER_COLLECTION_ID,
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