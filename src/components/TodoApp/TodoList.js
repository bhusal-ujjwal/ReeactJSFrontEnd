import React, { Component } from 'react'
import TodoItem from './TodoItem'
import NotesModal from './NotesModal'
import { ListGroup } from 'reactstrap'

export default class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            novelId: ''
        }
    }

    toggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    showNotes = (novelId) => {
        this.setState({
            novelId: novelId
        })
        this.toggle();
    }

    render() {
        const { novels, handleNovelDelete, itemClick } = this.props
        return (
            <div>
                <ListGroup className='mt-4'>
                    {
                        novels.map((novel) => {
                            return <TodoItem key={novel._id} novel={novel}
                                handleNovelDelete={handleNovelDelete}
                                showNotes={this.showNotes}
                                itemClick={itemClick}
                            />
                        })
                    }
                </ListGroup>

                {
                    this.state.showModal ? (<NotesModal novelId={this.state.novelId}
                        showModal={this.state.showModal}
                        toggle={this.toggle} />) : null
                }


            </div>
        )
    }
}
