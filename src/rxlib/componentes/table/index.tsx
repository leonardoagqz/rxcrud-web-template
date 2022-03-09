/* rxlib - Table v1.1.5 */

import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '../buttons/button';
import { TipoColunaTabela } from '../../../services/config';
import { ButtonTableOrder } from '../buttons/button-table-order';
import { formatarPorTipo, obterIdButton } from '../../services/utilitarios';

export type TipoColunaTabelaBase = 'string' | 'boolean' | 'date' | 'status' | 'currency' | 'download';

type HeaderCsv = {
    key: string;
    label: string;
}

type ColunaTabela = {
    nome: string;
    campo: string;
    entidadePai?: string;
    entidadeAvo?: string;
    tipo: TipoColunaTabela;
    iconeDownloadClassName?: string;
}

export type ConfiguracoesTabela = {
    mensagemPadrao: string;
    colunas: ColunaTabela[];
}

export type AcoesTabela = {
    nome: string;
    link?: string;
    campo?: string;
    entidadePai?: string;
    entidadeAvo?: string;
    iconeClassName: string;
    onClick?: (id: string) => void;
}

export interface ColunaOrdemTabela {
    campo: string;
    ordem: string;
}

interface TableProps {
    campoId: string;
    linkEdicao?: string;
    csvFilename?: string;
    linkExclusao?: string;
    tableDetalhe: boolean;
    usarOrdenacao?: boolean;
    linkVisualizacao?: string;
    classColunaAcoes?: string;
    usarExportacaoCsv?: boolean;
    onEditar?: (id: string) => void;
    onExcluir?: (id: string) => void;
    tipoBotaoAcao: 'button' | 'submit';
    acoesPersonalizadas: AcoesTabela[];
    configuracoes: ConfiguracoesTabela;
    onVisualizar?: (id: string) => void;
    fonteDados: [{ [key: string]: string; }];
}

