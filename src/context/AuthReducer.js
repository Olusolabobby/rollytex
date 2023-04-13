const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                currentUser: action.payload,
            };
        }
        case "LOGOUT": {
            return {
                currentUser: null,
            };
        }
        case "SHOW": {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    idToShow: action.payload,
                }
            };
        }
        case "PRODUCT" : {
            return {
                ...state,
               productIdToShow: action.payload,
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
