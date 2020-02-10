// import React, { Component } from 'react'
// import { Modal, ModalHeader, ModalBody, Button, Input, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap'
// import Axios from 'axios'

// export default class NotesModal extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             novel: {},
//             noteDesc: '',
//             config: {
//                 headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//             }
//         }
//     }

//     componentDidMount() {
//         Axios.get(`http://localhost:3001/users/novelcategory/${this.props.novelId}`,
//             this.state.config).then((response) => {
//                 this.setState({
//                     task: response.data
//                 })
//             }).catch((err) => { console.log(err) })
//     }

//     handleNoteDescChange = (e) => {
//         this.setState({
//             noteDesc: e.target.value
//         })
//     }

//     handleNoteSubmit = (e) => {
//         e.preventDefault();
//         Axios.post(`http://localhost:3001/users/novelcategory${this.props.novelId}/notes`,
//             { desc: this.state.noteDesc }, this.state.config)
//             .then((response) => {
//                 this.setState({
//                     novel: response.data,
//                     noteDesc: ''
//                 })
//             }).catch((err) => console.log(err))
//     }

//     handleNoteDelete = (noteId) => {
//         Axios.delete(`http://localhost:3001/users/novelcategory${this.props.novelId}/notes/${noteId}`,
//             this.state.config).then((response) => {
//                 this.setState({
//                     novel: response.data
//                 })
//             })
//     }

//     render() {
//         const { toggle, showModal } = this.props
//         return (
//             <div>
//                 <Modal isOpen={showModal} toggle={toggle}>
//                     <ModalHeader toggle={toggle}>
//                         {
//                             (this.state.novel.done) ? <del>{this.state.novel.novelname}</del> : <span>{this.state.novel.novelname}</span>
//                         }
//                     </ModalHeader>
//                     <ModalBody>

//                         <Form onSubmit={this.handleNoteSubmit}>
//                             <FormGroup>
//                                 <Input type='text' placeholder='add notes'
//                                     value={this.state.noteDesc}
//                                     onChange={this.handleNoteDescChange}
//                                 />
//                             </FormGroup>
//                         </Form>

//                         {
//                             (this.state.novel.notes) ? (
//                                 <ListGroup flush>
//                                     {this.state.novel.notes.map((note) => {
//                                         return (<ListGroupItem key={note._id}
//                                             color='info'
//                                             className='d-flex justify-content-between align-items-center'>
//                                             {note.desc}
//                                             <Button size='sm' color='danger' onClick={() => this.handleNoteDelete(note._id)}>Del</Button>
//                                         </ListGroupItem>)
//                                     })}
//                                 </ListGroup>) : null
//                         }
//                     </ModalBody>
//                 </Modal>
//             </div>
//         )
//     }
// }
