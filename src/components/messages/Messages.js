import React from "react";
import styles from './styles';

class Messages extends React.Component {
    componentDidUpdate() {
        // scroll to bottom
        window.scrollTo(0, this.refs.chat.scrollHeight);
    }

    render() {
        const { messages } = this.props;

        const chatMessages =
            messages.map((chat, key) =>
                <li style={styles.li} key={key}>
                    <p style={styles.timestampText}>
                        {chat.timestamp}
                    </p>
                    <p style={styles.messageText}>
                        {chat.sender}: {chat.message}
                    </p>
                </li>
            )

        return (
            <ul style={styles.ul} ref='chat'>
                {chatMessages}
            </ul>
        )
    }
}

export default Messages;
