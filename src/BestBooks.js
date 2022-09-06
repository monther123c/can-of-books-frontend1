import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const URL=process.env.REACT_APP_URL

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksArr: []
    };
  }

 
  componentDidMount = () => {
    axios
      .get(`${URL}getBooks`)
      .then((result) => {
        this.setState({
          booksArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addBook = (e) => {
    e.preventDefault();

    const obj = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
    };
    axios
      .post(`${URL}addBook`, obj)
      .then((result) => {
        this.setState({
          booksArr: result.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBookHandle = (id) => {
    
    axios.delete(`${URL}deleteBook/${id}`).then((result) => {
      this.setState({
        booksArr: result.data,
      });
    });
  };

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {
    /* TODO: render all the books in a Carousel */
    // const [show, setShow] = useState(false);

    
    return (
      <div style={{backgroundColor:'gray'}}>
      <Form onSubmit={this.addBook} style={{textAlign:'center'}}>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "20px" }}>Book Title</Form.Label>
        <Form.Control placeholder="Book Title" name="title" style={{textAlign:'center',margin:'auto',width:'auto'}} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "20px" }}>Book Description</Form.Label>
        <Form.Control placeholder="Book Description" name="description" style={{textAlign:'center',margin:'auto',width:'auto'}}/>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "20px" }}>Status</Form.Label>
        <Form.Select id="status" style={{textAlign:'center',margin:'auto',width:'auto'}}>
            <option value="avaliable">Avaliable</option>
            <option value="not avaliable">Not Avaliable</option>
            <option value="favorate">Favorate</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit" style={{ fontSize: "20px",marginBottom:'30px' }}>Add new book</Button>
      </Form>
        {/* {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )} */}
        <Row xs={1} md={3} className="g-4">
        {this.state.booksArr.map((item) => {
          return (
        <Col>
          <Card style={{textAlign:'center',margin:'auto',width:'auto'}}>
            <Card.Img variant="top" src="https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg" alt="First slide"
                 />
            <Card.Body>
              <Card.Title><h2>Title: {item.title}</h2></Card.Title>
              <Card.Text>
                <h4>Description: {item.description}</h4>
                <h4>Status: {item.status}</h4>
                <Button onClick={() => this.deleteBookHandle(item._id)}>
                      Delete
                    </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
         );
        })}
    </Row>
        
    
      </div>
    );
  }
}

export default BestBooks;
//
