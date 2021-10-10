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
    let nftNames = [];
    let nftAddresses = [];
    let nftTokenIDs = [];
    let nftDescriptions = [];

    const options = {
      chain: "eth", 
      address: "0x31a5ff62a1b2c0f030aee1661eab6513ae676e23"
    }
    const userEthNFTs = await Moralis.Web3API.account.getNFTs(options);
    console.log(userEthNFTs);
    console.log(userEthNFTs.result.length);
    let nftOptionsLength = 50;
    if(userEthNFTs.result.length < nftOptionsLength) {
      nftOptionsLength = userEthNFTs.result.length;
    }
    for(let i = 0; i < nftOptionsLength; i++) {
      var nftAddress = userEthNFTs.result[i].token_address;
      var nftTokenID = userEthNFTs.result[i].token_id;
      nftTokenIDs.push(nftTokenID);
      nftAddresses.push(nftAddress);
      if(userEthNFTs.result[i].metadata !== null) {
        const metadataObj = JSON.parse(userEthNFTs.result[i].metadata);
        //console.log("Name: ", metadataObj["name"]);
        var nftName = metadataObj["name"];
        nftNames.push(nftName);
        if(metadataObj["description"] != null) {
          nftDescriptions.push(metadataObj["description"]);
        } else {
          nftDescriptions.push("No description available");
        }
      } else {
        const name = userEthNFTs.result[i].name.toString();
        const tokenId = userEthNFTs.result[i].token_id.toString();
        //console.log("Name: ".concat(name.concat(tokenId)));
        var nftName = name.concat(tokenId);
        nftNames.push(nftName);
        nftDescriptions.push("No descriptions available");
      }
    }
    for(let i = 0; i < nftNames.length; i++) {
      console.log("For NFT no. ", i);
      console.log("Names: ", nftNames[i]);
      console.log("Description: ", nftDescriptions[i]);
      console.log("Address: ", nftAddresses[i]);
      console.log("Token ID: ", nftTokenIDs[i]);
    }
  }

  return (
      <div>
        <div style={{ border: "1px solid #cccccc", padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
          <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
            <Button type="primary" size="large" style={{marginBottom: 20}} onClick = {fetchNFTs}>Test Button</Button>
            <br/>
          </div>

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