import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="🐂 NFTBulls"
        subTitle="Loan your NFTs at expert approved prices"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
