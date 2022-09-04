import React from 'react';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  componentDidMount = () =>{
    axios
    .get(`http://localhost:3001/Books`)
    .then(result =>{
    
        this.setState({
          books:result.data
        })
      
      })    
      .catch(err =>{
        console.log(err);
      })
    }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
         <>
         <h3> {this.state.books[0].title}</h3>
          <p >{this.state.books[0].description}</p>
          <h3 >{this.state.books[0].states}</h3>
          </>
        
          <>
         <h3> {this.state.books[1].title}</h3>
          <p >{this.state.books[1].description}</p>
          <h3 >{this.state.books[1].states}</h3>
          </>
          <>
         <h3> {this.state.books[2].title}</h3>
          <p >{this.state.books[2].description}</p>
          <h3 >{this.state.books[2].states}</h3>
          </>

      </>
    )
  }
}

export default BestBooks;
