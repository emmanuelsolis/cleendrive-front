import { Card } from 'antd';

const { Meta } = Card;

const ServiceCard = (props) => {
    console.log("LOS PROPS", props);
    return (
        <div className="cards">

            <Card
                hoverable
                style={{ width: 440 }}
                cover={<img alt="example" src={props.img} />}
            >
                <Meta title={props.name} description={props.description} /><br />
                <span><b>Precio del Servicio:</b> ${props.price}.00</span><br />
                <span><b>Tiempo de entrega:  </b>{props.deliverTime}hrs</span>
            </Card>
        </div>
    )
}

export default ServiceCard