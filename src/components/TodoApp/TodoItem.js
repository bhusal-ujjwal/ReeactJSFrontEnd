import React, { Component } from 'react'
import { Button, ListGroupItem } from 'reactstrap'

export default class TodoItem extends Component {



    render() {
        const { novel, itemClick, showNotes, handleNovelDelete } = this.props
        return (
            <ListGroupItem color='info' className='d-flex justify-content-between align-items-center'>
                <div onClick={() => itemClick(novel)}>
                    {
                        (novel.done) ? <del>{novel.novelname}</del> : <span>{novel.novelname}</span>
                    }
                </div>

                <span>
                 
                    <Button size='sm' color='danger' className="ml-2"
                        onClick={() => handleNovelDelete(novel._id)}>Delete</Button>
                </span>
            </ListGroupItem>

        )
    }
}
