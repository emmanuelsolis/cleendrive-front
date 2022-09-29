import React, { useState, useEffect } from 'react'
import { Profile } from '../components'
import { myProfileWs } from '../services/user-ws'




const MyProfile = (props) => {
    const [profileUser, setProfileUser] = useState([])
    
    
    // console.log("LAS PROPSSSS", props)
    useEffect(() => {
        myProfileWs(props.user._id)
            .then((res) => {
                // console.log("EL RESS",res.data.user)
                setProfileUser(res.data.user)
            })
            .catch((err) => {
                console.log("el error",err)
            })
    },[setProfileUser])
    
  return (
    <div>
      <Profile {...props}  profileUser={ profileUser }/>
    </div>
  )
}

export default MyProfile



