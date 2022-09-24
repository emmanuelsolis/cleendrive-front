import {  Card } from 'antd';


const { Meta } = Card;

const CarProfile = (props) => {
    return (
        <div className='cards'>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img src={props.img} alt={props.alt} />}   
            >   
                <Meta title={props.title} description={props.description} /> 
           
            
            <h1>{props.carName}</h1>
            <h2>{props.carModel}</h2>
            <h2>{props.carBrand}</h2>
            <h2>{props.carYear}</h2>
            <h2>{props.carPlate}</h2>
            <h2>{props.carColor}</h2>
            </Card>
        </div>
    )
}

export default CarProfile;