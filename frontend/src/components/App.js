import React, { Component } from 'react';
import Nav from '../components/Nav';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import '../css/StockList.css';
import StockList from '../components/StockList';
import { Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: "",
            email: "",
            groups: "",
            errorMessage: ""
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            axios.get('http://localhost:8000/api/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                this.setState({
                    username: response.data.username,
                    email: response.data.email,
                    groups: response.data.groups
                });
            })
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("SUCCESSS")
                    return response.json();
                } else {
                    throw new Error(response.status)
                }
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: data.user.username,
                    email: data.user.email,
                    groups: data.user.groups
                });
            })
            .catch((error) => {
                this.setState({ errorMessage: 'Login error !' })
                this.setState({ logged_in: false });
            });

    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/core/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("SUCCESSS")
                    return response.json();
                } else {
                    throw new Error(response.status)
                }
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                console.log(localStorage.getItem('token'))
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: data.user.username,
                    email: data.user.email
                });
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ logged_in: false });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
        window.location.href = '/';
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm
                    handle_login={this.handle_login} />;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup} />;
                break;
            default:
                form = null;
        }

        return (
            <div className="App">
                <Nav
                    logged_in={this.state.logged_in}
                    username={this.state.username}
                    email={this.state.email}
                    groups={this.state.groups}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                />
                {form}
                {this.state.errorMessage &&
                    <Alert>
                        {this.state.errorMessage}
                    </Alert>}
                {this.state.logged_in
                    ? <Redirect from="/" to="/stocklist" />
                    : ''}

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/stocklist" component={StockList} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;