/* rxlib - Button v1.1.2 */

import { Spinner } from '../../spinner';

interface ButtonProps {
    texto: string;
    className?: string;
    classIcone?: string;
    carregando?: boolean;
    onClick?: () => void;
    spinnerClassName?: string;
    type: 'button' | 'submit';
}

export function Button(props: ButtonProps) {
    let buttonClass = 'btn btn-warning btn-block rxlib-btn';
    if ((props.className) && (props.className !== '')) {
        buttonClass = props.className + ' ' + buttonClass;
    }

    return (
        <>
            {
                props.carregando
                    ? <Spinner className={props.spinnerClassName} />
                    : ((props.classIcone) && (props.classIcone !== ''))
                        ? <button type={props.type} onClick={props.onClick} className={buttonClass}><i className={props.classIcone}></i></button>
                        : <button type={props.type} onClick={props.onClick} className={buttonClass}>{props.texto}</button>
            }
        </>
    )
}