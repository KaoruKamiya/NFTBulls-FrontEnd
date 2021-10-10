import { Select, Button, Card, Col, Row, Typography, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useContext } from "react";
import { Address, AddressInput } from "../components";
import { useTokenList } from "eth-hooks/dapps/dex";
import { DummyDataContext } from "../context/dummy";
import Moralis from "moralis";

const { Option } = Select;
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

export default function Lender({ 
    yourLocalBalance, 
    mainnetProvider, 
    price, 
    address,
}) {

  const {lenderNftData} = useContext(DummyDataContext);
  const {approvedNftData, setApprovedNftData} = useContext(DummyDataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

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

  const onEditFinish = (values) => {
    for(let i = 0; i < lenderNftData.length; i++) {
      if(lenderNftData[i].nftName == values.user.nftName) {
        setApprovedNftData([...approvedNftData, {
          borrowType: values.user.borrowType,
          collateralAmount: values.user.collateralAmount,
          dailyRentPrice: values.user.dailyRentPrice,
          repayInterval: values.user.repayInterval,
          tokenID: lenderNftData[i]["tokenID"],
          collateralAsset: lenderNftData[i]["collateralAsset"],
          maxRentalDays: lenderNftData[i]["maxRentalDays"],
          description: lenderNftData[i]["description"],
          img:lenderNftData[i]["img"],
          nftAddress: lenderNftData[i]["nftAddress"],
          nftName: values.user.nftName
        }]);
      }
    }
    alert("Your NFT is now successfully listed on the market with your customized terms");
  }

  const onFinish = (values) => {
    for(let i = 0; i < lenderNftData.length; i++) {
      if(lenderNftData[i].nftName == values.user.nftName) {
        setApprovedNftData(...approvedNftData, lenderNftData);
      }
    }
    alert("Your NFT is now successfully listed on the market");
  };

  return (
    <div>
    <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 32 }}>
      <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setModalVisible(true)}>Approve Loan Terms</Button>
      <br/>
      <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setEditModalVisible(true)}>Customize Loan Terms</Button>
    </div>
      <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 16 }}>
        <h1>Lender NFT Gallery</h1> 
          <div style={{padding: "30px"}}>
              <Row gutter={16}>
                  {
                      lenderNftData.map(nftInfo =>  
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
      <Modal title="Term Approval" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
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
      <Modal title="Edit Terms" visible={editModalVisible} onOk={() => setEditModalVisible(false)} onCancel={() => setEditModalVisible(false)}>
        <Form {...layout} name="nest-messages" onFinish={onEditFinish} validateMessages={validateMessages} >
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
          <Form.Item
            name={["user", "borrowType"]}
            label="Transfer NFT to"
            rules={[
            {
                required: true,
                message: 'Please select where the NFT should be transferred!!',
            },
            ]}
          >
            <Select placeholder="NFT can be transferred to...">
              {[`Borrower's Wallet`, `MultiSig Wallet`].map(borrowOption => <Option value={borrowOption.toString()}> {borrowOption.toString()} </Option>)}
            </Select>
          </Form.Item>
          <Form.Item
              name={["user", "collateralAmount"]}
              label="Collateral Amount"
              rules={[
              {
                  required: true,
                  message: 'Please provide suitable collateral amount for this NFT!',
                  type: "number",
                  min: 0,
                  max: 1000000000,
              }
              ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={["user", "dailyRentPrice"]}
            label="Daily Rent"
            rules={[
            {
                required: true,
                message: 'Please provide suitable daily rent for this NFT!',
                type: "number",
                min: 0,
                max: 1000000000,
            }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={["user", "repayInterval"]}
            label="Repayment Interval"
            rules={[
            {
                required: true,
                message: 'Please provide suitable repayment interval for this loan',
                type: "number",
                min: 0,
                max: 1000000000,
            }
            ]}
          >
            <InputNumber placeholder = "in days ... " />
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