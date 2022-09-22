import { Card, Button } from 'antd';
const { Meta } = Card;

const CardDetails= (props) => (
  <Card
  hoverable
    style={{
      width: 300,
    }}
    cover={<img src={props.img} alt=""/>}
  
  >
    <Meta
      title={props.name}
      description={props.description}
    />
  <Button type='primary' htmlType='submit'>
        Editar
  </Button>
  <Button type='primary' htmlType='submit'>
        Eliminar
  </Button>
  </Card>
);

export default CardDetails;