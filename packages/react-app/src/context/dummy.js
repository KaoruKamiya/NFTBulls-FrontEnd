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
    const [nftData, setNftData] = useState([
        {
            nftName: "CryptoPunk #228",
            description: "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
            img: "https://lh3.googleusercontent.com/K3AFmjNAQhy955OBsevN0qpIobSgIsuSCGmD9wNrzqgNQ_No9e-FTFlPBq2r78fxXzOiEapx3OGHrq0so0YAjbqZxl0X-WA_GeB_4Ww=w600",
            nftAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
            collateralAsset: "$ETH",
            maxRentalDays: 180 
        },
        {
            nftName:"Bored Ape Yacht Club #3217",
            description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.",
            img:"https://lh3.googleusercontent.com/NYgBelnxn7gdeM9iMXJyKT18ToglnvKJnRfiiaMAdGgO3-bAEtEKagfcjRHEbELxydsO4qq015PgPZs4mB23tSCRv7cIyP71avSmfA=w600",
            nftAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
            collateralAsset: "$USDC",
            maxRentalDays: 260
        },
        {
            nftName:"CryptoKitties #5",
            description: "winces. My name is CryptoKitties #5. I love to wear magenta. I'm well-educated, don't worry. If I were a cheese, I would definitely be goat cheese, no question.",
            img: "https://lh3.googleusercontent.com/7JejnMn_3PMxwd6RsDtXRTIWz0I4d6YLtLQ4SciYyIPVswAtxh39gIM3c2zCxXzn0ZjkOB-NVZGet7zuBAIVeNbAM8h__4ngjNp8=w600",
            nftAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
            collateralAsset: "$wBTC",
            maxRentalDays: 7
        },
    ]);

    return (
        <DummyDataContext.Provider value={{nftData, setNftData, expertListData, setExpertListData}}>
            {props.children}
        </DummyDataContext.Provider>
    )
}