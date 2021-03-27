import React, {useState} from 'react'
import Dashboard from './Dashboard'
import NewUser from './NewUser'
import { isEmpty, useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

export default function DashboardWrapper({user, uid}) {
    const [existingUser, setExistingUser] = useState(user.user_info ? true : false)
    

   
console.log('logged in user', user)


    return (

        existingUser ? <Dashboard user={user} uid={uid}/> 

                     : <NewUser user={user} uid={uid} setExistingUser={setExistingUser}/>
    )
}
