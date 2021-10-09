import React, {useState, useContext} from "react";
import {Button, Card, Col, Row} from 'antd';
import { DummyDataContext } from "../context/dummy";

const {Meta} = Card;

export default function Borrower() {

    const onClick = () =>  {
        alert("Rent this NFT");
    }

    const {nftData} = useContext(DummyDataContext);

    return (
        <div>
            <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
                <h1>NFT Gallerdsafsy (Borrower View) </h1> 
                    <div style={{padding: "30px"}}>
                        <Row gutter={16}>
                            {
                                nftData.map(nftInfo =>  
                                    <Col span={8}>
                                        <Card title={nftInfo.nftName}
                                            hoverable={true} 
                                            bordered={true} 
                                            extra={<Button size="large" style={{border: "border: 2px solid #4CAF50"}} onClick={onClick}>Rent this NFT</Button>}
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
        </div>
    );
}