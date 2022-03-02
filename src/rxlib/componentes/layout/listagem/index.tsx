/* rxlib - Listagem v1.1.3 */

import { Spinner } from '../../spinner';
import { Paginacao } from '../../paginacao';
import { Button } from '../../buttons/button';
import { ButtonLink } from '../../buttons/button-link';
import { Table, AcoesTabela, ConfiguracoesTabela } from '../../table';

interface ListagemProps {
    campoId: string;
    fonteDados: [{}];
    linkNovo?: string;
    descricao?: string;
    className?: string;
    linkEdicao?: string;
    onNovo?: () => void;
    carregando: boolean;
    paginaAtual?: number;
    csvFilename?: string;
    linkExclusao?: string;
    linkListagem?: string;
    idEntidadePai?: string;
    usarOrdenacao?: boolean;
    listagemDetalhe: boolean;
    linkVisualizacao?: string;
    usarExportacaoCsv?: boolean;
    onEditar?: (id: string) => void;
    onExcluir?: (id: string) => void;
    quantidadeTotalRegistros?: number;
    tipoBotaoAcao: 'button' | 'submit';
    onVisualizar?: (id: string) => void;
    acoesPersonalizadas?: AcoesTabela[];
    quantidadeRegistrosPorPagina?: number;
    configuracoesTabela: ConfiguracoesTabela;
}

export function Listagem(props: ListagemProps) {
    let listagemClass = props.listagemDetalhe
        ? 'mb-5 mt-2 pt-2 px-1 border rxlib-listagem-detalhe'
        : 'mb-5 container-fluid';
    if ((props.className) && (props.className !== '')) {
        listagemClass = props.className + ' ' + listagemClass;
    }

    return (
        <div className={listagemClass}>
            <div className='row px-1'>
                {
                    props.descricao
                        ? <div className='col-7'>
                            <h6>{props.descricao}</h6>
                        </div>
                        : <div className='col-7' />
                }
                <div className='col-3' />
                <div className='col-2'>
                    {
                        ((props.linkNovo) && (props.linkNovo !== ''))
                            ? props.carregando
                                ? ''
                                : <ButtonLink
                                    texto='Novo'
                                    link={props.linkNovo} />
                            : props.onNovo
                                ? props.carregando
                                    ? ''
                                    : (props.idEntidadePai !== '')
                                        ? <Button
                                            texto='Novo'
                                            onClick={props.onNovo}
                                            type={props.tipoBotaoAcao} />
                                        : ''
                                : ''
                    }
                </div>
            </div>
            <div className='row px-3'>
                {
                    props.carregando
                        ? <Spinner
                            classStyle='mt-4 mb-4'
                            className={props.listagemDetalhe ? 'mb-3' : ''} />
                        : <Table
                            tableDetalhe={false}
                            campoId={props.campoId}
                            onEditar={props.onEditar}
                            onExcluir={props.onExcluir}
                            fonteDados={props.fonteDados}
                            linkEdicao={props.linkEdicao}
                            csvFilename={props.csvFilename}
                            onVisualizar={props.onVisualizar}
                            linkExclusao={props.linkExclusao}
                            usarOrdenacao={props.usarOrdenacao}
                            tipoBotaoAcao={props.tipoBotaoAcao}
                            configuracoes={props.configuracoesTabela}
                            linkVisualizacao={props.linkVisualizacao}
                            usarExportacaoCsv={props.usarExportacaoCsv}
                            acoesPersonalizadas={props.acoesPersonalizadas ? props.acoesPersonalizadas : []} />
                }
            </div>
            <div className='row px-3'>
                {
                    props.linkListagem
                        ? !props.carregando
                            ? <Paginacao
                                linkListagem={props.linkListagem}
                                paginaAtual={props.paginaAtual ? props.paginaAtual : 0}
                                quantidadeTotal={props.quantidadeTotalRegistros ? props.quantidadeTotalRegistros : 0}
                                quantidadePorPagina={props.quantidadeRegistrosPorPagina ? props.quantidadeRegistrosPorPagina : 0} />
                            : ''
                        : ''
                }
            </div>
        </div>
    )
}