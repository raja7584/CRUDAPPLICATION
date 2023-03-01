import { LOGIN,ALLPRODUCT } from "../constant/actionType";
const initialState = [{
   user:{},
   Product :[]
}]
export const Authentication = (state = initialState, action) => {
    // console.log('hiiiiii');
    // console.log('action?.type=====>',action);
    // console.log('hiiiiii222');

    switch (action?.type) {

        case LOGIN :
            let data = action?.payLoad
            return {
                ...state,
                user : data
            }

        default:
            return state
    }
}
export const AllProduct = (state = initialState, action) => {
    switch (action?.type) {
            
        case ALLPRODUCT :
            let data = action?.payLoad
            return [
                ...state,
                {Product : action?.payLoad}
            ]

        default:
            return state
    }
}
