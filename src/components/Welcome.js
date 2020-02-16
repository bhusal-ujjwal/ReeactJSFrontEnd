import React from 'react'
import {
    Container,  Card, CardImg, CardText, CardBody,
    CardTitle,  Button
} from 'reactstrap'
import { Link } from 'react-router-dom';
import Header from './header';


export default () => (
   <React.Fragment>
       <Header />
    <Container>
    <br></br>
                    <br></br>
                    <br></br>
  <div>

    { /*Main jumbotron for a primary marketing message or call to action*/ }
    <div className="jumbotron">
      <h1 className="display-3">Welcome!</h1>
      <p>This is a Event Scheduler website. Here, you can post your events.</p>
      <p><Link className="btn btn-primary btn-lg" to="/login" role="button">Look the events &raquo;</Link></p>
    </div>

    { /*Example row of columns*/ }
    <div className="row text-justify">
      <div className="col-md-4">
      <h2>Recent Events</h2>
      <Card>
      <CardImg top width="100%" src={require('../pics/shivratri.jpeg')} alt="Card image cap" />
        
        <CardBody>
        <CardTitle>Shiva Ratri</CardTitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button href='/login'>See More</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
        <h2>Nearby Events</h2>
        <Card>
        <CardImg top width="100%" src={require('../pics/visit.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>Visit Nepal</CardTitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button href='/login'>See More</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
        <h2>Popular Web Novels</h2>
        <Card>
        <CardImg top width="100%" height="230px"src={require('../pics/visit.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>Buy Printed Webnovels</CardTitle>
          <CardText>Some quick example of WebNovels Buying  printed edition</CardText>
          <Button href='/login'>See More</Button>
        </CardBody>
      </Card>
      </div>
    </div>

  </div>
  </Container>
  
  </React.Fragment> 

);