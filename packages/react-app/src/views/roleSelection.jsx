import React, { useState, useContext } from "react";
import { Button, Card, Divider, Modal, Typography, Form, Input, InputNumber, Select, Switch, } from "antd";
import { DummyDataContext } from "../context/dummy";
import { Address, AddressInput } from "../components";
import { useTokenList } from "eth-hooks/dapps/dex";
import { useHistory } from "react-router-dom";

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
    const {nftData, setNftData} = useContext(DummyDataContext);
    
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
        console.log(values.user);
        alert(values.user.nftName);
        setNftName(values.user.nftName);
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
                            <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setLenderModalVisible(true)}>NFT Lender</Button>
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
                        label="Name of NFT"
                        rules={[
                        {
                            required: true
                        }
                        ]}
                    >
                        <Input placeholder="Name of NFT to be listed" />
                    </Form.Item>
                    <Form.Item
                        name={["user", "nftAddress"]}
                        label="NFT Address"
                        rules={[
                        {
                            required: true
                        }
                        ]}
                        >
                        <AddressInput ensProvider={mainnetProvider} />
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