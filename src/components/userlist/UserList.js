import React from "react";
import styles from './styles';

class UserList extends React.Component {
    render() {
        const { userlist } = this.props;

        const users =
            userlist.map((user, key) =>
                <li style={styles.li} key={key}>
                    <p style={styles.online}>.</p>
                    {user.username}
                </li>
            )

        return (
            <div style={styles.container}>
                <p style={styles.title}>
                    Users in chat
                </p>
                <ul style={styles.ul}>
                    {users}
                </ul>
            </div>
        )
    }
}

export default UserList;
