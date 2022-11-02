import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { dateParser } from "../util/dateParser";
import UserListingsIndex from "./UserListingsIndex";

const UserAccount = ({ user: { firstName, email, createdAt, profilePhotoUrl, listings }, currentUserId, updateUserPhoto }) => {
  
  const accountCreationDate = dateParser(createdAt);
  const year = accountCreationDate.split(' ')[2];
  
  window.scrollTo(0,0)

  console.log('listings', listings)
  
  const handleFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[profile_photo]', e.currentTarget.files[0])

    updateUserPhoto(formData, currentUserId)
  }

  return (
    <div className="user-account-container">
      <div className="user-profile-container">
        <div className="user-photo">
          { profilePhotoUrl ? <img className="user-avatar" src={`${profilePhotoUrl}`} alt="" /> 
          : 
            <Avatar
              className="user-avatar"
              alt={firstName}
              src={"https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240"}
            />    
          }

          <div className="upload-button-container">
            <label htmlFor="user-photo" id="upload-icon" style={{'zIndex': 999}}>
              <span>Update Photo:</span>
              <br />
              <input 
                id="photo-upload"
                type="file" 
                title=" "
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        <div className="user-profile">
          <p className="user-name">Hi, I'm {firstName}</p>
          <p className="user-joined">Joined in {year}</p>
          <p className="user-email">Email: {email}</p>
        </div>
      </div>
      
      <div className="user-listings">
        <p>Here are your current listed properties:</p>
          {listings.length > 0 ?
            listings.map((listing, idx) => {
              // console.log(listing)
              <UserListingsIndex
                key={`list-${idx}`}
                listing={listing}
              />
            }) 
            : 
              <p>You currently don't have any listings</p>
            }
      </div>

    </div>
  )
}

export default UserAccount;