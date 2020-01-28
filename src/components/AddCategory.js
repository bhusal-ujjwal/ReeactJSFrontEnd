import React, { Component } from 'react'
import Navigation from './Navigation'
import { Label,Form, FormGroup, Input, Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import Axios from 'axios'

export default class novel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            novelId: '',
            novelName: '',
            novelcategory: [],
            image:'',
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

    handlenovelChange = (e) => {
        this.setState({
            novelName: e.target.value
        })
    }
    handleFileSelect = (e) => {
        this.setState({
            selectedfile: e.target.files[0]
        })
    }
   uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    novel: this.state.novel,
                   image: response.data.filename

                })
            }).catch((err) => console.log(err.response))
    }


    submitnovel = (e) => {
        e.preventDefault()
        if (this.state.novelName === '') {
            this.setState({
                isUpdate: false
            })
            return
        }
        if (this.state.isUpdate) {
            Axios.put(`http://localhost:3001/users/novelcategory/${this.state.novelId}`,
                { novel: this.state.novelName }, this.state.config)
                .then((response) => {
                    const updatednovelcategory = this.state.novelcategory.map((novel) => {
                        if (novel._id === this.state.novelId) {
                            novel.novel = this.state.novelName
                        }
                        return novel
                    })
                    this.setState({
                        novelcategory: updatednovelcategory,
                        novelName: '',
                        isUpdate: false
                    })
                }).catch((err) => console.log(err.response))

        } else {
            Axios.post(`http://localhost:3001/users/novelcategory`,
                { novel: this.state.novelName }, this.state.config)
                .then((response) => {
                    this.setState({
                        novelcategory: [...this.state.novelcategory, response.data],
                        novelName: ''
                    })
                }).catch((err) => console.log(err.response));
        }
    }

    deletenovel = (novelId) => {
        Axios.delete(`http://localhost:3001/users/novelcategory/${novelId}`, this.state.config)
            .then((response) => {
                const filterednovelcategory = this.state.novelcategory.filter((novel) => {
                    return novel._id !== novelId
                })
                this.setState({
                    novelcategory: filterednovelcategory
                })
            }).catch((err) => console.log(err.response));
    }

    handleEdit = (novelId) => {
        const choice = this.state.novelcategory.find((novel => novel._id === novelId))
        this.setState({
            novelName: choice.novel,
            novelId: novelId,
            isUpdate: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container>
                    <Form onSubmit={this.submitnovel}>
                        <FormGroup>
                            <Input type='text'
                                placeholder='.......'
                                value={this.state.novelName}
                                onChange={this.handlenovelChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for='NovelImage'>novel Image</Label>
                        <input type='file' name="novelimg" id='profilePic' onChange={this.handleFileSelect}
                                   />
                            <button class="btn btn-success" onClick={this.uploadFile}>Upload image</button> 
                    </FormGroup>
                    </Form>

                    <ListGroup>
                        {
                            this.state.novelcategory.map((novel) => {
                                return (<ListGroupItem key={novel._id} color='info' className='d-flex justify-content-between align-items-center'>
                                    <div onClick={() => this.handleEdit(novel._id)}>{novel.novel}</div>
                                    <Button color='danger' size='sm' onClick={() => this.deletenovel(novel._id)}>Delete</Button>
                                </ListGroupItem>)
                            })
                        }
                    </ListGroup>
                </Container>
            </React.Fragment>
        )
    }
}
