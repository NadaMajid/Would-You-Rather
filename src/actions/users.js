import { getUsers } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addNewQuestion(question){
    return {
        type: ADD_NEW_QUESTION,
        question
    }
}

export function answerQuestion(authedUser, questionId, selectedAnswer){
    return {
        type: ANSWER_QUESTION,
        authedUser,
        questionId,
        selectedAnswer
    }
}

export function handleReceiveUsers() {
    return (dispatch) => {
        dispatch(showLoading());
        return getUsers()
            .then((users) => {
                dispatch(receiveUsers(users));
                dispatch(hideLoading());
            });
    }
}