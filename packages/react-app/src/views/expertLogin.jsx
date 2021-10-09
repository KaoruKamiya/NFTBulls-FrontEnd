import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import { Address, AddressInput } from "../components";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
  initialValues: {
      size: "large",
  },
};

export default function Expert({  
    mainnetProvider, 
    nftName,
}) {

  const [modalVisible, setModalVisible] = useState(false);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!"
    },
    number: {
      range: "${label} must be between ${min} and ${max}"
    }
  };

  const onFinish = (values) => {
    console.log(values.user.borrowerAddress);
    alert(values.user.borrowerAddress);
    // setExpertListData([...expertListData, {key:JSON.stringify(expertListData.length + 1),
    //                                         twthandle: "https://twitter.com/".concat(values.user.twthandle.toString()),
    //                                         ... values.user,
    //                                         expertise: values.projects,
    //                                         loansFacilitated: 0,
    //                                         verified: "Pending"}]);
};

  return (
      <div>
        <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 64 }}>
          <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setModalVisible(true)}>Verify Borrower</Button>
          <br/>
        </div>
        <div style={{ border: "1px solid #cccccc", padding: 16, width: "80%", margin: "auto", marginTop: 32 }}>
            <h2 style={{fontSize: "relative", color: "green"}}>{nftName} <span style={{color: "whitesmoke"}}>NFT Loaning Terms</span></h2> 
        </div>
        <Modal title="Expert Form" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={["user", "borrowerAddress"]}
              label="Borrower Address"
              rules={[
              {
                  required: true
              }
              ]}
              >
                <AddressInput ensProvider={mainnetProvider} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
}
  