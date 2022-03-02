/* rxlib - ModalPrimary v1.1.0 */

import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalPrimaryProps {
    onHide: () => void;
    showPrimary: boolean;
    messagePrimary: string;
}

export function ModalPrimary(props: ModalPrimaryProps) {
    return (
        <Modal ref={React.createRef()} show={props.showPrimary} onHide={props.onHide} centered className='rxlib-modal-primary-alert'>
            <Modal.Header ref={React.createRef()} className='alert-primary rxlib-modal-primary-header'>
                <Modal.Title className='h6'>Informação</Modal.Title>
                <button type='button' className='btn-close' aria-label='Close' onClick={props.onHide} />
            </Modal.Header>
            <Modal.Body className='alert rxlib-modal-primary-alert alert-primary rxlib-modal-primary-body' role='alert'>
                {props.messagePrimary}
            </Modal.Body>
        </Modal>
    )
}