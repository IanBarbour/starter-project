import React, { Component, createContext, useContext } from 'react';
import axios from 'axios';
import get from 'lodash/get';

export const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const UserConsumer = UserContext.Consumer;

const defaultState = {
  userActionFailed: false,
  userActionMessage: '',
  userActionPending: false,
  userInfo: {
    firstName: 'Ian',
    lastName: 'Barbour',
  }
};

export default class UserProvider extends Component {
  state = defaultState;

  callFailed = (failureMessage) => {
    this.setState({
      userActionFailed: true,
      userActionMessage: failureMessage,
      userActionPending: false,
    });
  };

  callStart = () => {
    this.setState({
      userActionMessage: '',
      userActionPending: true,
    });
  };

  callSuccess = () => {
    this.setState({
      userActionFailed: false,
      userActionPending: false,
    });
  };

  checkForSingleUserSKUs = async (orgCustomerId) => {
    this.callStart();
    try {
      const response = await axios.get(`/accounts/isLegacySingleUser/${orgCustomerId}`);
      const success = get(response, 'data.success');

      if (success) {
        this.callSuccess();
      } else {
        this.callFailed('');
      }
    } catch (e) {
      this.callFailed('');
    }
  };

  clearUserActionState = () => {
    this.setState({
      userActionFailed: false,
      userActionMessage: '',
      userActionPending: false,
    });
  };

  resetAccountData = () => {
    this.setState({
      ...defaultState,
    });
  };

  render() {
    const {
      userActionFailed,
      userActionMessage,
      userActionPending,
    } = this.state;

    return (
      <UserContext.Provider
        value={{
          clearUserActionState: this.clearUserActionState,
          userActionFailed,
          userActionMessage,
          userActionPending,
          userInfo: this.state.userInfo,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
