import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // this gives info about the image but then we nned to create an url with this file so we can use it

    if (file) {
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name; // we add the current time because the user can upload the same images so with same name multipple times and is gonna get error with same name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile); // we get the info while is uploading,like how much etc..
    uploadTask.on(
      "state_changed", // will track the changes while is uploading
      (snapshot) => {
        // with snapshot we can record the progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // how many percentage have been uploaded

        setUploadingProgress(progress.toFixed(0)); // since it can be 22.2214  we use the toFixed with no decimals
      },
      (error) => {
        console.log(error);
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {uploadingProgress && (
            <CircularProgressbar
              value={uploadingProgress || 0}
              text={`${uploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadError / 100})`,
                },
              }}
            />
          )}

          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 object-cover border-[lightgray] 
            ${uploadingProgress && uploadingProgress < 100 && "opacity-60"}
            `}
          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer hover:font-bold ">Delte Account</span>
        <span className="cursor-pointer hover:font-bold">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
