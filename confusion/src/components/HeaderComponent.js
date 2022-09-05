import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse,
     NavItem, Button, Modal, ModalHeader, ModalBody, 
     Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }
    
      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      toggleModal() {
          this.setState({
            isModalOpen: !this.state.isModalOpen
          });
      }

      handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value +
        " Remember: " + this.remember.checked);
        event.preventDefault();
      }
     
    render() {
        return (
            <React.Fragment>
                <div>
                <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <div className="row">
                            <div className="col-10">
                                <NavbarBrand className="mr-auto" href="/"><img src="assets/images/logo.png" height="30" width="41"
                                alt="Ristorante Con Fusion"/></NavbarBrand>                        
                                <Collapse isOpen={this.state.isNavOpen} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/home">
                                                <span className="fa fa-home fa-lg"></span>Home
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/aboutus">
                                                <span className="fa fa-info fa-lg"></span>About Us
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/menu">
                                                <span className="fa fa-list fa-lg"></span>Menu
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/contactus">
                                                <span className="fa fa-address-card fa-lg"></span>Contact
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </div>
                            <div className="col">
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg">Login</span>
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                    </div>
                </Navbar>

                <div className="jumbotron">
                    <div className="container">
                        <div className="container">
                            <div className="row row-header">
                                <div className="col-12 col-sm-6">
                                    <h1>Ristorante Con Fusion</h1>
                                    <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses¡</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                innerRef={(input) =>this.username = input}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                innerRef={(input) =>this.password = input}></Input>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) =>this.remember = input}>Remember Me</Input>
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>
            </React.Fragment>
        )
    }
}

export default Header;