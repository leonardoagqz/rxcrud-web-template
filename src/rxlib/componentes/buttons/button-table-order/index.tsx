/* rxlib - ButtonTableOrder v1.1.0 */

import { ColunaOrdemTabela } from '../../table';

interface ButtonTableOrderProps {
    campo: string;
    colunaOrdemTabela: ColunaOrdemTabela;
    onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export function ButtonTableOrder(props: ButtonTableOrderProps) {
    return (
        <button className='btn btn-link rxlib-btn-order-table' type='button' id={props.campo} onClick={props.onClick}>
            {
                props.colunaOrdemTabela.campo === props.campo
                    ? props.colunaOrdemTabela.ordem === 'asc'
                        ? <i className='fas fa-sort-amount-down-alt active'></i>
                        : <i className='fas fa-sort-amount-up-alt active'></i>
                    : <i className='fas fa-sort-amount-down-alt'></i>
            }
        </button>
    )
}