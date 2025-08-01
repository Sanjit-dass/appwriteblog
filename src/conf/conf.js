
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    resetUrl: String(import.meta.env.VITE_APPWRITE_RECOVERY_URL),
    appwriteUsersCollectionId:String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),

}

export default conf