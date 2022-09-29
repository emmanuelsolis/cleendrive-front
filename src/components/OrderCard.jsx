import { Card, Row, Col } from "antd";

const { Meta } = Card;

const OrderCard = (props) => {
  console.log("LOS PROPS", props);
  return (
    <div className="cards">
      {/* <Card hoverable> */}
        {/* <Row gutter={[40, 16]}>
          <Col span={8}>{props.oder}</Col>
          <Col span={8}>{props.number}</Col>
          <Col span={8}>{props.date}</Col>
          <Col span={8}>{props.name}</Col>
          <Col span={8}>{props.client}</Col>
          <Col span={8}>{props.owner}</Col>
          <Col span={8}>{props.phone}</Col>
          <Col span={8}>{props.address}</Col>
          <Col span={8}>{props.subtotal}</Col>
          <Col span={8}>{props.payment}</Col>
          <Col span={8}>{props.status}</Col>
          <Col span={8}>{props.deliver}</Col>
         
        </Row> */}
      {/* </Card> */}
    </div>
  );
};

export default OrderCard;
