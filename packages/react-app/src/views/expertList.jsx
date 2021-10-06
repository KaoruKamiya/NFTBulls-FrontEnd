import React from "react";
import {Table, Tag, Space} from 'antd';

const {Column, ColumnGroup} = Table;

export default function ExpertList() {
    const data = [
        {
            key: '1',
            username: 'John',
            experienceInMonths: 22,
            expertise: ['CryptoPunks', 'Axie Infinity'],
            verified: "Verified",
            association: "YGG",
            loansFacilitated: 2,
        },
        {
          key: '2',
          username: 'Jim',
          experienceInMonths: 12,
          expertise: ['CryptoPunks'],
          verified: "Pending",
          association: "Independent",
          loansFacilitated: 0
        },
        {
          key: '3',
          username: 'Joe',
          experienceInMonths: 32,
          expertise: ['Galatic Apes', 'Bored Ape Yacht Club'],
          verified: "Verified",
          association: "ThugDAO",
          loansFacilitated: 8
        },
    ];

    return(
    <div style={{width: "80%", margin: "auto", marginTop: 64 }}>
        <Table dataSource={data}>
        <Column title="Expert's Name" dataIndex="username" key="username" />
        <Column title="Experience in Months" dataIndex="experienceInMonths" key="experienceInMonths" />
        <Column
          title="Expertise"
          dataIndex="expertise"
          key="expertise"
          render={projects => (
            <>
              {projects.map(project => (
                <Tag color="blue" key={project}>
                  {project}
                </Tag>
              ))}
            </>
          )}
        />
        <Column title="Verification Process" dataIndex="verified" key="verified" />
        <Column title="Expert's Associations" dataIndex="association" key="association" />
        <Column title="Loans Facilitated" dataIndex="loansFacilitated" key="loansFacilitated" />
      </Table>
    </div>
    );
}
