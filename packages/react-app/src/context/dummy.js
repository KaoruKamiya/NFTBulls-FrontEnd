import React, { useState, createContext } from "react";

export const DummyDataContext = createContext();

export const DummyDataContextProvider = props => {
    const [expertListData, setExpertListData] = useState([
        {
            key: '1',
            username: 'John',
            experienceInMonths: 22,
            expertise: ['CryptoPunks', 'Axie Infinity'],
            verified: "Verified",
            association: "YGG",
            loansFacilitated: 2,
            twthandle: "jhncrypto"
        },
        {
          key: '2',
          username: 'Jim',
          experienceInMonths: 12,
          expertise: ['CryptoPunks'],
          verified: "Pending",
          association: "Independent",
          loansFacilitated: 0,
          twthandle: 'jimeth'
        },
        {
          key: '3',
          username: 'Joe',
          experienceInMonths: 32,
          expertise: ['Galatic Apes', 'Bored Ape Yacht Club'],
          verified: "Verified",
          association: "ThugDAO",
          loansFacilitated: 8,
          twthandle: "kJoe",
        },
    ]);

    return (
        <DummyDataContext.Provider value={{expertListData, setExpertListData}}>
            {props.children}
        </DummyDataContext.Provider>
    )
}