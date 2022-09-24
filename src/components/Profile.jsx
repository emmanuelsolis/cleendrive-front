import { Card } from "antd";
import "../App.css";

const Profile = (props) => {
  console.log("El  profileUserVale", props.profileUser.firstName);
  console.log("LAS PROPS", props);
  const { user } = props;
  console.log("EL USER", user);
  const { imageUrl, firstName, lastName, email, phoneNumber, role } =
    props.profileUser;
  return (
    <div className="cards">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img src={imageUrl} alt={"Usuario"} user={user} />}
      >
        <h1>
          {firstName} {lastName}
        </h1>
        <h2> {email}</h2>
        <h2> {phoneNumber}</h2>
        <h2> {role}</h2>
      </Card>
    </div>
  );
};

export default Profile;
