import React from "react";
import io from 'socket.io-client';
import constants from '../../../constants.js';
import styles from './styles';
import { receiveUsers } from '../../actions/userlistActions';
import { receiveMessage } from '../../actions/chatActions';
import UserList from '../userlist/UserList';
import Messages from '../messages/Messages';

const socket = io(constants.SOCKET_URL);

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
    }

    componentDidMount() {
        this.socket();
    }

    socket() {
        // send join message
        socket.emit('chat join', { sender: this.props.username, message: 'joined' });

        self = this;
        // receive message
        socket.on('chat message', function(msg) {
            self.props.dispatch(receiveMessage(msg));
        });

        // receive join message
        socket.on('chat join', function(msg) {
            self.props.dispatch(receiveMessage(msg));
        });

        // receive leave message
        socket.on('chat leave', function(msg) {
            self.props.dispatch(receiveMessage(msg));
        });

        // receive userlist
        socket.on('chat users', function(msg) {
            self.props.dispatch(receiveUsers(msg));
        });

        // send leave message when user leaves the page
        window.addEventListener('beforeunload', (ev) => {
            ev.preventDefault();

            socket.emit('chat leave', { sender: this.props.username, message: 'left' });
        });
    }

    // update state from input
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { userlist, messages } = this.props;

        return (
            <div>
                <h1 style={styles.title}>Socket.IO Chat</h1>

                <Messages
                    messages={messages} />

                <form onSubmit={(event) => this.handleClick(event)}>
                    <input
                        style={styles.input}
                        name='message'
                        type='text'
                        placeholder='Write something'
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        autoFocus />

                    <button
                        type='submit'
                        className='btn btn-default'
                        style={styles.button}>
                        Send
                        </button>
                </form>

                <UserList
                    userlist={userlist} />
            </div>
        )
    }

    handleClick(event) {
        event.preventDefault();

        socket.emit('chat message', { sender: this.props.username, message: this.state.message });

        this.setState({
            message: ''
        });
    }
}

export default Chat;
