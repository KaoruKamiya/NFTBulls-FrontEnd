import React, {useState, useContext} from "react";
import {Button, Card, Col, Row, Typography} from 'antd';
import { DummyDataContext } from "../context/dummy";
 
const {Meta} = Card;
const {Paragraph} = Typography;

export default function Borrower() {
    const {approvedNftData} = useContext(DummyDataContext);

    return (
        <div>
            <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
                <h1>NFT Gallery (Borrower View) </h1> 
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
        </div>
    );
}