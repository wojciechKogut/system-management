import React from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col, Collapse } from 'reactstrap';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let sidebar;
        let changeClass;
        if (this.props.isSideBarOpen) {
            changeClass = '0';

            sidebar = (
                <div style={{transition: 'opacity 0.5s', opacity: '1'}}>
                    <NavItem className="list-group-item list-group-item-action" style={{borderRadius: '0', clear: 'both', maxWidth: '54px'}}>
                        <div className="mr-2"><span className="fa fa-desktop"></span></div>
                    </NavItem>
                    <NavItem className="list-group-item list-group-item-action" style={{borderRadius: '0', maxWidth: '54px'}}>
                        <div className="mr-2"><span className="fa fa-user"></span></div>
                    </NavItem>
                </div>
            );
        } else {
            changeClass = '2';
            sidebar = (
                <div style={{opacity: '1'}}>
                    <NavItem className="list-group-item list-group-item-action" style={{borderRadius: '0', clear: 'both'}}>
                        <div className="mr-1" style={{float: 'left'}}><span className="fa fa-desktop"></span></div><div><NavLink className="p-0">Projects</NavLink></div>
                    </NavItem>
                    <NavItem className="list-group-item list-group-item-action" style={{borderRadius: '0'}}>
                        <div className="mr-2" style={{float: 'left'}}><span className="fa fa-user"></span></div><NavLink className="p-0">Users</NavLink>
                    </NavItem>
               </div>
            );
        }
        return (
                <Row style={{height: 'calc(100vh - 93px)'}}>
                    <Col sm={changeClass} className="p-0" style={{borderRight: '1px solid rgba(211,211,211, .5)'}}>
                        <ul className="list-group">
                            {sidebar}
                        </ul>
                    </Col>
                    <Col className="ml-3" sm="9">
                        <div>CONTENT TO DO</div>
                    </Col>
                </Row>
        );
    }
}