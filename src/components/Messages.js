import React from 'react';
import moment from 'moment';
import styles from './styles/MessagesStyles';

class Messages extends React.Component {
    componentDidUpdate() {
        // scroll to bottom
        window.scrollTo(0, this.refs.chat.scrollHeight);
    }

    render() {
        const { messages } = this.props;

        const chatMessages = messages.map((chat, key) =>
            <li style={styles.li} key={key}>
                <p style={styles.timestampText}>
                    {moment(chat.timestamp).format('D.M.YYYY HH:mm:ss')}
                </p>

                <p style={styles.messageText}>
                    {chat.sender}: {chat.message}
                </p>
            </li>
        );

        return (
            <ul style={styles.ul} ref='chat'>
                {chatMessages}
            </ul>
        );
    }
}

export default Messages;
