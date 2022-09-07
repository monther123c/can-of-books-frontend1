import React from "react"
import Card from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';




class Profile extends React.Component{
render (){

  const { user } = this.props.auth0
    return (


<div id = "ProfileDiv">
    
<Card  className = "MyCard">
     
      <Card.Body>
        <Card.Title>{user.nickname}</Card.Title>
        <Card.Text>
       {user.email}
        </Card.Text>
        
      </Card.Body>
    </Card>
    </div>


    )
}



}


export default withAuth0(Profile);