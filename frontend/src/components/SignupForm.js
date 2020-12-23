import React from 'react';
import PropTypes from 'prop-types';
import "../css/Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignupForm extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
    }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[name] = value;
            return newState
        })
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={e => this.props.handle_signup(e, this.state)}>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handle_change}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handle_change}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handle_change}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit">
                        Signup
                    </Button>
                </Form>
            </div>
        )
    }
}

export default SignupForm;

SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
}
