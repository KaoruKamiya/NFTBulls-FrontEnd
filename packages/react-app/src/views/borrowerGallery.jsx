import React, {useState, useContext} from "react";
import {Button, Card, Col, Row} from 'antd';
import { DummyDataContext } from "../context/dummy";

export default function Borrower() {

    const onClick = () =>  {
        alert("Rent this NFT");
    }

    const {nftName} = useContext(DummyDataContext);

    return (
        <div>
            <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
                <h1>NFT Gallery (Borrower View) </h1> 
                <h1>Print ho jaa bhai: {nftName}</h1>
                <div style={{padding: "30px"}}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={nftName}
                                hoverable={true} 
                                bordered={true} 
                                extra={<Button style={{border: "border: 2px solid #4CAF50"}} onClick={onClick}>Rent this NFT</Button>}
                            >
                                Card Content
                            </Card>        
                        </Col>
                        <Col span={8}>
                            <Card title="Card Title" bordered={true}>
                                Card Content
                            </Card>        
                        </Col>
                        <Col span={8}>
                            <Card title="Card Title" bordered={true}>
                                Card Content
                            </Card>        
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}