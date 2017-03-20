export default function reducer(state = {
    username: null
}, action) {
    switch (action.type) {
        case "USERNAME_ADD": {
            return {
                ...state,
                username: action.payload
            };
        }
    }
    return state;
}
