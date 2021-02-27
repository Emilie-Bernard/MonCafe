import React, { createContext, useEffect, useState } from "react";

import SecureStorage from 'react-native-secure-storage';

export const CommandContext = createContext();

export const CommandContextProvider = ({ children }) => {

    const initialState = JSON.parse(localStorage.getItem('commands')) || []
    const [commands, setCommands] = useState(initialState);
    
    useEffect(() => {
        localStorage.setItem('commands', JSON.stringify(commands))
    }, [commands])

    const addCommand = (product) => {
        setCommands([...commands, product]);
        localStorage.setItem('commands', JSON.stringify(commands))
    }

    const removeCommand = (product) => {
        setCommands(commands.filter(command => command._id !== product._id))
    }

    const clearList = () => {
        setCommands([])
    }
    return (
        <CommandContext.Provider value={{ commands, addCommand, removeCommand, clearList }}>
            {children}
        </CommandContext.Provider>)
}