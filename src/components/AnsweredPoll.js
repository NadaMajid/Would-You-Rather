import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import PageNotFound from './PageNotFound'

class AnsweredPoll extends Component {
    render(){        
        if(!this.props.isAuthenticated){
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location.pathname }
              }} />
        }

        if(this.props.pageNotFound){
            return <PageNotFound />
        }

        const totalVotes = this.props.question.optionOne.votes.length + this.props.question.optionTwo.votes.length;

        const optionSelected = this.props.question.optionOne.votes.includes(this.props.author.id) ? "optionOne" : "optionTwo";

        let optionOneWidth = Math.round((this.props.question.optionOne.votes.length / totalVotes) * 100);
        let optionTwoWidth = Math.round((this.props.question.optionTwo.votes.length / totalVotes) * 100);

        return (
            <div>
                <Navbar />
                <div className='windowContainer'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-8'>
                                <div className='card'>
                                    <div className='card-header bold'>Added by {this.props.author.name}</div>
                                    <div className='card-body'>
                                        <div className='container'>
                                            <div className='row justify-content-center'>
                                                <div className='col-sm-4 border-right vert-align'>
                                                    <img src={this.props.author.avatarURL}
                                                        alt={`Avatar of ${this.props.author.name}`}
                                                        className='avatar'/>
                                                </div>
                                                <div className='col-sm-8'>
                                                    <div className='question-info'>
                                                        <div className='col-sm-12 '>
                                                            <div className='results-header'>Results:</div>
                                                            <div className={`card card-poll-results ${(optionSelected === 'optionOne') ? "chosen-answer" : ""}`}>Would you rather {this.props.question.optionOne.text}?

                                                                <div className="progress m-progress--sm">
                                                                    <div className="progress-bar m--bg-success"
                                                                        style={{ width: optionOneWidth + '%' }}
                                                                        ></div>
                                                                </div>
                                                                <div>
                                                                    <span>{this.props.question.optionOne.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                                                                </div>

                                                            </div>
                                                            <div className={`card card-poll-results ${(optionSelected === 'optionTwo') ? "chosen-answer" : ""}`}>Would you rather {this.props.question.optionTwo.text}?

                                                                <div className="progress m-progress--sm">
                                                                    <div className="progress-bar m--bg-success"
                                                                        style={{ width: optionTwoWidth + '%' }}
                                                                    ></div>
                                                                </div>
                                                                <div>
                                                                    <span>{this.props.question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const {id} = props.match.params;

    let author = "";
    let specificQuestion = "";
    let pageNotFound = true;
    
    if (questions[id] !== undefined) {
        pageNotFound = false;
        specificQuestion = questions[id];
        author = users[specificQuestion['author']];
    }

    return {
        id,
        question: specificQuestion,
        author: author,
        isAuthenticated: Object.keys(authedUser).length !== 0,
        authedUser,
        pageNotFound
    }
}

export default connect(mapStateToProps)(AnsweredPoll);