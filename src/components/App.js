import React from "react";
import { connect } from 'react-redux';
import AddUser from './AddUser';
import Chat from './Chat';

class App extends React.Component {
    componentDidMount() {
        document.body.style.backgroundColor = '#4d4d4d';
    }

    render() {
        const { user } = this.props;
        const addUser = !user.username ? <AddUser /> : null;
        const chat = user.username ? <Chat /> : null;

        return (
            <div>
                {addUser}
                {chat}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
