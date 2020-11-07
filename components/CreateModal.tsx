import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'

export default function CreateModal() {
    //for bootstrap modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
        <Button variant="primary" onClick={handleShow}>Create</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create new post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table>
                    <tr>
                        <td>Mission name:</td>
                        <td><input type="text" /></td>
                    </tr>

                    <tr>
                        <td>Mission date:</td>
                        <td><input type="text" /></td>
                    </tr>

                    <tr>
                        <td>Mission location:</td>
                        <td><input type="text" /></td>
                    </tr>

                    <tr>
                        <td>Rocket:</td>
                        <td><input type="text" /></td>
                    </tr>

                    <tr>
                        <td>Flights:</td>
                        <td><input type="text" /></td>
                    </tr>

                    <tr>
                        <td>Reuse count:</td>
                        <td><input type="text" /></td>
                    </tr>

                    <tr>
                        <td>Status:</td>
                        <td><input type="text" /></td>
                    </tr>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
          </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save
          </Button>
            </Modal.Footer>
        </Modal>
    </>
}