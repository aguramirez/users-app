
export const usersReducer = (state=[], action) =>{

    switch (action.type) {
        case 'addUser':
            return [
                ...state,
                {
                    ...action.payload,
                    id: new Date().getTime(),
                    
                }
            ];
        
        case 'removeUser':
            return state.filter(u => u.id !== action.payload)
    
        case 'updateUser':
            return state.map(u => {
                if(u.id === action.payload.id){
                    return {
                        ...action.payload,
                        password: u.password
                    };
                }
                return u;
            })
        default:
            return state;
    }
}