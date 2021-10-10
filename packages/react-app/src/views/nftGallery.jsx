import React, {useState, useContext} from "react";
import {Button, Card, Col, Row, Typography, Modal, Input, Form, InputNumber} from 'antd';
import { DummyDataContext } from "../context/dummy";
 
const {Meta} = Card;
const {Paragraph} = Typography;

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

export default function Gallery() {
    const [modalVisible, setModalVisible] = useState(false);
    const {approvedNftData} = useContext(DummyDataContext);
    const {rentedNftData, setRentedNftData} = useContext(DummyDataContext);

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

    const onFinish = (values) => {
        for(let i = 0; i < approvedNftData.length; i++) {
            if(values.user.nftName == approvedNftData[i].nftName) {
                setRentedNftData([...rentedNftData, approvedNftData[i]]);
            }
        }
        alert("Check out your dashboard for the next steps!!");
    };

    return (
        <div>
        <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 32 }}>
        <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setModalVisible(true)}>Rent NFT</Button>
        <br/>
        </div>
            <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 16 }}>
                <h1>NFT Gallery </h1> 
                    <div style={{padding: "30px"}}>
                        <Row gutter={16}>
                            {
                                approvedNftData.map(nftInfo =>  
                                    <Col span={8}>
                                        <Card title={<Paragraph copyable>{nftInfo.nftName}</Paragraph>}
                                            hoverable={true} 
                                            bordered={true} 
                                            cover={<img alt={nftInfo.nftName} src={nftInfo.img}/>}
                                            size = "large"
                                        >
                                        <Meta title = "Transfer To: " description = {(nftInfo.borrowType)}/>
                                        <br />
                                        <Meta title = "Collateral for your NFT: " description = {(nftInfo.collateralAmount)}/>
                                        <br />
                                        <Meta title ="Proposed Daily Rent Price: " description = {(nftInfo.dailyRentPrice)}/>
                                        <br />
                                        <Meta title = "Repayment Interval: " description = {(nftInfo.repayInterval)}/>
                                        <br />
                                        <Meta title ="NFT Address: " description = {(nftInfo.nftAddress)}/>
                                        <br />
                                        <Meta title ="NFT Token ID: " description = {nftInfo.tokenID}/>
                                        <br />
                                        <Meta title ="Desired Collateral Asset: " description = {(nftInfo.collateralAsset)}/>
                                        <br />
                                        <Meta title ="Maximum Rental Duration: " description = {(nftInfo.maxRentalDays)}/>
                                        <br />
                                        <Meta title ="Description: " description = {(nftInfo.description)}/>
                                        </Card>        
                                    </Col>
                                )
                            }
                        </Row>
                    </div>
            </div>
            <Modal title="Rent NFT" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
                    <Form.Item
                        name={["user", "nftName"]}
                        label="Name of NFT"
                        rules={[
                        {
                            required: true
                        }
                        ]}
                        >
                        <Input placeholder = "Copy and paste name of NFT" />
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