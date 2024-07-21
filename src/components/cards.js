import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Users = (props) => {
  
  return <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.email}</Card.Text>
            </Card.Body>
        </Card>
            
};

export default Users;