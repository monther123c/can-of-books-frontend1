import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from 'react-bootstrap/Modal';
import UpdateForm from './UpdateForm'
const URL=process.env.REACT_APP_URL

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      
      show:false,
      states:"",
      UpdateFlag:false,
      currentBook:{}
    }
  }

 
  componentDidMount = () =>{
    const { user } = this.props.auth0
    axios
    .get(`https://myfrontend112.herokuapp.com/Books/${user.email}`)
    .then(result =>{
        this.setState({
          books:result.data
        })
    })
    .catch(err =>{
      console.log(err);
    })
  }


 addBook = (event) =>{
    event.preventDefault()
    const { user } = this.props.auth0
    const obj = {
      title : event.target.BookTitle.value,
      description : event.target.BookDes.value,
      states :this.state.states,
      name:user.email,
      email : user.email
     }
     
  
    axios
    .post(`${process.env.REACT_APP_URL}addBook/${user.email}`, obj)
    .then(result =>{
      
      this.setState({
        books : result.data
      })
    })
    .catch(err=>{
      console.log(err);
    })

    this.handleClose();

  }

  deleteBook= (id) => {
    const { user } = this.props.auth0
    console.log(id);
    axios
    .delete(`${process.env.REACT_APP_URL}deleteBook/${id}/${user.email}`) //http://localhost:3001/deleteBook?id=${id}
    .then(result =>{
      
      this.setState({
        books : result.data,
       
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  handleOnChange = (e) => {
    this.setState({
    states:e.target.value
    })
    
}

handleClose = ()=>{
  this.setState({
    show:false,
  })
}
handleCloseForm = ()=>{
  this.setState({
    UpdateFlag:false,
  })
}
openTheForm = (item) =>{
  this.setState({
    UpdateFlag : true,
    currentBook:item
   
  })
  console.log(item)
}

updateBook = (event) =>{
  const { user } = this.props.auth0
event.preventDefault();
let obj = {
  title :event.target.bookTitle.value,
  description:event.target.bookDes.value,
  available:event.target.bookStates.value,
  name:user.email
}
let id = this.state.currentBook._id;
axios
.put(`${process.env.REACT_APP_URL}updateBook/${id}/${user.email}`,obj)
.then(result => {
this.setState({
  books : result.data 
})
this.handleCloseForm();

}).catch(err=>{
  console.log(err);
})

}
  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {
    return (
      
 
<>
<Button id = "mybtn" onClick={()=>{
  this.setState({
    show:true
  })

}}> Press To add A Book</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add A New Book To Favorites</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.addBook}>
                <Form.Group className="mb-3">
                  <Form.Label>Book Title</Form.Label>
                  <Form.Control type="text" name="BookTitle" placeholder="Enter a book name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Book Description</Form.Label>
                  <Form.Control type="text" name="BookDes" placeholder="Enter a description" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Status
                  </Form.Label>
                  <Form.Select onChange={this.handleOnChange}>
                    <option value="My Guide">My Guide</option>
                    <option value="Top 10">Top 10</option>
                    <option value="Intresting">Intresting</option>
                    <option value="The best one in the world">The best one in the world</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        


          <div  id="MainDiv">
        {this.state.books.length ? (
          <div id="myDiv" style={{ width: "800px" }}>
            <Carousel fade>
              {this.state.books.map((item,key) => {
                
                key = {key};
              
                return(
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://img.freepik.com/free-photo/black-sand-paper-texture_53876-88601.jpg"
                    alt="Slide"
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.states}</p>
                    <p>{item.name}</p>
                     <Button className = "silderbuttons" variant="primary" onClick = { ()=> this.deleteBook(item._id)}>Press Me To Delete !</Button>
                     <Button className = "silderbuttons" variant="primary" onClick = { ()=> this.openTheForm(item)}>Press Me to Update ! </Button>
                  </Carousel.Caption>
                </Carousel.Item>
                )
              })}
            </Carousel>
            
          </div>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        {this.state.UpdateFlag && <UpdateForm
        appear={this.state.UpdateFlag}
        disappear = {this.handleCloseForm}
        updateBook = {this.updateBook}
        Book = {this.state.currentBook}
        
        />}
      </div>
      </>
    );
  }
}

export default withAuth0(BestBooks);
