import React, { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


function MyProfile() {

  
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)


  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)  // Ensure dob is in string format

      image && formData.append('image', image)  // Conditionally append image if available

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
}


// const updateUserProfileData = async () => {
//   try {
//     const formData = new FormData();

//     formData.append('name', userData.name);
//     formData.append('phone', userData.phone);
//     formData.append('address', JSON.stringify(userData.address));  // Ensure address is an object
//     formData.append('gender', userData.gender);
//     formData.append('dob', userData.dob);  // Ensure dob is in string format

//     if (image) {
//       formData.append('image', image);  // Ensure image is a valid file object before appending
//     }

//     const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

//     if (data.success) {
//       toast.success(data.message);
//       loadUserProfileData();
//       setIsEdit(false);
//       setImage(false);
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error("Error in updateUserProfileData:", error.response ? error.response.data : error.message);
//     toast.error("An error occurred while updating profile.");
//   }
// };


  return userData && (
    <>

      <Navbar />

      <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen flex flex-col pb-10">
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-lg">
          {/* Profile Image */}
          <div className="text-center">
            {
              isEdit ? (
                <label htmlFor="image" style={{ position: 'relative', display: 'inline-block' }}>
                  <div>
                    {/* Image preview with conditional size for edit */}
                    <img
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt="Preview"
                      style={{
                        width: '150px',  // Adjusted size for image preview
                        height: '150px',  // Adjusted size for image preview
                        borderRadius: '8px',
                        objectFit: 'cover',
                        transition: '0.3s ease-in-out',
                        cursor: 'pointer',  // Makes the image clickable
                      }}
                    />
                    {/* Upload icon shown only when no image is selected */}
                    <i
                      className="fa-solid fa-arrow-up-from-bracket"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '2rem',
                        color: '#202122',
                        opacity: image ? 0 : 1,  // Show only when no image is selected
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        padding: '8px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                        visibility: image ? 'hidden' : 'visible', // Only show when no image is selected
                      }}
                    >

                    </i>
                  </div>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              ) : (
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-40 h-60 object-cover mx-auto rounded-lg shadow-md border-4 border-gray-300"
                />
              )
            }



            <div className="mt-4">
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="text-3xl font-semibold text-gray-800 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-3xl font-semibold text-gray-800">{userData.name}</p>
              )}
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Contact Information */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-700 underline">Contact Information</p>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-blue-500">{userData.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-600">Phone:</span>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-gray-800">{userData.phone}</span>
                )}
              </p>
              <p>
                <span className="font-medium text-gray-600">Address:</span>{" "}
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <span className="text-gray-800">
                    {userData.address.line1}, {userData.address.line2}
                  </span>
                )}
              </p>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Basic Information */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-700 underline">Basic Information</p>
            <div className="grid grid-cols-2 gap-y-4 text-gray-800">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
              <p className="font-medium">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex justify-center gap-4">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition transform hover:scale-105"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition transform hover:scale-105"
              >
                Edit Profile
              </button>
            )}
            {isEdit && (
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

      </div>
    </>

  );
}

export default MyProfile;














