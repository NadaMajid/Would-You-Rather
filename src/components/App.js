import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading';
import Login from './Login';
import Logout from './Logout';
import Dashboard from './Dashboard';
import UnansweredPoll from "./UnansweredPoll";
import { handleReceiveQuestions } from '../actions/questions';
import AnsweredPoll from './AnsweredPoll';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import PageNotFound from './PageNotFound';

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleReceiveQuestions());
  }

  render(){
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            {this.props.loading === true
              ? null
              : <div>
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/login' exact component={Login} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path='/question/:id' exact component={UnansweredPoll} />
                    <Route path='/question/:id/results' exact component={AnsweredPoll} />
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={Leaderboard} />
                    <Route component={PageNotFound} />
                  </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({questions, authedUser}) {
  return {
    loading: Object.keys(questions).length === 0,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