export function Table(props: TableProps) {

    const [colunaOrdemTabela, setColunaOrdemTabela] = useState<ColunaOrdemTabela>({
        campo: '',
        ordem: '',
    });

    function obterCampoObjeto(fonteDados: any, campo?: string, campoPai?: string, campoAvo?: string): string {
        if ((campoAvo) && (campoPai) && (campo)) {
            let avo = fonteDados[campoAvo];
            return avo[campoPai][campo];
        } else if ((campoPai) && (campo)) {
            let pai = fonteDados[campoPai];
            return pai[campo];
        } else if (campo) {
            return fonteDados[campo];
        } else {
            return '';
        }
    }

    function handleEditar(e: React.FormEvent<HTMLButtonElement>) {
        if (props.onEditar)
            props.onEditar(obterIdButton(e));
    }

    function handleVisualizar(e: React.FormEvent<HTMLButtonElement>) {
        if (props.onVisualizar)
            props.onVisualizar(obterIdButton(e));
    }

    function handleExcluir(e: React.FormEvent<HTMLButtonElement>) {
        if (props.onExcluir)
            props.onExcluir(obterIdButton(e));
    }

    function handleClick(e: React.FormEvent<HTMLButtonElement>, onClick?: (id: string) => void) {
        if (onClick)
            onClick(obterIdButton(e));
    }

    function handleOrder(e: React.FormEvent<HTMLButtonElement>) {

        let ordem = 'asc';
        let campo = obterIdButton(e);

        if (colunaOrdemTabela.campo === campo) {
            switch (colunaOrdemTabela.ordem) {
                case '':
                    ordem = 'asc';
                    break;
                case 'asc':
                    ordem = 'desc';
                    break;
                case 'desc':
                    ordem = 'asc';
                    break;
            }
        }

        setColunaOrdemTabela({
            campo: campo,
            ordem: ordem,
        });

        if (campo !== '') {
            props.fonteDados.sort(function (a, b) {
                const coluna = props.configuracoes.colunas.find(coluna => coluna.campo === campo);
                if (coluna) {
                    let campoA = formatarPorTipo(coluna.tipo, obterCampoObjeto(a, coluna.campo, coluna.entidadePai, coluna.entidadeAvo));
                    let campoB = formatarPorTipo(coluna.tipo, obterCampoObjeto(b, coluna.campo, coluna.entidadePai, coluna.entidadeAvo));
                    return verificarOrdem(ordem, campoA.toUpperCase(), campoB.toUpperCase());
                } else {
                    return 0;
                }
            });
        }
    }

    function verificarOrdem(ordem: string, a: string, b: string): number {
        if (ordem === 'asc') {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        } else if (ordem === 'desc') {
            if (a < b) {
                return 1;
            }
            if (a > b) {
                return -1;
            }
            return 0;
        } else {
            return 0;
        }
    }

    function getGeadersCsv(): HeaderCsv[] {
        let headers: HeaderCsv[] = [];

        props.configuracoes.colunas.map(coluna =>
            (coluna.entidadeAvo && coluna.entidadePai && coluna.campo)
                ? headers.push({
                    key: coluna.entidadeAvo + '.' + coluna.entidadePai + '.' + coluna.campo,
                    label: coluna.nome,
                })
                : (coluna.entidadePai && coluna.campo)
                    ? headers.push({
                        key: coluna.entidadePai + '.' + coluna.campo,
                        label: coluna.nome,
                    })
                    : headers.push({
                        key: coluna.campo,
                        label: coluna.nome,
                    })
        )

        return headers;
    }

    return (
        <>
            <table className='table table-striped rxlib-table-overflow'>
                <thead>
                    <tr key='colunas'>
                        {
                            props.configuracoes.colunas.map((coluna, index) =>
                                (index === 0)
                                    ? <th key={coluna.nome} scope='col'>
                                        {coluna.nome}
                                        {
                                            props.usarOrdenacao
                                                ? <ButtonTableOrder campo={coluna.campo} colunaOrdemTabela={colunaOrdemTabela} onClick={handleOrder} />
                                                : ''
                                        }
                                    </th>
                                    : <th key={coluna.nome} scope='col' className='rxlib-coluna-tabela'>
                                        {coluna.nome}
                                        {
                                            props.usarOrdenacao
                                                ? <ButtonTableOrder campo={coluna.campo} colunaOrdemTabela={colunaOrdemTabela} onClick={handleOrder} />
                                                : ''
                                        }
                                    </th>
                            )
                        }
                        <th scope='col' className={
                            (props.acoesPersonalizadas.length > 0)
                                ? props.tableDetalhe
                                    ? props.acoesPersonalizadas.length === 1
                                        ? 'rxlib-coluna-acoes-personalizadas-detalhe-1'
                                        : props.acoesPersonalizadas.length === 2
                                            ? 'rxlib-coluna-acoes-personalizadas-detalhe-2'
                                            : 'rxlib-coluna-acoes-personalizadas-detalhe-3'
                                    : props.acoesPersonalizadas.length === 1
                                        ? 'rxlib-coluna-acoes-personalizadas-1'
                                        : props.acoesPersonalizadas.length === 2
                                            ? 'rxlib-coluna-acoes-personalizadas-2'
                                            : 'rxlib-coluna-acoes-personalizadas-3'
                                : props.tableDetalhe
                                    ? 'rxlib-coluna-acoes-detalhe'
                                    : 'rxlib-coluna-acoes'
                        }></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ((props.fonteDados.length > 0) && (!!props.fonteDados[0][props.campoId]))
                            ? props.fonteDados.map((item, index) => (
                                <tr key={index}>
                                    {
                                        props.configuracoes.colunas.map((coluna, index) =>
                                            coluna.tipo === 'download'
                                                ? <td key={index} className={(index === 0) ? '' : 'rxlib-coluna-tabela'}>
                                                    <a href={obterCampoObjeto(item, coluna.campo, coluna.entidadePai, coluna.entidadeAvo)}
                                                        download={coluna.campo} target='_blank' rel='noopener noreferrer' title={coluna.nome}>
                                                        <i className={coluna.iconeDownloadClassName} />
                                                    </a>
                                                </td>
                                                : <td key={index} className={(index === 0) ? '' : 'rxlib-coluna-tabela'}>
                                                    {formatarPorTipo(coluna.tipo, obterCampoObjeto(item, coluna.campo, coluna.entidadePai, coluna.entidadeAvo))}
                                                </td>
                                        )
                                    }
                                    <td key='acoes' className={props.classColunaAcoes}>
                                        {
                                            ((props.linkEdicao) && (props.linkEdicao !== ''))
                                                ? <a href={`${props.linkEdicao}/${item[props.campoId]}`} title='Editar'>
                                                    <i className='fa fa-edit me-3' />
                                                </a>
                                                : (!!props.onEditar)
                                                    ? <button className='btn btn-link rxlib-btn-link-table' type={props.tipoBotaoAcao}
                                                        id={item[props.campoId]} onClick={handleEditar} title='Editar'>
                                                        <i className='fa fa-edit me-3' />
                                                    </button>
                                                    : ''
                                        }
                                        {
                                            ((props.linkVisualizacao) && (props.linkVisualizacao !== ''))
                                                ? <a href={`${props.linkVisualizacao}/${item[props.campoId]}/view`} title='Visualizar'>
                                                    <i className='fa fa-eye me-3' />
                                                </a>
                                                : (!!props.onVisualizar)
                                                    ? <button className='btn btn-link rxlib-btn-link-table' type={props.tipoBotaoAcao}
                                                        id={item[props.campoId]} onClick={handleVisualizar} title='Visualizar'>
                                                        <i className='fa fa-eye me-3' />
                                                    </button>
                                                    : ''
                                        }
                                        {
                                            ((props.linkExclusao) && (props.linkExclusao !== ''))
                                                ? <a href={`${props.linkExclusao}/${item[props.campoId]}`} title='Excluir'>
                                                    <i className='fa fa-trash me-3' />
                                                </a>
                                                : (!!props.onExcluir)
                                                    ? <button className='btn btn-link rxlib-btn-link-table' type={props.tipoBotaoAcao}
                                                        id={item[props.campoId]} onClick={handleExcluir} title='Excluir'>
                                                        <i className='fa fa-trash me-3' />
                                                    </button>
                                                    : ''
                                        }
                                        {
                                            props.acoesPersonalizadas.length > 0 ?
                                                props.acoesPersonalizadas.map((acao, index) =>
                                                    ((acao.link) && (acao.link !== ''))
                                                        ? <a key={index} href={`${acao.link}/${item[props.campoId]}`} title={acao.nome}>
                                                            <i className={acao.iconeClassName} />
                                                        </a>
                                                        : (!!acao.onClick)
                                                            ? <button key={index} className='btn btn-link rxlib-btn-link-table' type={props.tipoBotaoAcao} onClick={(e) => handleClick(e, acao.onClick)} title={acao.nome}
                                                                id={obterCampoObjeto(item, acao.campo, acao.entidadePai, acao.entidadeAvo)}>
                                                                <i className={acao.iconeClassName} />
                                                            </button>
                                                            : ''
                                                ) : ''
                                        }
                                    </td>
                                </tr>
                            ))
                            : <tr key='0'>
                                <td key='0' colSpan={props.configuracoes.colunas.length + 1}>{props.configuracoes.mensagemPadrao}</td>
                            </tr>
                    }
                </tbody>
            </table>
            {
                ((props.fonteDados.length > 0) && (!!props.fonteDados[0][props.campoId]) && (props.usarExportacaoCsv))
                    ? <CSVLink
                        data={props.fonteDados}
                        headers={getGeadersCsv()}
                        filename={props.csvFilename ? props.csvFilename : 'arquivo.csv'}>
                        <Button
                            type='button'
                            texto='Exportar CSV'
                            className='rxlib-btn-csv-table' />
                    </CSVLink>
                    : ''
            }
        </>
    )
}