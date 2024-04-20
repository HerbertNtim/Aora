import { Account, Avatars, Client, Storage, Databases, ID, Query } from 'react-native-appwrite';

import { EXPO_PUBLIC_DATABASE_ID, EXPO_PUBLIC_PROJECT_ID, EXPO_PUBLIC_STORAGE_ID, EXPO_PUBLIC_USERCOLLECTION_ID, EXPO_PUBLIC_VIDEOCOLLECTION_ID } from '@env';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.hntim.aora',
  projectId: EXPO_PUBLIC_PROJECT_ID,
  databaseId: EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: EXPO_PUBLIC_USERCOLLECTION_ID,
  videoCollectionId: EXPO_PUBLIC_VIDEOCOLLECTION_ID,
  storageId: EXPO_PUBLIC_STORAGE_ID
}


// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);
const avatar = new Avatars(client);

// Register User
export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if(!newAccount) {
      throw new Error('Error creating account')
    }

    const avatarUrl = avatar.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    
    return newUser

  } catch (error) {
    throw new Error(error)
  }
}

// Sign In User
export const signIn = async (email, password) => {
  try {
    const session = account.createEmailSession(email, password) 

    if(!session) {
      throw new Error('Error in signing in user')
    }

    return session
  } catch (error) {
    throw new Error(error)
  }
}


// Getting current account 
export const getAccount = async () => {
  try {
    const currentAccount = await account.get()

    return currentAccount
  } catch (error) {
    throw new Error(error)
  }
}

// Getting current user 
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount()
    if(!currentAccount) {
      throw new Error('Error getting current account')
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) {
      throw new Error('Error getting current user')
    }

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

// Getting all posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Getting Search result 
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );
    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get current user posts
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    if (!posts) throw new Error("Nothing found");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


// signOut function
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    throw new Error(error)
  }
}
