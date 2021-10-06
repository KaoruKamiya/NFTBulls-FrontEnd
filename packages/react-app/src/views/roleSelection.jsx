import React, { useState } from "react";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Typography, Spin, Switch} from "antd";
const {Text} = Typography;

export default function RoleSelection() {
    const [nftRole, setNftRole] = useState();
    return(
        <div style={{width: "80%", margin: "auto", marginTop: 64 }}>
            <Card style={{ marginTop: 32 }}>
                <div>
                    <h1>Select your role</h1>
                    <div style={{ marginTop: 20 }}>
                        <Button type="primary" size="large" style={{marginBottom: 20}}>NFT Expert</Button>
                        <br/>
                        <Text>
                            We welcome experts of various NFT projects on our platform. You can now monetise your expertise by helping the community
                            in the fair price discovery of their NFTs for lending. Click on the button above to verify yourself. 
                        </Text>
                    </div>
                    <Divider />
                    <div style={{ marginTop: 20 }}>
                        <Button type="primary" size="large" style={{marginBottom: 20}}>NFT Lender</Button>
                        <br/>
                        <Text>
                            We welcome all NFT holders on our platform. With our protocol, you can now generate some passive income from your NFTs by lending your
                            NFTs to verified borrowers at a fair price determined by your NFT project experts.
                            Click on the button above to list your NFTs for lending.
                        </Text>
                    </div>
                    <Divider />
                    <div style={{ marginTop: 20 }}>
                        <Button type="primary" size="large" style={{marginBottom: 20}}>NFT Borrower</Button>
                        <br/>
                        <Text>
                            We welcome all NFT enthusiasts on our platform who want to get their hands on a particular NFT, but shy away from buying it because of
                            steep prices or other reasons. With our protocol, you can simply borrow NFTs from their original holders on a reasonable rate determined by
                            project-specific NFT experts.Click on the button above to request verification from an expert.
                        </Text>
                    </div>
                </div>
            </Card>
        </div>
    );
}