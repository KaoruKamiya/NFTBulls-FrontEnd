import React, {useState, useContext} from "react";
import {Button, Card, Col, Row, Typography} from 'antd';
import { DummyDataContext } from "../context/dummy";
 
const {Meta} = Card;
const {Paragraph} = Typography;

export default function BorrowerView() {
    const {rentedNftData} = useContext(DummyDataContext);
    return (
        <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 16 }}>
            <h1>Borrower Gallery</h1>
                <div style={{padding: "30px"}}>
                    <Row gutter={16}>
                        {
                            rentedNftData.map(nftInfo =>  
                                <Col span={8}>
                                    <Card title={<Paragraph copyable>{nftInfo.nftName}</Paragraph>}
                                        hoverable={true} 
                                        bordered={true} 
                                        cover={<img alt={nftInfo.nftName} src={nftInfo.img}/>}
                                        extra = {<Button>Pay Collateral of {nftInfo.collateralAmount} {nftInfo.collateralAsset}</Button>}
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
    );
}