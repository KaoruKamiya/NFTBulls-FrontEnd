import { utils } from "ethers";
import { Select } from "antd";
import React, { useState } from "react";
import { Address, AddressInput } from "../components";
import { useTokenList } from "eth-hooks/dapps/dex";
import { red } from "chalk";

const { Option } = Select;

export default function Expert({ 
    yourLocalBalance, 
    mainnetProvider, 
    price, 
    address,
    nftName,
    nftAddress 
}) {

  return (
      <div>
        <div style={{ border: "1px solid #cccccc", padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
            <h2 style={{fontSize: "relative", color: "green"}}>{nftName} <span style={{color: "whitesmoke"}}>NFT Loaning Terms</span></h2> 
        </div>
      </div>
  );
}
  