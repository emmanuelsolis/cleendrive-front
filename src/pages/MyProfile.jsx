import { Image, Card } from "antd";
import React, { useState, useEffect } from 'react'
import { Profile, EditProfile } from '../components'
import { myProfileWs } from '../services/user-ws'




const MyProfile = (props) => {
    const [profileUser, setProfileUser] = useState([])
    const [isEdited, setIsEdited] = useState(false);
    
    console.log("LAS PROPSSSS", props)
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
    
    const { imageUrl, firstName, lastName, email, phoneNumber, address, role } = profileUser
    console.log("Profile User", profileUser);
  return (
    <div>
      <Profile {...props}  profileUser={ profileUser }/>
        {isEdited && <EditProfile setIsEdited={setIsEdited} />}
    </div>
    // <div>
    //   <Profile
    //     img="https://res.cloudinary.com/dvgmi864m/image/upload/v1662520902/EventQuote/EventQuote_blanco_bzlfob.png"
    //     name={"Jorge"}
    //     lastName={"Garcia"}
    //     email={'jorge@gmail.com'}
    //     phone={123456789}
    //     address={"Calle 123"}
    //     role={"Client"}
    //     />
    //     {isEdited && <EditProfile setIsEdited={setIsEdited} />}
    // </div>
  )
}

export default MyProfile



