import { RECEIVE_USERS, ADD_NEW_QUESTION, ANSWER_QUESTION } from '../actions/users';

export default function users(state = {}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };

        case ADD_NEW_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: [...state[action.question.author].questions, action.question.id]
                }
            };

        case ANSWER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.questionId]: action.selectedOption
                    }
                }
            };

        default:
            return state;
    }
}