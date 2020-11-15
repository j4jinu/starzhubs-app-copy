import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useAuth } from './src/context/authHook';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import { AuthContext } from './src/context/authContext';

// const rootReducer = combineReducers({
//   posters: posterReducer
// })

// const store = createStore(rootReducer)


const App = () => {
  const { token, login, logout, userId, role, name, rating, avatar } = useAuth();
  console.log("Login status: ", token);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <AppNavigator />
    </AuthContext.Provider>
  )
};

export default App;
