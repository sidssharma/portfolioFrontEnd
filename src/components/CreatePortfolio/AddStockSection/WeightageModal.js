import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function WeightageModal(props) {
    const [stockWeight, setStockWeight] = useState('');

    function updateWeightAge(weight) {
        const updatedStock = { ...props.currentStock, weightage: weight }; // Create a new object with updated weightage
        props.setCurrentStock(updatedStock);
        props.addPortfolioStocks(updatedStock);
        setStockWeight(''); // Reset input field
        props.handleClose();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Stock Weightage</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Add the stock weightage in your portfolio as a percentage</p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add percentage"
                        aria-describedby="basic-addon1"
                        value={stockWeight}
                        onChange={(e) => setStockWeight(e.target.value)}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateWeightAge(parseFloat(stockWeight)); // Ensure weight is parsed as a float
                        }}
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
