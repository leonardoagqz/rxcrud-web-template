/* rxlib - ModalWarning v1.1.0 */

import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalWarningProps {
    onHide: () => void;
    showWarning: boolean;
    messageWarning: string;
}

export function ModalWarning(props: ModalWarningProps) {
    return (
        <Modal ref={React.createRef()} show={props.showWarning} onHide={props.onHide} centered className='rxlib-modal-warning-alert'>
            <Modal.Header ref={React.createRef()} className='alert-warning rxlib-modal-warning-header'>
                <Modal.Title className='h6'>Atenção</Modal.Title>
                <button type='button' className='btn-close' aria-label='Close' onClick={props.onHide} />
            </Modal.Header>
            <Modal.Body className='alert rxlib-modal-warning-alert alert-warning rxlib-modal-warning-body' role='alert'>
                {props.messageWarning}
            </Modal.Body>
        </Modal>
    )
}