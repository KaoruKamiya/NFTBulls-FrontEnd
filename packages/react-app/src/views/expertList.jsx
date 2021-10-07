import React, {useContext} from "react";
import {Table, Tag, Space} from 'antd';
import { DummyDataContext } from "../context/dummy";

const {Column, ColumnGroup} = Table;
//    <h1>YO!! {expertListData.map(n => n)}</h1>

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
            twthandle: "jhncrypto"
        },
        {
          key: '2',
          username: 'Jim',
          experienceInMonths: 12,
          expertise: ['CryptoPunks'],
          verified: "Pending",
          association: "Independent",
          loansFacilitated: 0,
          twthandle: 'jimeth'
        },
        {
          key: '3',
          username: 'Joe',
          experienceInMonths: 32,
          expertise: ['Galatic Apes', 'Bored Ape Yacht Club'],
          verified: "Verified",
          association: "ThugDAO",
          loansFacilitated: 8,
          twthandle: "kJoe",
        },
    ];

    const {name, expertListData} = useContext(DummyDataContext);


    return(
    <div style={{width: "80%", margin: "auto", marginTop: 64 }}>
        <Table dataSource={expertListData}>
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
        <Column title="Twitter Handle" dataIndex="twthandle" key="twthandle" />
      </Table>
    </div>
    );
}
