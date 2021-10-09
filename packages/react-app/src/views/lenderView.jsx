import { utils } from "ethers";
import { Select, Button } from "antd";
import React, { useState } from "react";
import { Address, AddressInput } from "../components";
import { useTokenList } from "eth-hooks/dapps/dex";
import Moralis from "moralis";

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

  const searchNFTs = async () => {
    let apes = await Moralis.Web3API.token.searchNFTs({q: "bored"});
    console.log(apes);
  }

  const userBalance = async() => {
    const options = {chain: 'eth',
                     address: "0xabD0127D996A468A79a0a8e88F4D419E40402e95"                
    };
    const balances = await Moralis.Web3API.account.getTokenBalances(options);
    console.log(balances);
  }

  const fetchNFTs = async() => {
    const options = {
      chain: "eth", 
      address: "0xabD0127D996A468A79a0a8e88F4D419E40402e95"
    }
    const userEthNFTs = await Moralis.Web3API.account.getNFTs(options);
    console.log(userEthNFTs);
    //alert(typeof userEthNFTs.result[0].metadata)
    const metadataString = JSON.stringify(userEthNFTs.result[0].metadata);
    console.log(JSON.parse(userEthNFTs.result[0].metadata));
    //alert(userEthNFTs.result[0].metadata);
  }

  return (
      <div>
        <div style={{ border: "1px solid #cccccc", padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
          <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
            <Button type="primary" size="large" style={{marginBottom: 20}} onClick = {fetchNFTs}>Test Button</Button>
            <br/>
          </div>
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