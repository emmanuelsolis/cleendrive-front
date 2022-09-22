import {  Image } from 'antd';

const CarProfile = (props) => {
    return (
        <div>
            <Image
                width={200}
                src={props.imageUrl}
            />
            <h1>{props.carName}</h1>
            <h2>{props.carModel}</h2>
            <h2>{props.carBrand}</h2>
            <h2>{props.carYear}</h2>
            <h2>{props.carPlate}</h2>
            <h2>{props.carColor}</h2>
        </div>
    )
}

export default CarProfile;