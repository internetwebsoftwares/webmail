import axios from "axios";
import React, { useContext, useState } from "react";
import MainContext from "../MainContext";
import "./app.css";
import "./forms.css";

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
  },
};

function UpdateProfile() {
  const { mainUser, setMainUser, userToken, setAlertMessage, setIsAlertOpen } =
    useContext(MainContext);
  const [firstName, setFirstName] = useState(mainUser.firstName);
  const [lastName, setLastName] = useState(mainUser.lastName);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        "/user/update-profile",
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response.data === "Profile updated successfully.") {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsUpdating(false);
        let updatedUser = { ...mainUser, firstName, lastName };
        localStorage.setItem("webmail-user", JSON.stringify(updatedUser));
        setMainUser(updatedUser);
      } else {
        setAlertMessage(response.data);
        setIsAlertOpen(true);
        setIsUpdating(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={styles.container}>
      <center>
        <h1>Update profile</h1>
      </center>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="appInput">
          <input
            autoFocus
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder=" "
          />
          <label>Firstname</label>
        </div>
        <div className="appInput">
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder=" "
          />
          <label>Lasname</label>
        </div>
        <button
          disabled={isUpdating}
          type="submit"
          className="appBtn appBtn-block appBtn-primary"
        >
          {isUpdating ? "Updating profile..." : "Update profile"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
