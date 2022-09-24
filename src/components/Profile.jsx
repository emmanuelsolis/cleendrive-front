import React, { useState, useEffect } from 'react'
import { Card, Button} from "antd";
import { FormItem, EditProfile } from "../components";
import { Link } from "react-router-dom";
import { myProfileWs, deleteProfileWs } from '../services/user-ws'
import "../App.css";
const Profile = (props) => {
  const { handleLogout, Data } = props
    const [profileUser, setProfileUser] = useState([])
    const [isEdited, setIsEdited] = useState(false);
    const [status, setStatus] = useState(Data);
  // console.log("El  profileUserVale", props.profileUser.firstName);
  // console.log("LAS PROPS", props);
  const { user } = props;
  // console.log("EL USER", user);
  useEffect(() => {
    myProfileWs(props.user._id)
        .then((res) => {
            console.log("EL RESS",res.data.user)
            setProfileUser(res.data.user)
        })
        .catch((err) => {
            console.log("el error",err)
        })
},[setProfileUser])

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
        <Button><Link to={"/user/edit-profile"}>Editar</Link></Button><br /><br /> <hr /> <br />
     <FormItem
                    button_text="Eliminar Perfil"
                    type="button"
                    onClick={() => setStatus(deleteProfileWs(Data)
                    .then(() => {
                        handleLogout(prevState => !prevState)
                    })
                    .cath((error)=>{
                        console.log(error)
                    }))
                    }
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    className="btn-component"
        />
      </Card>
      {isEdited && <EditProfile setIsEdited={setIsEdited} />}
    </div>
  );
};

export default Profile;
