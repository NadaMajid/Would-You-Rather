import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';

class Leaderboard extends Component {
    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location.pathname }
              }} />
        }

    const {users} = this.props;

    let usersInfo = Object.keys(users).map((key) => {
        let questionsAnswered = Object.keys(users[key].answers).length;
        let questionsAsked = Object.keys(users[key].questions).length;

        return {
            'name': users[key].name,
            'avatar': users[key].avatarURL,
            'questionsAnswered': questionsAnswered,
            'questionsAsked': questionsAsked,
            'totalScore': questionsAnswered + questionsAsked
        }
    });

    usersInfo.sort((a, b) => {
        if (b.totalScore < a.totalScore) return -1;
        if (b.totalScore > a.totalScore) return 1;
        return 0;
    });

        return (
            <div>
                <Navbar />
                <div className='windowContainer'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-8'>
                                {usersInfo.map((user, index) => {
                                    return (
                                        <div className='margin-top-10' key={index}>
                                            <div className='card'>
                                                <div className='card-header bold'>{user.name}</div>
                                                <div className='card-body'>
                                                    <div className='container'>
                                                        <div className='row justify-content-center'>
                                                            <div className='col-sm-4 border-right center'>
                                                                <img src={user.avatar} alt={`Avatar of ${user.name}`} className='avatar'/>
                                                            </div>
                                                            <div className='col-sm-5 border-right'>
                                                                <p className='m-30-top'>
                                                                    <span>Answered Questions: </span>
                                                                    <span>{user.questionsAnswered}</span>
                                                                </p>
                                                                <p>
                                                                    <span>Asked Questions: </span>
                                                                    <span>{user.questionsAsked}</span>
                                                                </p>
                                                            </div>
                                                            <div className='col-sm-3'>
                                                                <div className='container'>
                                                                    <h2>Score: </h2>
                                                                    <div className='row justify-content-center'>
                                                                        <h2>
                                                                            <span>{user.totalScore}</span>
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapPropsToState({ users, authedUser }) {
    return {
        isAuthenticated: Object.keys(authedUser).length !== 0,
        users
    }
}

export default connect(mapPropsToState)(Leaderboard);