import React, { useState, useEffect } from 'react'
import { Profile, EditProfile, FormItem } from '../components'
import { Button } from 'antd'
import { useNavigation, Link } from "react-router-dom";
import { myProfileWs, editUserWs, deleteProfileWs } from '../services/user-ws'




const MyProfile = (props) => {
    const { handleLogout, Data } = props
    const [profileUser, setProfileUser] = useState([])
    const [isEdited, setIsEdited] = useState(false);
    const [status, setStatus] = useState(Data);
    
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
     <Link to={"/user/edit-profile"}>Editar Perfil</Link>
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
        />
    
        {isEdited && <EditProfile setIsEdited={setIsEdited} />}
      {/* {isEdited && <Link to="/user/edit-profile">Editar Perfil</Link>} */}

    </div>
  )
}

export default MyProfile



