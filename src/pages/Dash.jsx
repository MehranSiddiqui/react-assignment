import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import { Avatar } from "@mui/material";
const Dash = () => {
  const auth = getAuth();
  const { email } = auth.currentUser;
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        //collection reference
        const userRef = collection(db, "users");
        //query reference
        const getQuery = query(userRef, where("email", "==", email));
        //get docs
        const querySnap = await getDocs(getQuery);
        //set users
        const users = [];
        //extract data from querySnap and push to users array
        querySnap.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        //setUsers
        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [email]);
  return (
    <div className="dash-Profile">
      <h1>Dashboard</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : users.length > 0 ? (
        <>
          <main>
            {users.map((user) => (
              <div key={user.id}>
                <Avatar
                  src={user.data.imageUrls[0]}
                  sx={{ width: 100, height: 100 }}
                  className="dash-Avatar"
                />

                <h3>
                  {user.data.name} {user.data.lastName}
                </h3>
                <h3>{user.data.email}</h3>
              </div>
            ))}
          </main>
        </>
      ) : (
        <h3>No User Found</h3>
      )}
    </div>
  );
};

export default Dash;
