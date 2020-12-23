import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import React, { useState, useEffect, useRef } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown'
import UserService from '../services/UserService'

const userService = new UserService();

function UserModal(props) {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const didMount = useRef(false);

    const handleSubmit = (event) => {
        userService.updateUser(email).then((result) => {
            console.log(result)
        })
    }

    useEffect(() => {
        if (!didMount.current) {
            if (props.email) {
                setEmail(props.email)
                setUsername(props.username)
                didMount.current = true
            }
        }
    })

    return (
        <div className="stocks--list--modal">
            <style>
                {
                    `
                        .btn-primary {
                            margin: 1rem 1.5rem;
                        }
                        `
                }

            </style>
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={handleShow}
                >User</NavDropdown.Item>
            </NavDropdown>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formSymbol">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={e => setEmail(e.target.value)}
                            type="text"
                            defaultValue={props.email}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UserModal;