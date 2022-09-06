import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class UpdateForm extends React.Component{
render(){


    return (
        <Modal show={this.props.appear} onHide={this.props.disappear}>
        <Modal.Header closeButton>
          <Modal.Title>Fill to Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.props.updateBook}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" name = "bookTitle" defaultValue ={this.props.Book.title }/>
        <Form.Text className="text-muted">
          Feel free to update your book's title 
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description"  name = "bookDes" defaultValue ={this.props.Book.description}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        
        <Form.Label>Book Status</Form.Label>
        <Form.Control type="text" placeholder="Status"  name = "bookStates" defaultValue ={this.props.Book.states}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Click to Update ! 
      </Button>
    </Form>




        </Modal.Body>
        
      </Modal>


    )
}



}

export default UpdateForm;