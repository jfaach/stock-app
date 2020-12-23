import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../css/Login.css"

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value
            return newState;
        });
    };

    render() {
        return (
            <div className="Login">
                <Form onSubmit={e => this.props.handle_login(e, this.state)}>
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
                    <Button block size="lg" type="submit">
                        Login
                    </Button>
                </Form>
            </div>

        )
    }
}

export default LoginForm;

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
}