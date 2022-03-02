/* rxlib - Popover v1.1.0 */

import { Popover as Popoverbs, OverlayTrigger, Button } from 'react-bootstrap';

interface PopoverProps {
    text: string;
}

export function Popover(props: PopoverProps) {

    const popover = (
        <Popoverbs id='popover-basic'>
            <Popoverbs.Title as='h3'>Informações</Popoverbs.Title>
            <Popoverbs.Content>
                {props.text}
            </Popoverbs.Content>
        </Popoverbs>
    );

    return (
        <OverlayTrigger trigger='click' placement='bottom' overlay={popover}>
            <Button variant='warning' className='rxlib-btn-popover'>
                <i className='far fa-question-circle mx-1' />
            </Button>
        </OverlayTrigger>
    )
}