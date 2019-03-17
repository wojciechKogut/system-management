import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { connect } from "react-redux";

import SideBarr from "./SideBar";
import { logoutUser } from "../action/authActions";


class Navbarr extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            toggleSideBar: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleSideBar() {
        this.setState({
          toggleSideBar: !this.state.toggleSideBar
        });
    }

    logout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <span onClick={this.toggleSideBar.bind(this)} className="mr-2 fa fa-bars"></span>
                    <NavbarBrand href="/">Dashboard</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <span style={{padding: '10px 0 10px 10px', fontSize: '20px'}} className="nav-link mr-1 fa fa-user-circle">{this.props.user.username}</span>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{cursor: 'pointer'}} onClick={this.logout.bind(this)}>Logout</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <SideBarr isSideBarOpen={this.state.toggleSideBar}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        error: state.error
    }
}
export default connect(mapStateToProps, { logoutUser })(Navbarr)