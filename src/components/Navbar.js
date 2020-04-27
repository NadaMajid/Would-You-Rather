import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

class Navbar extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="container">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <NavLink to='/' exact activeClassName='active' className="navbar-brand">{this.props.authedUser.user.name}</NavLink>
                                <NavLink to='/' exact activeClassName='active' className="nav-item nav-link">Home</NavLink>
                                <NavLink to='/add' exact activeClassName='active' className="nav-item nav-link">New Question</NavLink>
                                <NavLink to='/leaderboard' exact activeClassName='active' className="nav-item nav-link">Leaderboard</NavLink>
                                <NavLink to='/logout' exact activeClassName='active' className="nav-item nav-link">Logout</NavLink>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
  }
  
  export default connect(mapStateToProps)(Navbar);