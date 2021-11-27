import React from 'react';

// Used https://www.w3schools.com/tags/ref_colornames.asp for available set of colors
export const ThemeContext = React.createContext({
  primaryColor: 'dodgerblue',
  secondaryColor: 'darkorange'
})


export const StateContext = React.createContext({
  state: {},
  dispatch: () => {}
})