import React, { Component } from 'react'
import Navigation from './Navigation'
import { Button, Form, FormGroup, Label, Input, Container, FormText, CustomInput, ListGroup, ListGroupItem } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'


export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            novelId: '',
            novels: [],
            novelname:'',
            noveldesc:'',
            rate:'',
            novelimg:'',
            selectedfile: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }    
            },
            isUpdate: false,
            isEdit:false
        }
    }
        

    componentDidMount() {
        axios.get('http://localhost:3001/users/novel', this.state.config)
        .then((response)=> {
            this.setState({
                novels: response.data
            })
        })
    }
    handleChange =(e) => {
            this.setState({
               
                  [e.target.name]: e.target.value
                
            })
        }
        submitcategory = (e) => {
            e.preventDefault()
            if (this.state.novelname === '') {
                this.setState({
                    isUpdate: false
                })
                return
            }
            if (this.state.isUpdate) {
                axios.put(`http://localhost:3001/users/novel/${this.state.novelId}`,
                    { novel: this.state.novelname }, this.state.config)
                    .then((response) => {
                        const updatednovel = this.state.novels.map((novel) => {
                            if (novel._id === this.state.novelId) {
                                novel.novelname = this.state.novelname
                                // novel.noveldesc= this.state.noveldesc,
                                // novel.rate = this.state.rate
                            }
                            return novel
                        })
                        this.setState({
                            novels: updatednovel,
                            novelname: '',
                            noveldesc:'',
                            rate:'',
                            novelimg:'',
                            selectedfile: null,
                            isUpdate: false
                        })
                    }).catch((err) => console.log(err.response))
    
            } else {
                axios.post(`http://localhost:3001/users/novel`,
                    { novel: this.state.novelname }, this.state.config)
                    .then((response) => {
                        this.setState({
                            novels: [...this.state.novels, response.data],
                            novelname: ''
                        })
                    }).catch((err) => console.log(err.response));
            }
        }
    //     handleNovelUpdate = (novelId) => {
        
    //         axios.put(`http://localhost:3001/users/novel/${this.state.novelId}`,
    //                     { novel: this.state.novelname }, this.state.config)
    //                     .then((response) => {
    //                         const updatednovel = this.state.novels.map((novel) => {
    //                             if (novel._id === this.state.novelId) {
    //                                 novel.novelname = this.state.novelname,
    //                                 novel.noveldesc= this.state.noveldesc,
    //                                 novel.rate = this.state.rate,
    //                                 novel.novelimg=this.state.novelimg
    //                             }
                            
    //                             return novel
    //                         })
    //                         this.setState({
    //                             novels: updatednovel,
    //                             novelname: '',
    //                             noveldesc:'',
    //                             rate:'',
    //                             novelimg:'',
    //                             selectedfile: null,
    //                             isUpdate: false
    //                         })
    //                     }).catch((err) => console.log(err.response))  
    // }

        handleFileSelect = (e) => {
            alert(e.target.files[0])
            this.setState({
                selectedFile: e.target.files[0]
            })
        }

        uploadFile = (e) => {
            e.preventDefault();
            alert(this.state.selectedfile)
            const data = new FormData()
            data.append('myFile', this.state.selectedFile)
            axios.post('http://localhost:3001/upload', data)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        novelimg: response.data.filename
    
                    })
                }).catch((err) => console.log(err.response))
        }

        addnovel = (e) => {
            e.preventDefault();
            axios.post('http://localhost:3001/users/novel',this.state,this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    novels: [...this.state.novels, response.data]
                })
            }
            )
            .catch((err) => 
            console.log(err.response))
        }

        editnovel = (novelId) => {
            const choice = this.state.novels.find((novel => novel._id === novelId))
            this.setState({
                novelname: choice.novelname,
                noveldesc: choice.noveldesc,
                rate:choice.rate,
                novelimg:choice.novelimg,
                novelId: novelId,
                isUpdate: true,
                isEdit:true
            })
        }

        // editnovel = (novelId) => {
        //     // novelId.preventDefault();
        //     axios.put('http://localhost:3001/users/novel', this.state.novelId, this.state.config)
        //     const choice = this.state.novels.novelId)
        //     .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        //     this.setState({
        //         novelname: choice.novelname,
        //         noveldesc: choice.noveldesc,
        //         rate:choice.rate,
        //         novelimg:choice.novelimg,
        //         novelId: novelId,
        //         isUpdate: true,
        //         isEdit:true
        //     })
        //     // axios.put('http://localhost:3001/users/novel', this.state.user, this.state.config)
        //     //     .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        //     // this.props.history.push('/dashboard');
        // }


        deletenovel = (novelId) => {
            axios.delete(`http://localhost:3001/users/novel/${novelId}`, this.state.config)
                .then((response) => {
                    const filterednovel = this.state.novels.filter((novel) => {
                        return novel._id !== novelId
                    })
                    this.setState({
                        novels: filterednovel
                    })
                }).catch((err) => console.log(err.response));
        }

    

        render() {
            const {isEdit,handleNovelUpdate,addnovel}= this.props
        return (
            <React.Fragment>
                <Navigation />
            <Container>
                <h2 align="center">Add novel</h2>
                <form onSubmit={this.submitcategory}>
                    <FormGroup>
                        <Label for='novelname'>novelname</Label>
                        <Input type='text' name='novelname' id='novelname'
                            value={this.state.novelname} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='noveldesc'>noveldesc</Label>
                        <Input type='text' name='noveldesc' id='noveldesc'
                            value={this.state.noveldesc} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='Rate'>Rate</Label>
                        <Input type='text' name='rate' id='rate'
                            value={this.state.rate} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='NovelImage'>NovelImage</Label>
                        <input type='file' name="novelimg" width='150' id='profilePic' onChange={this.handleFileSelect}
                                   />
                            <button class="btn btn-success" onClick={this.uploadFile}>Upload image</button> 
                    </FormGroup>
                   
                
                    {
                        (this.state.isEdit) ? <Button color='success' block
                            onClick={this.handleNovelUpdate}>Updatenovel</Button> :
                            <Button color='primary' block
                                onClick={this.addnovel}>Addnovel</Button>
                    }

                </form>


                <ListGroup>
                   
                        {
                            this.state.novels.map((novel)=> {
                                return (<ListGroupItem key={novel._id} color='info' className='d-flex justify-content-between align-items-center'>
                                    <td>{novel.novelname}</td>
                                    <td>
                                        {novel.noveldesc}
                                    </td>
                                    <td>
                                        {novel.rate}
                                    </td>
                                    <td> <img className='img-thumbnail'
                                    width='50' src={`http://localhost:3001/uploads/${this.state.novelimg}`}
                                    alt="profile" /></td>
                                    <Button color='primary' size='sm' onClick={() => this.editnovel(novel._id)}>Edit</Button>
                                    {/* <Button color='primary' size='sm' onClick={()=>this.editnovel(novel._id)}>Edit</Button> */}
                                    <Button color='danger' size='sm' onClick={() => this.deletenovel(novel._id)}>Delete</Button>
                                    {/* <Button color='danger' onClick={this.updateUser} block>Update User</Button> */}
                                </ListGroupItem>)
                            })
                        }
                    
                   
                </ListGroup>
            </Container>
            </React.Fragment>
        )
    }
}