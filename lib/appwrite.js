import { Account, Avatars, Client, Storage, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.hntim.aora',
  projectId: '66210b0394d675c926f8',
  databaseId: '66211b77a849105e3330',
  userCollectionId: '66211bcabcf68ba6dca9',
  videoCollectionId: '66211bf15b3e939429aa',
  storageId: '66211ed76afcc9920ffa'
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
