import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserModal from '../components/UserModal'

function LoginNav(props) {
    const logged_out_nav = (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link
                    onClick={() => props.display_form('login')}
                >Login</Nav.Link>
                <Nav.Link
                    onClick={() => props.display_form('signup')}
                >signup</Nav.Link>
            </Nav>
        </Navbar>
    );

    const logged_in_nav = (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link
                        onClick={props.handle_logout}
                    >Logout</Nav.Link>
                </Nav>
                <Nav className="mr-sm-10">
                    <UserModal
                        logged_in={props.logged_in}
                        username={props.username}
                        email={props.email}
                    />
                </Nav>
            </Navbar>
        </div>

    );
    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default LoginNav;

LoginNav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
};