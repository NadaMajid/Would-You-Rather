import {
    _getUsers,
    _getUser,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from "./_DATA";

export function getUsers() {
    return _getUsers();
}

export function getUser(id) {
    return _getUser(id);
}

export function getQuestions() {
    return _getQuestions();
}

export function saveQuestion(info) {
    return _saveQuestion(info);
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
}