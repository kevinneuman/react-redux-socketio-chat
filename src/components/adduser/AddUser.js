import React from "react";
import styles from './styles';
import { receiveUsername } from '../../actions/userActions';

class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            username: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form style={styles.form} onSubmit={(event) => this.handleClick(event)}>
                <p style={styles.title}>Username</p>

                <input
                    style={styles.input}
                    name='username'
                    type='text'
                    placeholder='Pick a username'
                    value={this.state.username}
                    onChange={this.handleChange.bind(this)}
                    autoFocus />

                <button
                    type='submit'
                    className='btn btn-primary'
                    style={styles.button}>
                    Join chat
                    </button>
            </form>
        )
    }

    handleClick(event) {
        event.preventDefault();

        this.props.dispatch(receiveUsername(this.state.username));
    }
}

export default AddUser;
