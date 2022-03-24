/* rxlib - ModalPrimary v1.1.2 */

import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalPrimaryProps {
    show: boolean;
    message: string[];
    onHide: () => void;
}

export function ModalPrimary(props: ModalPrimaryProps) {
    return (
        <Modal ref={React.createRef()} show={props.show} onHide={props.onHide} centered className='rxlib-modal-primary-alert'>
            <Modal.Header ref={React.createRef()} className='alert-primary rxlib-modal-primary-header'>
                <Modal.Title className='h6'>Informação</Modal.Title>
                <button type='button' className='btn-close' aria-label='Close' onClick={props.onHide} />
            </Modal.Header>
            <Modal.Body className='alert rxlib-modal-primary-alert alert-primary rxlib-modal-primary-body' role='alert'>
                {
                    (props.message !== undefined)
                        ? props.message.map((item, index) =>
                            <div key={index}>{item}</div>
                        )
                        : ''
                }
            </Modal.Body>
        </Modal>
    )
}