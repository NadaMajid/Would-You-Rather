import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/shared';

class NewQuestion extends Component {

    state = {
        optionOneText: "",
        optionTwoText: "",
        toHome: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(handleAddQuestion(this.props.authedUser.user.id, this.state.optionOneText, this.state.optionTwoText));
        this.setState(() => ({
            toHome: true
        }));
    }

    handleChange = (e) => {
        const text = e.target.value;
        this.setState({
            [e.target.name]: text
        });
    }

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
        
        return (
            <div>
                <Navbar />
                <div className='windowContainer'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-8'>
                                <div className='card'>
                                    <div className='card-header bold'>Create New Question</div>
                                    <div className='card-body'>
                                        <div className='container'>
                                            <div className='row justify-content-center p-20-top-bottom'>
                                                <div className='col-sm-12'>
                                                    <p><strong>Would You Rather...?</strong></p>
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className='form-group'>
                                                            <input
                                                                className='form-control'
                                                                placeholder='Enter option one text here...'
                                                                value={this.state.optionOneText}
                                                                name="optionOneText"
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                        <div className='form-group'>
                                                            <input
                                                                className='form-control'
                                                                placeholder='Enter option two text here...'
                                                                value={this.state.optionTwoText}
                                                                name="optionTwoText"
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                        <input type='submit'
                                                               name='submit'
                                                               id='submit'
                                                               className='btn btn-outline-primary'
                                                               disabled={ this.state.optionOneText === "" || this.state.optionOneText === "" } />
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
        );
    }
}

function mapStateToProps({authedUser}){
    return {
        isAuthenticated: Object.keys(authedUser).length !== 0,
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);