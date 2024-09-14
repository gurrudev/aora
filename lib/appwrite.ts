import { env } from '@/env.local';
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    ImageGravity,
    Query,
    Storage
} from 'react-native-appwrite';

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
const storage = new Storage(client)

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
            APPWRITE_VIDEO_COLLECTION_ID,
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
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(String(error))
    }
}

export const searchPosts = async (query: string) => {
    try {
        const posts = await databases.listDocuments(
            env.APPWRITE_DATABASE_ID,
            env.APPWRITE_VIDEO_COLLECTION_ID,
            [Query.search('title', query)]
        );
        return posts.documents || [];
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getUserPosts = async (userId: string) => {
    try {
        const posts = await databases.listDocuments(
            env.APPWRITE_DATABASE_ID,
            env.APPWRITE_VIDEO_COLLECTION_ID,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        );
        return posts.documents || [];
    } catch (error) {
        throw new Error(String(error));
    }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(String(error))
    }
}

export const getFilePreview = async (fileId: string, type: string) => {
    let fileUrl
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(APPWRITE_STORAGE_ID, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                APPWRITE_STORAGE_ID,
                fileId,
                2000,
                2000,
                ImageGravity.Top,
                100
            )
        } else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw Error
        return fileUrl
    } catch (error) {
        throw new String(error)
    }
}

export const uploadFile = async (file: any, type: string) => {
    if (!file) return;
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }
    try {
        const uploadedFile = await storage.createFile(
            APPWRITE_STORAGE_ID,
            ID.unique(),
            asset
        )
        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    } catch (error) {
        throw new String(error)
    }
}

export const createVideo = async (form: any) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form?.thumbnail, 'image'),
            uploadFile(form?.video, 'video')
        ])
        const newPost = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_VIDEO_COLLECTION_ID,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )
        return newPost
    } catch (error) {
        throw new String(error)
    }
}