import React, {createContext, useState} from "react";

export const CommandContext = createContext();

const CommandContextProvider = () => {
    const [commands, setCommands] = useState([]);
    return <div>Command Context</div>
}

export default CommandContextProvider;