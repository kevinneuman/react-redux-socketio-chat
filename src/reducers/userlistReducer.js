export default function reducer(state = {
    users: []
}, action) {
    switch (action.type) {
        case "USERS_ADD": {
            return {
                ...state,
                users: action.payload
            }
        }
    }
    return state
}
