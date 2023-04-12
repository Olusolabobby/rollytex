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
                currentUser: {
                    ...state.currentUser,
                    idToShow: action.payload,
                }
            };
        }
        case "PRODUCT" : {
            return {
                currentProduct: {
                    ...state.currentProduct,
                    newIdToShow: action.payload,
                }
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
