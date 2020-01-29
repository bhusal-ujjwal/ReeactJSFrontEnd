import React, { Component } from 'react'
import Navigation from './Navigation'
import { Form, FormGroup, Input, Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import Axios from 'axios'

export default class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            novelcategoryId: '',
            genreName: '',
            novelcategory: [],
            isUpdate: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/users/novelcategory', this.state.config)
            .then((response) => {
                this.setState({
                    novelcategory: response.data
                })
            }).catch((err) => console.log(err.response))
    }

    handleCategoryChange = (e) => {
        this.setState({
            genreName: e.target.value
        })
    }

    submitCategory = (e) => {
        e.preventDefault()
        if (this.state.genreName === '') {
            this.setState({
                isUpdate: false
            })
            return
        }
        if (this.state.isUpdate) {
            Axios.put(`http://localhost:3001/users/novelcategory/${this.state.novelcategoryId}`,
                { category: this.state.genreName }, this.state.config)
                .then((response) => {
                    const updatednovelcategory = this.state.novelcategory.map((category) => {
                        if (category._id === this.state.novelcategoryId) {
                            category.category = this.state.genreName
                        }
                        return category
                    })
                    this.setState({
                        novelcategory: updatednovelcategory,
                        genreName: '',
                        isUpdate: false
                    })
                }).catch((err) => console.log(err.response))

        } else {
            Axios.post(`http://localhost:3001/users/novelcategory`,
                { category: this.state.genreName }, this.state.config)
                .then((response) => {
                    this.setState({
                        novelcategory: [...this.state.novelcategory, response.data],
                        genreName: ''
                    })
                }).catch((err) => console.log(err.response));
        }
    }

    deleteCategory = (novelcategoryId) => {
        Axios.delete(`http://localhost:3001/users/novelcategory/${novelcategoryId}`, this.state.config)
            .then((response) => {
                const filterednovelcategory = this.state.novelcategory.filter((category) => {
                    return category._id !== novelcategoryId
                })
                this.setState({
                    novelcategory: filterednovelcategory
                })
            }).catch((err) => console.log(err.response));
    }

    handleEdit = (novelcategoryId) => {
        const choice = this.state.novelcategory.find((category => category._id === novelcategoryId))
        this.setState({
            genreName: choice.category,
            novelcategoryId: novelcategoryId,
            isUpdate: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container>
                    <Form onSubmit={this.submitCategory}>
                        <FormGroup>
                            <Input type='text'
                                placeholder='Add Genres'
                                value={this.state.genreName}
                                onChange={this.handleCategoryChange}
                            />
                        </FormGroup>
                        
                    </Form>

                    <ListGroup>
                        {
                            this.state.novelcategory.map((category) => {
                                return (<ListGroupItem key={category._id} color='info' className='d-flex justify-content-between align-items-center'>
                                    <div onClick={() => this.handleEdit(category._id)}>{category.category}</div>
                                    <Button color='danger' size='sm' onClick={() => this.deleteCategory(category._id)}>Delete</Button>
                                </ListGroupItem>)
                            })
                        }
                    </ListGroup>
                </Container>
            </React.Fragment>
        )
    }
}
