/* rxlib - VerticalTimeline v1.1.0 */

import { useState } from 'react';
import { Informacoes } from './informacoes';
import 'react-vertical-timeline-component/style.min.css';
import { formatarDataHora, obterIdButton } from '../../services/utilitarios';

import {
    VerticalTimeline as Timeline,
    VerticalTimelineElement as Element
} from 'react-vertical-timeline-component';

interface VerticalTimelineProps {
    campoData: string;
    campoTexto: string;
    campoTitulo: string;
    campoTituloPai?: string;
    campoInformacoes?: string;
    fonteDados: [{ [key: string]: string; }];
}

export function VerticalTimeline(props: VerticalTimelineProps) {
    const [informacoes, setInformacoes] = useState<string>('');
    const [showInformacoes, setShowInformacoes] = useState<boolean>(false);

    const handleHideInformacoes = () => setShowInformacoes(false);

    function obterCampoFilho(fonteDados: any, campo: string) {
        return fonteDados[campo];
    }

    function chamarInformacoes(e: React.FormEvent<HTMLButtonElement>) {
        setInformacoes(obterIdButton(e));
        setShowInformacoes(true);
    }

    return (
        <>
            {
                (props.fonteDados.length > 0) && (!!props.fonteDados[0][props.campoData])
                    ? <Timeline>
                        {
                            props.fonteDados.map((item, index) =>
                                <Element
                                    key={index}
                                    className='vertical-timeline-element--work'
                                    date={formatarDataHora(item[props.campoData])}
                                    contentArrowStyle={{
                                        borderRight: '7px solid #FF7D00',
                                    }}
                                    iconStyle={{
                                        color: '#F5F5F5',
                                        fontSize: '2.5rem',
                                        textAlign: 'center',
                                        background: '#FF7D00',
                                    }}
                                    contentStyle={{
                                        color: '#000000',
                                        background: '#F5F5F5',
                                    }}
                                    icon={
                                        <i className='fas fa-history'></i>
                                    }>
                                    <h4 className='vertical-timeline-element-title'>
                                        {
                                            (props.campoTitulo && props.campoTituloPai)
                                                ? obterCampoFilho(item[props.campoTituloPai], props.campoTitulo)
                                                : item[props.campoTitulo]
                                        }
                                        {
                                            props.campoInformacoes
                                                ? <button type='button' className='btn btn-block vertical-timeline-button-informacoes' id={item[props.campoInformacoes]} onClick={chamarInformacoes}>
                                                    <i className='fas fa-info-circle'></i>
                                                </button>
                                                : ''
                                        }
                                    </h4>
                                    <p>{item[props.campoTexto]}</p>
                                </Element>
                            )
                        }
                    </Timeline>
                    : <div className='container-fluid'>
                        <div className='row px-1'>
                            <div className='col-12 text-center'>
                                <h6>Não foram encontrados resultados para a consulta.</h6>
                            </div>
                        </div>
                    </div>
            }

            <Informacoes
                dados={informacoes}
                show={showInformacoes}
                onHide={handleHideInformacoes} />
        </>
    )
}