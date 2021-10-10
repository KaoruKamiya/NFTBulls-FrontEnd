import { utils } from "ethers";
import { Select, Button, Card, Col, Row, Typography } from "antd";
import React, { useState, useContext } from "react";
import { Address, AddressInput } from "../components";
import { useTokenList } from "eth-hooks/dapps/dex";
import { DummyDataContext } from "../context/dummy";
import Moralis from "moralis";

const { Option } = Select;
const {Meta} = Card;
const {Paragraph} = Typography;

export default function Lender({ 
    yourLocalBalance, 
    mainnetProvider, 
    price, 
    address,
}) {
  const [selectedToken, setSelectedToken] = useState("Pick a token!");
  const [duration, setDuration] = useState("0");
  const listOfTokens = useTokenList(
    "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json",
  );

  const {lenderNftData} = useContext(DummyDataContext);

  return (
    <div>
      <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
        <h1>Lender NFT Gallery</h1> 
          <div style={{padding: "30px"}}>
              <Row gutter={16}>
                  {
                      lenderNftData.map(nftInfo =>  
                          <Col span={8}>
                              <Card title={<Paragraph copyable>{nftInfo.nftName}</Paragraph>}
                                  hoverable={true} 
                                  bordered={true} 
                                  extra={<Button size="large" style={{border: "border: 2px solid #4CAF50"}} onClick={() => setLoanModalVisible(true)}>Approve Loan Terms</Button>}
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
    </div>
  );
}