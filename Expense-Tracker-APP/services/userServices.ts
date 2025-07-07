import { doc, updateDoc } from 'firebase/firestore';
import { responseType, UserDataType } from '../types/type';
import { db } from '@/config/firebase';

export const updateUser = async (uid:string, userData:UserDataType) : Promise<responseType> => {
    try {
        const userRef = doc(db,'users',uid);
        await updateDoc(userRef,userData);
        return { success: true };
        
    } catch (error) {
        return {success:false,msg:"Failed to update user data"}
    }
}