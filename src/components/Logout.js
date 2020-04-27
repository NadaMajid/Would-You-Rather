import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {receiveLogout} from '../actions/auth';

class Logout extends Component {
    componentDidMount() {
        this.props.dispatch(receiveLogout());
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

export default connect()(Logout);