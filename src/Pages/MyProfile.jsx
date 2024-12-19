import React, { useState } from "react";
import Navbar from "../Components/Navbar";

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    image:
      "https://i.pinimg.com/736x/a7/66/92/a766923c29305a16ce461b2ae54f4c68.jpg",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: { line1: "123 Main Street", line2: "Apartment 4B" },
    gender: "male",
    dob: "1990-05-15",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen flex flex-col pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-lg">
        {/* Profile Image */}
        <div className="text-center">
          <img
            src={userData.image}
            alt="Profile"
            className="w-40 h-60 object-cover mx-auto rounded-lg shadow-md border-4 border-gray-300"
          />
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
              onClick={() => setIsEdit(false)}
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
  );
}

export default MyProfile;








