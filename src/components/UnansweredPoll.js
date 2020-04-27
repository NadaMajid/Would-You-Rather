import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestionAnswer } from '../actions/shared';
import Navbar from './Navbar';
import PageNotFound from './PageNotFound';

class UnansweredPoll extends Component {

    state = {
        selectedOption: null,
        toHome: false
    };

    handleSubmit(e, questionId) {
        e.preventDefault();

        const {dispatch, authedUser} = this.props;
        const {selectedOption} = this.state;

        dispatch(handleAddQuestionAnswer(authedUser, questionId, selectedOption));

        this.setState(() => ({
            selectedOption: '',
            toHome: true
        }));

    }

    handleInputChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            selectedOption: text
        }));
    };

    render(){

        if(!this.props.isAuthenticated){
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location.pathname }
              }} />
        }

        if(this.state.toHome){
            return <Redirect to="/" />
        }

        if(this.props.pageNotFound){
            return <PageNotFound />
        }

        return (
            <div>
                <Navbar />
                <div className='windowContainer'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-8'>
                                <div className='card'>
                                    <div className='card-header bold'>{this.props.author.name}</div>
                                    <div className='card-body'>
                                        <div className='container'>
                                            <div className='row justify-content-center'>
                                                <div className='col-sm-4 border-right center'>
                                                    <img src={this.props.author.avatarURL}
                                                         alt={`Avatar of ${this.props.author.name}`}
                                                         className='avatar'/>
                                                </div>
                                                <div className='col-sm-8'>
                                                    <div className='question'>
                                                        <form onSubmit={(e) => this.handleSubmit(e, this.props.id)}>
                                                            <div className="form-check">
                                                                <p><strong>Would you rather be:</strong></p>
                                                                <div>
                                                                    <input className="form-check-input"
                                                                            type="radio"
                                                                            name="questionPoll"
                                                                            id="optionOne"
                                                                            value="optionOne"
                                                                            onChange={this.handleInputChange}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="optionOne">
                                                                        {this.props.question.optionOne.text}
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input className="form-check-input"
                                                                            type="radio"
                                                                            name="questionPoll"
                                                                            id="optionTwo"
                                                                            value="optionTwo"
                                                                            onChange={this.handleInputChange}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="exampleRadios2">
                                                                        {this.props.question.optionTwo.text}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <button
                                                                className='btn btn-outline-primary m-15-top'
                                                                type='submit'
                                                                disabled={this.state.selectedOption === ''}
                                                            >
                                                                Submit
                                                            </button>
                                                        </form>
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

export default connect(mapStateToProps)(UnansweredPoll);