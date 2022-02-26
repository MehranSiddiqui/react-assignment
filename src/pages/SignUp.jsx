import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Card from "../components/Common/Card/Card";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase.config";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    images: {},
  });
  const { name, email, password, images } = formData;

  const onMutate = (e) => {
    //checks the type of input and sets the value of the input to the formData
    if (e.target.files) {
      setFormData((prev) => {
        return {
          ...prev,
          images: e.target.files,
        };
      });
    }
    if (!e.target.files) {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        //creates reference to the storage bucket
        const storageRef = ref(storage, "pictures/" + image.name);
        //uploads the image to the storage bucket
        const uploadTask = uploadBytesResumable(storageRef, image);
        //listens for the upload to finish
        uploadTask.on(
          "state_changed",
          (smapshot) => {
            const progress =
              (smapshot.bytesTransferred / smapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            reject(error);
          },
          () => {
            //gets the download url of the image
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    //awaits the promise to store the image url
    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((err) => {
      console.log(err);
      return;
    });
    try {
      //creates a new user with the email and password
      const auth = getAuth();

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //creates a new user document in the users collection
      const user = userCredentials.user;
      //creates a copy of the form data and removes the images property
      const fromDataCopy = { ...formData, imageUrls };
      delete fromDataCopy.images;
      delete fromDataCopy.password;
      //sets the user document in the users collection and adds the form data
      await setDoc(doc(db, "users", user.uid), fromDataCopy);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1>Signup</h1>
        <Card className="data-form">
          <h1>Please SignUp</h1>
          <form className="data-form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              type="text"
              label="Full Name"
              className="text-field"
              onChange={onMutate}
              value={name}
              required
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              type="text"
              label="Email"
              className="text-field"
              onChange={onMutate}
              value={email}
              required
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Password"
              className="text-field"
              onChange={onMutate}
              value={password}
              required
            />
            <div className="upload">
              <label>Display Picture</label>
              <TextField
                type="file"
                name="image"
                id="image"
                max="1"
                className="text-field"
                onChange={onMutate}
                required
              />
            </div>
            <Button variant="outlined" type="submit" className="button-theme">
              SignUp
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Signup;
