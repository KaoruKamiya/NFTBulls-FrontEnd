import { utils } from "ethers";
import { Select } from "antd";
import React, { useState } from "react";
import { Address, AddressInput } from "../components";
import { useTokenList } from "eth-hooks/dapps/dex";

const { Option } = Select;

export default function Lender({ 
    yourLocalBalance, 
    mainnetProvider, 
    price, 
    address,
    nftName,
    nftAddress 
}) {

  const [selectedToken, setSelectedToken] = useState("Pick a token!");
  const [duration, setDuration] = useState("0");
  const listOfTokens = useTokenList(
    "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json",
  );

  return (
      <div>
        <div style={{ border: "1px solid #cccccc", padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
            <h2 style={{fontSize: "relative", color: "green"}}>{nftName} <span style={{color: "whitesmoke"}}>NFT Loaning Terms</span></h2> 

            <div style={{ margin: 8 }}>
            <div>
              Desired Borrow Asset
            </div>
            <Select
              showSearch
              value={selectedToken}
              onChange={value => {
                console.log(`selected ${value}`);
                setSelectedToken(value);
              }}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              optionFilterProp="children"
            >
              {listOfTokens.map(token => (
                <Option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ margin: 8 }}>
              <div>
                Select Rental Duration
              </div>
              <input type="text" value={duration} style = {{color: "black"}} onChange={e => setDuration(e.target.value)}/>
          </div>

        </div>
      </div>
  );
}