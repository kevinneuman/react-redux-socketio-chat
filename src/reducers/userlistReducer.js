export default function reducer(state = {
    userlist: []
}, action) {
    switch (action.type) {
        case "USERLIST_ADD": {
            return {
                ...state,
                userlist: action.payload
            };
        }
    }
    return state;
}
