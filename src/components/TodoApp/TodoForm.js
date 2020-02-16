import React, { Component } from 'react'
import { Form, Input, Button, FormGroup, Label } from 'reactstrap'

export default class TodoForm extends Component {


    render() {
        const { isEdit, novelname, noveldesc,novelDone, novelcategory, novelcategoryId, handlenovelnameChange,handlenoveldescChange,
            handlenovelDoneChange, handleNovelAdd, handleNovelUpdate, handlecategoryChange } = this.props
        return (
            <div>
            <h2 align="center">Novel Stock</h2>
                <Form onSubmit={handleNovelAdd}>
                    <FormGroup>
                    <Label for='novelname'>Novel Name</Label>
                        <Input type='text' placeholder='Add Novel'
                            value={novelname}
                            onChange={(e) => handlenovelnameChange(e.target.value)} />
                        <Label for='check' className='ml-4 mt-2'>
                            <Input type='checkbox' id='check'
                                checked={novelDone}
                                onChange={(e) => handlenovelDoneChange(e.target.checked)} /> {' '} No Stock?
                        </Label>

                    </FormGroup>
                    <FormGroup>
                    <Label for='noveldesc'>Novel Detail</Label>
                        <Input type='text' placeholder='Add description'
                            value={noveldesc}
                            onChange={(e) => handlenoveldescChange(e.target.value)} />
                    </FormGroup>


                    <FormGroup>
                        <Label for='category'>Genre</Label>
                        <Input type='select' id='category' value={novelcategoryId} onChange={handlecategoryChange}>
                            {
                                novelcategory.map((category) => {
                                    return <option key={category._id} value={category._id}>{category.category}</option>
                                })
                            }
                        </Input>
                    </FormGroup>
                    {
                        (isEdit) ? <Button color='success' block
                            onClick={handleNovelUpdate}>Update</Button> :
                            <Button color='primary' block
                                onClick={handleNovelAdd}>Add</Button>
                    }

                </Form>
            </div>
        )
    }
}
