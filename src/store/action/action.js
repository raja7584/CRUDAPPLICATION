import { LOGIN,ALLPRODUCT } from "../constant/actionType";

// export const UserLogin=(data)=>{
//     console.log('hiiii5555i');
//     return {
//         type:LOGIN ,
//         payLoad : data
//     }
// }
export const UserLogin=(data)=>{
    return{
        type : LOGIN,
        payLoad : data
    }
}
export const UserProduct=(data)=>{
    return{
        type: ALLPRODUCT,
        payLoad : data
    }
}
// export const UserSignUp=(data)=>{
//     return {
//         type : SIGNUP,
//         payload :data
//     }
// }