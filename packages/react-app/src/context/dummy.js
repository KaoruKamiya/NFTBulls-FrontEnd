import React, { useState, createContext } from "react";

export const DummyDataContext = createContext();

export const DummyDataContextProvider = props => {
    const [name, setName] = useState("");
    const [expertListData, setExpertListData] = useState([]);

    return (
        <DummyDataContext.Provider value={{name, setName, expertListData, setExpertListData}}>
            {props.children}
        </DummyDataContext.Provider>
    )
}