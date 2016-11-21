export function receiveUsers(data) {
    return {
        type: "USERS_ADD",
        payload: data
    }
}
