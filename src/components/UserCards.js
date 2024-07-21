import React, { useEffect, useState } from "react";


const UserCards = (props) => {
  
  return <div className="max-w-sm rounded overflow-hidden shadow-lg rounded border-2 mt-2.5">
            <div className="font-bold text-xl mb-2 mt-2.5">Username: {props.user.name}</div>
            <div>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base"> Email: {props.user.email}</p>
                <p className="text-gray-700 text-base">PhoneNumber: {props.user.phoneno}</p>
                <p className="text-gray-700 text-base">Role: {props.user.role_name}</p>
              </div>
            </div>
        </div>
};

export default UserCards;