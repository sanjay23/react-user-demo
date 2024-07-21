import React, { useEffect, useState } from "react";
import axios from 'axios';
import UserCard from './UserCards';
import Pagination from "./Pagination";

const Users = () => {
  const [users, setUser] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [total, setTotal] = useState(0);
  const per_page = (users && typeof users.data != 'undefined') ? users.meta.per_page : '2';
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [postsPerPage] = useState(per_page);

  var config = {
    params:{
      page:currentPage,
      limit:per_page,
    },
  };
  useEffect(() => {
    axios.get('http://localhost/phpreact/users.php',config).then(response => response.data)
      .then(response => { 
        setUser(response.data);
        setTotal(response.meta.total);
      })
      .catch(error => {
      console.log(error);
      setErrorMessages({ name: "pass", message: "Something went wrong.Please try again later."});
    });
  }, []);
  const searchUser = (event) => {
    var config = {
       params:{
         search:event.target.value,
         page:currentPage,
         limit:per_page,
       }
   };
   setSearch(event.target.value);
   get_user(config);
 }

 const get_user = (config) => {
    axios.get('http://localhost/phpreact/users.php',config).then(response => response.data)
    .then(response => { 
      setUser(response.data);
      setTotal(response.meta.total);
    })
    .catch(error => {
    console.log(error);
    if (error.response.status === 401) setErrorMessages({ name: "pass", message: error.response.data.message});
    else setErrorMessages({ name: "pass", message: "Something went wrong.Please try again later."});
  });
 }
 const handlePageClick = ( event ) => {
    
  setCurrentPage(event.selected + 1);
   var config = {
      params:{
        page:event.selected + 1,
        limit:per_page,
        search:search,
      }
  };
  get_user(config);
};
  return <div className="posts-container">
          <div className='sticky top-0 bg-white z-10 text-gray-900 text-body border-b'>
            <div className='flex h-12 items-stretch bg-white'>
              <div className='px-3 flex items-center justify-center h-12 border-r'>
                <p className='font-bold leading-none text-3xl font-bold underline'>Users </p>
              </div>
                <div className="v-list-search border-r flex-grow relative">
                  <input placeholder="Search" type="text" onChange={searchUser} className="w-full h-12 px-4 outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200"/>
                </div>
              <div className="divide-x flex text-xl">
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {
              users.length > 0 &&
              users.map((user, id) => (
                <UserCard user={user} key={id}/>
                
            ))}
          </div>
          <Pagination total={total} handlePageClick={handlePageClick} postsPerPage={postsPerPage} />
        </div>;
};

export default Users;