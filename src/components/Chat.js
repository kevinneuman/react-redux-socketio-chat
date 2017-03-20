import React from "react";
import { connect } from 'react-redux';
import { receiveUsers } from '../actions/userlistActions';
import { receiveMessage } from '../actions/chatActions';
import io from 'socket.io-client';
import constants from '../../constants.js';
import styles from './styles/ChatStyles';
import UserList from './UserList';
import Messages from './Messages';

const socket = io(constants.SOCKET_URL);

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        this.socket();
    }

    socket() {
        const username = this.props.user.username;

        // receive userlist
        socket.on('chat users', (msg) => {
            this.props.dispatch(receiveUsers(msg));
        });

        // send join message
        socket.emit('chat join', { timestamp: new Date(), sender: username, message: 'joined' });

        // receive join message
        socket.on('chat join', (msg) => {
            this.props.dispatch(receiveMessage(msg));
        });

        // receive leave message
        socket.on('chat leave', (msg) => {
            this.props.dispatch(receiveMessage(msg));
        });

        // receive message
        socket.on('chat message', (msg) => {
            this.props.dispatch(receiveMessage(msg));
        });

        // send leave message when user leaves the page
        window.addEventListener('beforeunload', (ev) => {
            ev.preventDefault();

            socket.emit('chat leave', { timestamp: new Date(), sender: username, message: 'left' });
        });
    }

    // update state from input
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick(event) {
        event.preventDefault();

        const username = this.props.user.username;

        // send message
        socket.emit('chat message', { timestamp: new Date(), sender: username, message: this.state.message });

        this.setState({
            message: null
        });
    }

    render() {
        const { userlist, chat } = this.props;

        return (
            <div>
                <h1 style={styles.title}>
                    Socket.IO Chat
                </h1>

                <Messages messages={chat.messages} />

                <form onSubmit={(event) => this.handleClick(event)}>
                    <input style={styles.input}
                        name='message'
                        type='text'
                        placeholder='Write something'
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        autoFocus />

                    <button style={styles.button}
                        type='submit'
                        className='btn btn-default'>
                        Send
                    </button>
                </form>

                <UserList userlist={userlist.userlist} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    userlist: state.userlist,
    chat: state.chat
});

export default connect(mapStateToProps)(Chat);
