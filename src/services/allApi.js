import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register
export const registerApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}
//login
export const loginApi=async(reqBody)=>{
        return await commonApi('POST',`${serverUrl}/login`,reqBody,"")

}
//add projects
export const addProjectApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}
//get home project
export const homeProjectApi=async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`)
}
//query paramater -baseURL?key=value
//get all project
export const allProjectApi=async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}

//get user project
export const userProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

//api to delete user project

export const deleteUserProjectApi=async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-userproject/${id}`,{},reqHeader)
}
//api to update user project
export const updateUserProjectApi=async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userproject/${id}`,reqBody,reqHeader)
}

//api to update profile
export const updateUserProfileApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeader)
}