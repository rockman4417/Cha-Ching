import React, {useState} from 'react'
import Dashboard from './Dashboard'
import NewUser from './NewUser'
import { isEmpty, useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import NewUserCheck from './NewUserCheck'

export default function DashboardWrapper() {
    

    const { displayName, uid } = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();
  const history = useHistory();

  useFirestoreConnect(
    {
    collection: `users`,
    doc: uid,
    storeAs: "user"
    }
)


const user = useSelector((state) => state.firestore.data.user);




    if(user) {return (
         <div>
        <NewUserCheck user={user} uid={uid} />
        </div>
    )} else return (<div>hi</div>)
}
