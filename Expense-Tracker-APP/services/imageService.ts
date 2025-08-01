import { CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { responseType } from "@/types/type";
import axios from 'axios'

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dmdej2vts/image/upload"

export const getProfileImage = (file:any) =>{
    if(file && typeof file =='string') return file;
    if(file && typeof file =='object') return file.uri;

    return require('@/assets/images/avatar.png')

}

export const uploadFileTocloudinary = async (
    file : {uri?:string} | string,
    folderName: string
): Promise<responseType> => {
    try {
        if(typeof file == 'string'){
            return {success :true , data : file}
        }
        if(file && file.uri){
            const formData = new FormData();
            formData.append("file", {
                uri : file?.uri,
                type:'image/jpeg',
                name:file?.uri.split('/').pop() || 'image.jpg'
            
            } as any)
            formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder',folderName)

            const response = await axios.post(CLOUDINARY_URL, formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })

            return {success : true, data: response?.data?.secure_url}
        }
        return {success:true}
    } catch (error : any) {
        return {success : false , msg : error.message || "Something went wrong, please try again later."};
    }
}