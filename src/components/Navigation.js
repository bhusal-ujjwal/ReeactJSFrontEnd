import React, { Component } from 'react'
import { Button, Navbar, Nav, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink } from 'reactstrap'
import { withRouter } from 'react-router-dom'

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <Navbar color='info' dark expand='md' className='mb-4'>
                <NavbarBrand href='/dashboard'>WebNovels</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem >
                            <NavLink color='primary' href='/dashboard'>NovelStock</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink color='primary' href='/AddNovel'>AddNovel</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/category'>Genre</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink href='/addcategory'>Add Genre</NavLink>
                        </NavItem> */}
                        <NavItem>
                            <NavLink href='/profile'>User Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button color='danger' onClick={this.handleLogout}> Logout</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Navigation)

