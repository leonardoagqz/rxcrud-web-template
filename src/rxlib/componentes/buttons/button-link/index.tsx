/* rxlib - ButtonLink v1.1.1 */

interface ButtonLinkProps {
    link: string;
    texto: string;
    className?: string;
    classIcone?: string;
    abrirNovaJanela?: boolean;
}

export function ButtonLink(props: ButtonLinkProps) {
    let buttonClass = 'btn btn-warning btn-block rxlib-btn';
    if ((props.className) && (props.className !== '')) {
        buttonClass = props.className + ' ' + buttonClass;
    }

    return (
        <>
            {
                ((props.classIcone) && (props.classIcone !== ''))
                    ? props.abrirNovaJanela
                        ? <a href={props.link} className={buttonClass} target='_blank' rel='noopener noreferrer'><i className={props.classIcone}></i></a>
                        : <a href={props.link} className={buttonClass}><i className={props.classIcone}></i></a>
                    : props.abrirNovaJanela
                        ? <a href={props.link} className={buttonClass} target='_blank' rel='noopener noreferrer'>{props.texto}</a>
                        : <a href={props.link} className={buttonClass}>{props.texto}</a>
            }
        </>
    )
}