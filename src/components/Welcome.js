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
      <p>This is a Web Novel Selling website. Here, you can buy webnovels here at printed edition.</p>
      <p><Link className="btn btn-primary btn-lg" to="/login" role="button">Look the Novels &raquo;</Link></p>
    </div>

    { /*Example row of columns*/ }
    <div className="row text-justify">
      <div className="col-md-4">
      <h2>Against The Gods</h2>
      <Card>
      <CardImg top width="100%" src={require('../pics/atg.jpg')} alt="Card image cap" />
        
        <CardBody>
        <CardTitle>Against The Gods</CardTitle>
          <CardText>Custom Synopsis: Hunted for possessing a heaven-defying object, Yun Che is a young man in both that life and the next. Throwing himself off a cliff to spite his pursuers, Yun Che is reincarnated as Xiao Che, a recently poisoned teen in another realm. Just as hated in this life as the previous one, Che must overcome his own hostile clan, his own inability to cultivate, and his own frosty fiancée.</CardText>
          <Button href='/login'>Buy</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
        <h2>Chaotic Sword God</h2>
        <Card>
        <CardImg top width="100%" src={require('../pics/csg.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>Chaotic Sword God</CardTitle>
          <CardText>ian Chen, the publicly recognized number one expert of the Jianghu. His skill with the sword went beyond perfection and was undefeatable in battle, After a battle with the exceptional expert Dugu Qiubai who had gone missing over a hundred years ago, Jian Chen succumbed to his injuries and died.</CardText>
          <Button href='/login'>Buy</Button>
        </CardBody>
      </Card>
      </div>
      <div className="col-md-4">
        <h2>Chaotic Sword God</h2>
        <Card>
        <CardImg top width="100%" src={require('../pics/csg.jpg')} alt="Card image cap" />
        <CardBody>
        <CardTitle>Chaotic Sword God</CardTitle>
          <CardText>ian Chen, the publicly recognized number one expert of the Jianghu. His skill with the sword went beyond perfection and was undefeatable in battle, After a battle with the exceptional expert Dugu Qiubai who had gone missing over a hundred years ago, Jian Chen succumbed to his injuries and died.</CardText>
          <Button href='/login'>Buy</Button>
        </CardBody>
      </Card>
      </div>
    </div>

  </div>
  </Container>
  
  </React.Fragment> 

);