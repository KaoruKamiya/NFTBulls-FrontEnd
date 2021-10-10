import { Button, Form, Modal, Input, Card, Row, Col } from "antd";
import React, { useState, useContext } from "react";
import { Address, AddressInput } from "../components";
import { DummyDataContext } from "../context/dummy";
 
const {Meta} = Card;

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

export default function Expert({  
    mainnetProvider, 
}) {

  const [modalVisible, setModalVisible] = useState(false);

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
    console.log(values.user.borrowerAddress);
    alert(values.user.borrowerAddress);
  };

  const onClick = () =>  {
    alert("Rent this NFT");
  };

  const {nftData} = useContext(DummyDataContext);

  return (
      <div>
        <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
          <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setModalVisible(true)}>Verify Borrower</Button>
          <br/>
        </div>
        <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
        <h1>NFT Gallery (Borrower View) </h1> 
            <div style={{padding: "30px"}}>
                <Row gutter={16}>
                    {
                        nftData.map(nftInfo =>  
                            <Col span={8}>
                                <Card title={nftInfo.nftName}
                                    hoverable={true} 
                                    bordered={true} 
                                    extra={<Button size="large" style={{border: "border: 2px solid #4CAF50"}} onClick={onClick}>Propose Loan Terms</Button>}
                                    cover={<img alt={nftInfo.nftName} src={nftInfo.img}/>}
                                    size = "large"
                                >
                                    <Meta description = {"NFT Address: ".concat(nftInfo.nftAddress)}/>
                                    <br />
                                    <Meta description = {"Desired Collateral Asset: ".concat(nftInfo.collateralAsset)}/>
                                    <br />
                                    <Meta description = {"Maximum Rental Duration: ".concat(nftInfo.maxRentalDays)}/>
                                    <br />
                                    <Meta description = {"Description: ".concat(nftInfo.description)}/>
                                </Card>        
                            </Col>
                        )
                    }
                </Row>
            </div>
        </div>
        <Modal title="Expert Form" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={["user", "borrowerAddress"]}
              label="Borrower Address"
              rules={[
              {
                  required: true
              }
              ]}
              >
                <AddressInput ensProvider={mainnetProvider} />
            </Form.Item>
            <Form.Item
              name={["user", "twtHandle"]}
              label="Twitter Handle"
              rules={[
              {
                  required: true
              }
              ]}
            >
              <Input placeholder= "Twitter handle for verification"/>
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
  