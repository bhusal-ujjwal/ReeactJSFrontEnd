import React, { Component } from 'react'
import { Container } from 'reactstrap'
import TodoForm from './TodoApp/TodoForm';
import TodoList from './TodoApp/TodoList';
import Axios from 'axios';
import Navigation from './Navigation';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            novelId: '',
            novelname: '',
            noveldesc:'',
            novelDone: false,
            isEdit: false,
            novels: [],

            novelcategory: [],
            novelrate: '',

            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
    }

    
    componentDidMount() {
        Axios.get('http://localhost:3001/users/novel', this.state.config)
            .then((response) => {
                this.setState({
                    novels: response.data
                })
            }).catch((err) => console.log(err.response))
        Axios.get('http://localhost:3001/users/novelcategory', this.state.config)
            .then((response) => {
                this.setState({
                    novelcategory: response.data,
                    novelcategoryId: response.data[0]._id
                })
            }).catch((err) => console.log(err.response))
    }


    handlenovelnameChange = (novelname) => {
        this.setState({
           novelname: novelname
        })
    }
    handlenoveldescChange = (noveldesc) => {
        this.setState({
           noveldesc: noveldesc
        })
    }

    handlenovelDoneChange = (isDone) => {
        this.setState({
            novelDone: isDone
        })
    }

    handlenovelsubmit = (e) => {
        e.preventDefault();
        if (!this.state.novelname) return;

        Axios.post('http://localhost:3001/users/novel',
            {
                novelname: this.state.novelname,
                noveldesc: this.state.noveldesc,
                done: this.state.novelDone,
                pcategory: this.state.novelcategoryId
            },
            this.state.config).then((response) => {
                this.setState({
                    novels: [...this.state.novels, response.data],
                    novelname: '',
                    noveldesc: ''
                })
            })
    }

    handleNovelDelete = (novelId) => {
        Axios.delete(`http://localhost:3001/users/novel/${novelId}`, this.state.config)
            .then((response) => {
                const filteredProduct = this.state.novels.filter((product) => {
                    return product._id !== novelId
                })
                this.setState({
                    novels: filteredProduct
                })
            })
    }

    handleNovelUpdate = (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:3001/users/novel/${this.state.novelId}`,
            {
                novelname: this.state.novelname,
                noveldesc: this.state.noveldesc,
                done: this.state.novelDone,
                pcategory: this.state.novelcategoryId
            },
            this.state.config)
            .then((response) => {
                const updatednovels = this.state.novels.map((product) => {
                    if (product._id === response.data._id) {
                        product = response.data
                    }
                    return product;
                })
                this.setState({
                    novels: updatednovels,
                    novelname: '',
                    noveldesc: '',
                   novelDone: false,
                    novelId: '',
                    isEdit: false
                })
            }).catch((err) => console.log(err.response));
    }


    itemClick = (product) => {
        this.setState({
            isEdit: !this.state.isEdit,
           novelId: product._id,
           novelname: product.novelname,
           noveldesc:product.noveldesc,
           novelDone: product.done
        })
        if (product.category) {
            this.setState({
                novelcategoryId: product.category._id
            })
        } else this.setState({
            novelcategoryId: this.state.novelcategory[0]._id
        })

        if (this.state.isEdit) {
            this.setState({
                novelId: '',
                novelname: '',
                noveldesc: '',
                novelDone: false,

            })
        }
    }

    handleCategoryChange = (e) => {
        this.setState({
            novelcategoryId: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container className='mt-4'>
                    <TodoForm novelname={this.state.novelname}
                    novelDone={this.state.novelDone}
                        isEdit={this.state.isEdit}
                        novelcategoryId={this.state.novelcategoryId}
                        novelcategory={this.state.novelcategory}
                        handlenovelnameChange={this.handlenovelnameChange}
                        handlenoveldescChange={this.handlenoveldescChange}
                        handlenovelDoneChange={this.handlenovelDoneChange}
                        handleNovelAdd={this.handlenovelsubmit}
                        handleNovelUpdate={this.handleNovelUpdate}
                        handleCategoryChange={this.handleCategoryChange}
                    />
                    <TodoList novels={this.state.novels}
                        handleNovelDelete={this.handleNovelDelete}
                        itemClick={this.itemClick}
                    />
                </Container>
            </React.Fragment>
        )
    }
}

