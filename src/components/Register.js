import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            address:'',
            phoneno:'',
            username: '',
            password: '',
            isRegistered: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3001/users/signup', this.state)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.setState({
                    firstName: '',
                    lastName: '',
                    address:'',
                    phoneno:'',
                    username: '',
                    password: '',
                    isRegistered: true
                });

            }).catch((err) => console.log(err))
    }


    render() {
        if (this.state.isRegistered === true) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Container>
                <h2>Sign Up</h2>
                <Form>
                    <FormGroup>
                        <Label for='firstname'>First Name</Label>
                        <Input type='text' name='firstname' id='firstname'
                            value={this.state.firstname} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastname'>Last Name</Label>
                        <Input type='text' name='lastname' id='lastName'
                            value={this.state.lastname} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='address'>Address</Label>
                        <Input type='text' name='address' id='address'
                            value={this.state.address} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='phoneno'>Phoneno</Label>
                        <Input type='text' name='phoneno' id='phoneno'
                            value={this.state.phoneno} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' id='username'
                            value={this.state.username} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password'
                            value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <Button color='primary' onClick={this.register}>Sign Up</Button>
                    <FormText>Already a user? <Link to='/'> Login here!</Link></FormText>
                </Form>
            </Container>
        )
    }
}
