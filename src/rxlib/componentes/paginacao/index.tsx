/* rxlib - Paginacao v1.1.1 */

interface PaginacaoProps {
    paginaAtual: number;
    linkListagem: string;
    quantidadeTotal: number;
    quantidadePorPagina: number;
}

export function Paginacao(props: PaginacaoProps) {

    let paginas = [];
    let quantidadePaginas = Math.ceil(props.quantidadeTotal / props.quantidadePorPagina);

    for (let contador = 0; contador < quantidadePaginas; contador++) {
        paginas.push(
            { pagina: contador + 1 }
        )
    }

    let paginaAtual = props.paginaAtual ? props.paginaAtual : 1;

    return (
        quantidadePaginas > 1
            ? <nav aria-label='Paginação' key='paginacao'>
                <ul className='pagination justify-content-end'>
                    {
                        (paginaAtual - 1) > 0
                            ? <li key='anterior' className='page-item'>
                                <a className='page-link' href={`${props.linkListagem}/pagina/${paginaAtual - 1}`}>Anterior</a>
                            </li>
                            : ''
                    }
                    {
                        paginas.map((item, index) =>
                            (item.pagina.toString() === paginaAtual.toString())
                                ? <li key={index} className='page-item active'>
                                    <a className='page-link' href={`${props.linkListagem}/pagina/${item.pagina}`}>{item.pagina}</a>
                                </li>
                                : <li key={index} className='page-item'>
                                    <a className='page-link' href={`${props.linkListagem}/pagina/${item.pagina}`}>{item.pagina}</a>
                                </li>
                        )
                    }
                    {
                        (paginaAtual + 1) <= quantidadePaginas
                            ? <li key='proximo' className='page-item'>
                                <a className='page-link' href={`${props.linkListagem}/pagina/${paginaAtual + 1}`}>Próximo</a>
                            </li>
                            : ''
                    }
                </ul>
            </nav>
            : null
    )
}