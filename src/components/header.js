import React, { Component } from 'react'
import {  Navbar, Nav, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink } from 'reactstrap'
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
            <Navbar color='secondary' dark expand='md' className='mb-4' fixed='top'>
                <NavbarBrand href='/dashboard'>Webnovels</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink href='/login'>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/register'>SignUp</NavLink>
                        </NavItem>
                        <NavItem>
              <NavLink href="https://github.com/softwarica-github/t3-frontend-bhusalujjwal">GitHub</NavLink>
            </NavItem>
                       
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Navigation)

