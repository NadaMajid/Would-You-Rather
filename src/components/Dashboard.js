import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Navbar from './Navbar';
import Question from './Question';

class Dashboard extends Component {

    state = {
        activeTab: 'unanswered'
    }

    handleTabChange = (tab) => {
        this.setState(() => ({
            activeTab: tab
        }));
    };

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location.pathname }
              }} />
        }

        return (
            <div>
                <LoadingBar />
                {
                    this.props.loading === true
                    ? null
                    : (
                        <div>
                            <Navbar />
                            <div className='windowContainer'>
                                <div className="btn-group btn-group-toggle">
                                    <label className={"btn " + (this.state.activeTab === 'unanswered' ? 'btn-secondary active' : null)}>
                                        <input type="radio" id="unanswered" onClick={(e) => this.handleTabChange('unanswered')}/> Unanswered questions
                                    </label>
                                    <label className={"btn " + (this.state.activeTab === 'answered' ? 'btn-secondary active' : null)}>
                                        <input type="radio" id="answered" onClick={(e) => this.handleTabChange('answered')}/> Answered questions
                                    </label>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col-sm-8'>
                                        {this.props.questionIds.map((id) => {
                                            return (
                                                <Question key={id} id={id} questionsToShow={this.state.activeTab} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps({authedUser, questions}) {
    return {
        loading: Object.keys(questions).length === 0,
        isAuthenticated: Object.keys(authedUser).length !== 0,
        authedUser,
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
  }
  
  export default connect(mapStateToProps)(Dashboard);