import React, { Component } from 'react';
import {connect} from 'react-redux';
import { handleReceiveUsers } from '../actions/users';
import { handleLogin } from '../actions/auth';
import LoadingBar from 'react-redux-loading';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    
    state = {
        selectedUser: null
    }
    
    componentDidMount(){
        this.props.dispatch(handleReceiveUsers());
    }
    
    handleChange = (e) => {
        let selectedUser = e.target.value;
        
        if(selectedUser === "null")
            selectedUser = null;

        this.setState(() => ({
            selectedUser,
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(handleLogin(this.state.selectedUser));
    }

    render(){

        const {from} = this.props.location.state || {from: {pathname: '/'}};
        if (this.props.isAuthenticated) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <LoadingBar />
                {
                    this.props.loading === true
                    ? null
                    : <div className="loginContainer">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <select className="form-control" id="usersList" onChange={this.handleChange}>
                                    <option value="null">Select a user...</option>
                                    {
                                        Object.keys(this.props.users).map((user) => {
                                            return <option key={this.props.users[user].id} value={this.props.users[user].id}>{this.props.users[user].name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={this.state.selectedUser === null}>Login</button>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        loading: Object.keys(users).length === 0,
        isAuthenticated: authedUser.authenticated,
        users
    }
}

export default connect(mapStateToProps)(Login);