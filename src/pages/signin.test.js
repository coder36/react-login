import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './signin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Signin />, div);
});
