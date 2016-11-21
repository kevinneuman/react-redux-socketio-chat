import React from "react";
import { connect } from 'react-redux';
import io from 'socket.io-client';
import styles from './styles';
import AddUser from '../adduser/AddUser';
import Chat from '../chat/Chat';

class App extends React.Component {
    componentDidMount() {
        document.body.style.backgroundColor = '#4d4d4d';
    }

    render() {
        const { dispatch, user, userlist, chat } = this.props;

        return (
            <div>
                {!user.username &&
                    <AddUser
                        dispatch={dispatch} />
                }

                {user.username &&
                    <Chat
                        dispatch={dispatch}
                        username={user.username}
                        userlist={userlist.users}
                        chat={chat} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userlist: state.userlist,
        chat: state.chat
    };
}

export default connect(mapStateToProps)(App);
