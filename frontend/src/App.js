import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; // Make sure this path is correct
import ProfileDisplay from './components/ProfileDisplay';

function App() {
  return (
    <Provider store={store}>
      <div>
        <ProfileDisplay />
      </div>
    </Provider>
  );
}

export default App;
