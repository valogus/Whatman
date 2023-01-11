
const initialState = {userName:localStorage.getItem('userName'), userId:localStorage.getItem('userId') }|| {
    userName:null,
    userId:null,
}

const authReducer = (state = initialState, action ) =>{
    switch(action.type){
        default: return state;
        case 'SIGN_IN': return action.payload
    }
}

export default authReducer