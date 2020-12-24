import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import React, { useState, useEffect, useRef } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown'
import UserService from '../services/UserService'
import StockService from '../services/StockService'

const userService = new UserService();
const stockService = new StockService();

function UserModal(props) {
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalScheduler, setShowModalScheduler] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [groups, setGroups] = useState("");
    const [minutes, setMinutes] = useState("");
    const handleModalUserClose = () => setShowModalUser(false);
    const handleModalUserShow = () => setShowModalUser(true);
    const handleModalSchedulerClose = () => setShowModalScheduler(false);
    const handleModalSchedulerShow = () => setShowModalScheduler(true);

    const didMount = useRef(false);
    const isAdmin = useRef(false);

    const handleSubmit = (event) => {
        userService.updateUser(email).then((result) => {
            setUsername(result.username)
            setEmail(result.email)
            setGroups(result.groups)
        })
    }

    const handleSubmitScheduler = (event) => {
        stockService.updateTimer(minutes).then((result) => {
            setMinutes(result.minutes)
        })
    }

    const getScheduler = () => {
        stockService.getTimer().then((result) => {
            setMinutes(result.data[0].minutes)
        })
    }

    const handleCheck = (val) => {
        if (groups.length > 0) {
            const group = groups.map(x => x.name == val)
            if (group.length > 0)
                return true
        }

        return false
    }

    useEffect(() => {
        if (!minutes) {
            getScheduler()
        }

        if (!username) {
            setEmail(props.email)
            setUsername(props.username)
            setGroups(props.groups)
        }
    })

    return (
        <div className="stocks--list--modal">
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={handleModalUserShow}
                >User</NavDropdown.Item>
                {handleCheck('admin') ? <NavDropdown.Item
                    onClick={handleModalSchedulerShow}
                >Scheduler</NavDropdown.Item> : ''}

            </NavDropdown>
            <Modal show={showModalUser} onHide={handleModalUserClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formSymbol">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={e => setEmail(e.target.value)}
                            type="text"
                            defaultValue={email}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal show={showModalScheduler} onHide={handleModalSchedulerClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Scheduler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formSymbol">
                        <Form.Label>Minutes</Form.Label>
                        <Form.Control onChange={e => setMinutes(e.target.value)}
                            type="number"
                            value={minutes}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmitScheduler}>
                        Save
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UserModal;