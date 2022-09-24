import { Image, Card } from "antd";

const Profile = (props) => {
  console.log("El  profileUserVale", props.profileUser.firstName);
  console.log("LAS PROPS", props)
  const { user } = props;
  console.log('EL USER', user);
  const { imageUrl, firstName, lastName, email, phoneNumber, address, role } = props.profileUser 
  return (
    <div className="cards">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img src={imageUrl} alt={"Usuario"}user={user}/>}
      >
      <h1>Hola Mundo</h1>
        <div>
        
          {firstName} {lastName}
          
        </div>
      </Card>
    </div>
  );
};

export default Profile;
