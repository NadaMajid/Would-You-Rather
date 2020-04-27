import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { Link } from 'react-router-dom';

class Question extends Component {
    render(){
        if(this.props.question == null){
            return <p>Question does not exist!</p>
        }

        const { id, name, avatar, optionOne, optionTwo, hasVoted } = this.props.question;

        if (this.props.questionsToShow === 'answered' && hasVoted !== true) {
            return false;
        } else if (this.props.questionsToShow === 'unanswered' && hasVoted === true) {
            return false;
        }

        let viewQuestion = '';
        let questionType = 'unanswered';

        if (this.props.questionsToShow === 'answered') {
            viewQuestion = `/question/${id}/results`;
            questionType = 'answered';
        } else if (this.props.questionsToShow === 'unanswered') {
            viewQuestion = `/question/${id}`;
        }

        return (
            <div className="windowContainer">
                <div className='card'>
                    <div className='card-header bold'>{name}</div>
                    <div>
                        <div className='row justify-content-center'>
                            <div className='col-sm-4 border-right center'>
                                <img src={avatar} alt={name} className='avatar'/>
                            </div>
                            <div className='col-sm-8'>
                                <div className='question'>
                                    <p className='center'> Would you rather {optionOne.text} <strong>OR</strong> {optionTwo.text}</p>
                                    <Link to={viewQuestion} className='center'>
                                        <button className='btn btn-outline-secondary btn-lg'>
                                            {
                                                questionType === 'answered'
                                                ? <span>View Results</span>
                                                : <span>View Question</span>
                                            }
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, users, questions}, {id, questionsToShow}) {
    const question = questions[id];

    return {
        authedUser: authedUser.user.id,
        question: formatQuestion(question, users[question.author], authedUser.user.id),
        questionsToShow
    }
}

export default connect(mapStateToProps)(Question);