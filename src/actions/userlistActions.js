export function receiveUsers(data) {
    return {
        type: "USERLIST_ADD",
        payload: data
    };
}
