/* rxlib - Breadcrumb v1.1.0 */

export interface BreadcrumbItem {
    link: string;
    texto: string;
}

interface BreadcrumbProps {
    itens?: BreadcrumbItem[];
}

export function Breadcrumb(props: BreadcrumbProps) {
    return (
        <nav aria-label='breadcrumb' className='rxlib-breadcrumb'>
            <ol className='breadcrumb pt-2 ps-3'>
                {
                    props.itens
                        ? props.itens.map(item =>
                            item.link === ''
                                ? <li key={item.texto} className='breadcrumb-item active' aria-current='page'>{item.texto}</li>
                                : <li key={item.texto} className='breadcrumb-item'><a href={item.link}>{item.texto}</a></li>
                        )
                        : ''
                }
            </ol>
        </nav>
    )
}