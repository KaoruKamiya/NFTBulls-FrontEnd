import React, { useState, useContext } from "react";
import { Button, Card, Divider, Modal, Typography, Form, Input, InputNumber, Select, Alert } from "antd";
import { DummyDataContext } from "../context/dummy";
import { Address, AddressInput } from "../components";
import { useTokenList } from "eth-hooks/dapps/dex";
import { useHistory } from "react-router-dom";
import Moralis from "moralis";

const {Option} = Select;

const {Text} = Typography;
const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    },
    initialValues: {
        size: "large",
    },
  };

export default function RoleSelection({mainnetProvider}) {
    const [nftInfoState, setNftInfoState] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [lenderModalVisible, setLenderModalVisible] = useState(false);

    const listOfTokens = useTokenList(
        "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json",
    );
    const validateMessages = {
        required: "${label} is required!",
        types: {
          email: "${label} is not a valid email!",
          number: "${label} is not a valid number!"
        },
        number: {
          range: "${label} must be between ${min} and ${max}"
        }
    };

    const {expertListData, setExpertListData} = useContext(DummyDataContext);
    
    const onFinish = (values) => {
        console.log(values.user.name, values.user.association, values.user.experience, values.user.twthandle);
        setExpertListData([...expertListData, {key:JSON.stringify(expertListData.length + 1),
                                                twthandle: "https://twitter.com/".concat(values.user.twthandle.toString()),
                                                ... values.user,
                                                expertise: values.projects,
                                                loansFacilitated: 0,
                                                verified: "Pending"}]);
    };

    const onLenderFinish = (values) => {
        for(let i = 0; i < nftInfoState.length; i++) {
            if(nftInfoState[i]["name"] == values.user.nftName) {
                console.log("Found the bitch: ", nftInfoState[i]);
                console.log("Address: ", nftInfoState[i]["address"]);
            }
        }
        console.log(values.user.collateralAsset);
        alert("Successfully sent your NFT for review to experts");
    }

    const history = useHistory();
    const routeChange = () => {
        let pathName = '/borrower';
        history.push(pathName); 
    }

    const NFTList = [
        "CryptoPunks",
        "CrypToadz by GREMPLIN",
        "Bored Ape Yacht Club",
        "CyberKongz",
        "The Humanoids",
        "GalacticApes",
        "Habbo Avatars",
        "Cool Cats NFT",
        "Winter Bears",
        "Capsule House",
        "Neo Tokyo Identities",
        "Mutant Cats",
        "Creature World NFT",
        "The Doge Pound",
        "Peaceful Groupies",
        "Mutant Ape Yacht Club",
        "Anonymice",
        "CyberKongz VX",
        "The Yakuza Cats Society",
        "The Official Surreals",
        "Emblem Vault",
        "LOSTPOETS",
        "The Meta Key",
        "Nifty League DEGENs",
        "Lazy Loins",
        "SuperRare",
        "CryptoDickbutts",
        "Loot (for Adventurers)",
        "PUNK Comic",
        "MetaHero Universe: DAO Tokens",
        "ZombieToadz",
        "KingFrogs",
        "Singularity by AIIV",
        "TheHeartProject",
        "Obits Official",
        "CryptoKitties"
    ];


    const fetchNFTs = async() => {
        let nftInfoArr = [];

        const options = {
          chain: "eth", 
          //address: {address}.address.toString(),
          address: "0x31a5ff62a1b2c0f030aee1661eab6513ae676e23",
        }
        const userEthNFTs = await Moralis.Web3API.account.getNFTs(options);
        let nftOptionsLength = 50;
        if(userEthNFTs.result.length < nftOptionsLength) {
          nftOptionsLength = userEthNFTs.result.length;
        }
        for(let i = 0; i < nftOptionsLength; i++) {
          let nftObject = {};
            
          var nftAddress = userEthNFTs.result[i].token_address;
          var nftTokenID = userEthNFTs.result[i].token_id;

          nftObject.tokenID = nftTokenID;
          nftObject.address = nftAddress;
          if(userEthNFTs.result[i].metadata !== null) {
            const metadataObj = JSON.parse(userEthNFTs.result[i].metadata);
            var nftName = metadataObj["name"];
            nftObject.name = nftName;
            if(metadataObj["description"] != null) {
              nftObject.description = metadataObj["description"];
              nftObject.image = metadataObj["image"];
            } else {
              nftObject.description = "No description available";
              nftObject.image = "https://cdn.lifestyleasia.com/wp-content/uploads/sites/7/2021/08/26110251/CryptoKitties-FI-NFT.jpeg";
            }
          } else {
            const name = userEthNFTs.result[i].name.toString();
            const tokenId = userEthNFTs.result[i].token_id.toString();
            var nftName = name.concat(tokenId);;
            nftObject.name = nftName;
            nftObject.description = "No descriptions available";
            nftObject.image = "https://cdn.lifestyleasia.com/wp-content/uploads/sites/7/2021/08/26110251/CryptoKitties-FI-NFT.jpeg";
          }
          nftInfoArr.push(nftObject);
        }
        console.log(userEthNFTs);
        setNftInfoState([...nftInfoArr]);
    }

    const compoundFunctionsOnClick = async () => {
        await fetchNFTs();
        setLenderModalVisible(true); 
    }

    return(
        <div style={{width: "80%", margin: "auto", marginTop: 64 }}>
            <h1>Select your role</h1>
                <Card style={{ marginTop: 32 }}>
                    <div>
                        <div style={{ marginTop: 20 }}>
                            <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setModalVisible(true)}>NFT Expert</Button>
                            <br/>
                            <Text>
                                We welcome experts of various NFT projects on our platform. You can now monetise your expertise by helping the community
                                in the fair price discovery of their NFTs for lending. Click on the button above to verify yourself. 
                            </Text>
                        </div>
                        <Divider />
                        <div style={{ marginTop: 20 }}>
                            <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => compoundFunctionsOnClick()}>NFT Lender</Button>
                            <br/>
                            <Text>
                                We welcome all NFT holders on our platform. With our protocol, you can now generate some passive income from your NFTs by lending your
                                NFTs to verified borrowers at a fair price determined by your NFT project experts.
                                Click on the button above to list your NFTs for lending.
                            </Text>
                        </div>
                        <Divider />
                        <div style={{ marginTop: 20 }}>
                            <Button type="primary" size="large" style={{marginBottom: 20}} onClick={routeChange}>NFT Borrower</Button>
                            <br/>
                            <Text>
                                We welcome all NFT enthusiasts on our platform who want to get their hands on a particular NFT, but shy away from buying it because of
                                steep prices or other reasons. With our protocol, you can simply borrow NFTs from their original holders on a reasonable rate determined by
                                project-specific NFT experts.Click on the button above to request verification from an expert.
                            </Text>
                        </div>
                    </div>
                </Card>
            <Modal title="Expert Form" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
                    <Form.Item
                        name={["user", "username"]}
                        label="Username"
                        rules={[
                        {
                            required: true
                        }
                        ]}
                        >
                    <Input placeholder= "The name by which you're known in the community"/>
                    </Form.Item>
                        <Form.Item
                        name={["user", "association"]}
                        label="Association"
                        rules={[
                        {
                            required: true
                        }
                        ]}
                        >
                    <Input placeholder="Ex. YGG | ThugDAO etc." />
                    </Form.Item>
                    <Form.Item
                        name={["user", "twthandle"]}
                        label="Twitter Handle"
                        rules={[
                        {
                            required: true
                        }
                        ]}
                        >
                    <Input placeholder="Just the handle" />
                    </Form.Item>
                    <Form.Item
                        name={["user", "experienceInMonths"]}
                        label="Experience (Months)"
                        rules={[
                        {
                            type: "number",
                            min: 0,
                            max: 121,
                            required: true
                        }
                        ]}
                    >
                    <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="projects"
                        label="Select NFT Project(s)"
                        rules={[
                        {
                            required: true,
                            message: 'Please select your NFT Project!',
                            type: 'array',
                        },
                        ]}
                    >
                        <Select style={{color: "green"}} mode="multiple" placeholder="Please select your NFT Project!">
                            {NFTList.map(n => <Option value = {n}> {n} </Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Lender Form" visible={lenderModalVisible} onOk={() => setLenderModalVisible(false)} onCancel={() => setLenderModalVisible(false)}>
                <Form {...layout} name="nest-messages" onFinish={onLenderFinish} validateMessages={validateMessages} >
                    <Form.Item
                        name={["user", "nftName"]}
                        label="Select NFT"
                        rules={[
                        {
                            required: true,
                            message: 'Please select one of your NFTs!!',
                        }
                        ]}
                    >
                        <Select placeholder = "List of your NFTs">
                            {nftInfoState.map(nftInfo => <Option value={nftInfo.name}> {nftInfo.name.toString()} </Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={["user", "collateralAsset"]}
                        label="Collateral Asset"
                        rules={[
                        {
                            required: true,
                            message: 'Please select desired collateral asset!!',
                        },
                        ]}
                    >
                        <Select placeholder>
                        {listOfTokens.map(token => <Option value={token.symbol}> {token.symbol} </Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={["user", "maxRentalDays"]}
                        label="Max Rental Days"
                        rules={[
                        {
                            type: "number",
                            min: 1,
                            max: 367,
                            required: true
                        }
                        ]}
                    >
                    <InputNumber />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

/*
    Debugging console.log statements
        //console.log(nftNames);
        //setNftNamesCheck([...nftNames]);
        // for(let i = 0; i < nftNames.length; i++) {
        //   console.log("For NFT no. ", i);
        //   console.log("Names: ", nftNames[i]);
        //   console.log("Description: ", nftDescriptions[i]);
        //   console.log("Address: ", nftAddresses[i]);
        //   console.log("Token ID: ", nftTokenIDs[i]);
        // }

                    //await setNftNamesCheck([...nftNamesCheck, JSON.stringify(nftName)]);
            //console.log(nftName);

                        //await setNftNamesCheck([...nftNamesCheck, JSON.stringify(nftName)]);
            //console.log(nftName);

                    //console.log(userEthNFTs);
        //console.log(userEthNFTs.result.length);
*/