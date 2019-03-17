import React, { Component} from 'react';
import { connect } from "react-redux";

import Navbar from './Navbar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { auth } = this.props;
        console.log(auth.user.username)
        return (
            <div>
               <Navbar user={auth.user}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        error: state.error
    }
}

export default connect(mapStateToProps)(Dashboard);
