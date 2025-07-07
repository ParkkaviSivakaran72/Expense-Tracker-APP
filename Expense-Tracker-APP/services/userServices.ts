import { doc, updateDoc } from 'firebase/firestore';
import { responseType, UserDataType } from '../types/type';
import { db } from '@/config/firebase';
import { uploadFileTocloudinary } from './imageService';

export const updateUser = async (uid:string, userData:UserDataType) : Promise<responseType> => {
    try {
        if(userData.image && userData?.image?.uri){
            const imageUpload  = await uploadFileTocloudinary(userData.image, 'users');
            if(!imageUpload.success){
                return {
                    success:false,
                    msg:imageUpload.msg || "Failed to upload image"
                }
            }
            userData.image = imageUpload.data
        }
        const userRef = doc(db,'users',uid);
        await updateDoc(userRef,userData);
        return { success: true };
        
    } catch (error) {
        return {success:false,msg:"Failed to update user data"}
    }
}