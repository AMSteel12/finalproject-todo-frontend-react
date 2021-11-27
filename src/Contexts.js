import React from 'react'

export const ThemeContext = React.createContext({
    primaryColor: 'dodgerblue',
    secondaryColor: 'darkorange'
})

export const StateContext = React.createContext({
    state: {},
    dispatch: () => {}
 })
 
