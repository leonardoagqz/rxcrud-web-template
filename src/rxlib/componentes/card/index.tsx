/* rxlib - Card v1.1.1 */

interface CardProps {
    texto: string;
    titulo: string;
    subtitulo: string;
    classNameIcone: string;
}

export function Card(props: CardProps) {
    let cardClass = 'rxlib-card-icon';
    if ((props.classNameIcone) && (props.classNameIcone !== '')) {
        cardClass = props.classNameIcone + ' ' + cardClass;
    }

    return (
        <div className='card rxlib-card'>
            <div className='card-body'>
                <h5 className='card-title rxlib-card-title'>{props.titulo}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>{props.subtitulo}</h6>
                <p className='card-text rxlib-card-text'>
                    <div className='text-muted rxlib-card-text-muted'>{props.texto}</div>
                    <i className={cardClass}></i>
                </p>
            </div>
        </div>
    );
}