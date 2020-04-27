import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { addNewQuestion, answerQuestion } from './users';
import { addQuestion, addQuestionAnswer } from './questions';

export function handleAddQuestionAnswer(authedUser, questionId, selectedAnswer){
    return (dispatch) => {
        dispatch(showLoading());

        saveQuestionAnswer({authedUser: authedUser.user.id, qid: questionId, answer: selectedAnswer})
        .then(() => {
            dispatch(addQuestionAnswer(authedUser.user.id, questionId, selectedAnswer));
            dispatch(answerQuestion(authedUser.user.id, questionId, selectedAnswer));
            dispatch(hideLoading());
        });
    };
}

export function handleAddQuestion(author, optionOneText, optionTwoText){
    return (dispatch) => {
        dispatch(showLoading());

        saveQuestion({ author, optionOneText, optionTwoText })
        .then((question) => {
            dispatch(addNewQuestion(question));
            dispatch(addQuestion(question));
            dispatch(showLoading());
        });
    };
}