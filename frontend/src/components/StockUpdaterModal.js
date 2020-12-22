import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react';
import StockService from '../services/StockService'
const stockService = new StockService();

function StockUpdaterModal() {
    const [show, setShow] = useState(false);
    const [ticket, setTicket] = useState("");
    const [price_min, setPriceMin] = useState("");
    const [price_max, setPriceMax] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        const params = {
            stock: { ticket },
            price_min: { price_min },
            price_max: { price_max }
        }
        stockService.createStockUser(params)
        window.location.reload();
    };

    return (
        <div className="stocks--updater--modal">
            <style>
                {
                    `
                        .btn-primary {
                            margin: 1rem 1.5rem;
                        }
                        `
                }

            </style>
            <Button variant="primary" onClick={handleShow}>
                Add Stock
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form.Group controlId="formSymbol">
                            <Form.Label>Ticket</Form.Label>
                            <Form.Control onChange={e => setTicket(e.target.value)}
                                type="text"
                                placeholder="Enter ticket" />
                        </Form.Group>
                        <Form.Group controlId="formPriceMin">
                            <Form.Label>Price min</Form.Label>
                            <Form.Control
                                onChange={e => setPriceMin(e.target.value)}
                                type="text" />
                        </Form.Group>
                        <Form.Group controlId="formSymbol">
                            <Form.Label>Price max</Form.Label>
                            <Form.Control
                                onChange={e => setPriceMax(e.target.value)}
                                type="text" />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StockUpdaterModal;