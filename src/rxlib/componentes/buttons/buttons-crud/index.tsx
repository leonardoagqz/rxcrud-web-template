/* rxlib - ButtonsCrud v1.1.0 */

import { Button } from '../button';
import { ButtonLink } from '../button-link';

interface ButtonsCrudProps {
    action: '' | 'view';
    carregando: boolean;
    linkCancelarVoltar?: string;
    onCancelarVoltar?: () => void;
}

export function ButtonsCrud(props: ButtonsCrudProps) {
    return (
        (props.action === 'view')
            ? <div className='row px-1'>
                <div className='col-12 mt-3 d-grid'>
                    <div className='rxlib-button-crud'>
                        {
                            ((props.linkCancelarVoltar) && (props.linkCancelarVoltar !== ''))
                                ? <ButtonLink
                                    texto='Voltar'
                                    link={props.linkCancelarVoltar} />
                                : (!!props.onCancelarVoltar)
                                    ? <Button
                                        type='button'
                                        texto='Voltar'
                                        onClick={props.onCancelarVoltar} />
                                    : ''
                        }
                    </div>
                </div>
            </div>
            : <div className='row px-1'>
                <div className='col-12 mt-3 d-flex'>
                    <div className={
                        props.carregando
                            ? 'rxlib-button-crud-com-spinner'
                            : 'rxlib-button-crud'
                    }>
                        <Button
                            type='submit'
                            texto='Salvar'
                            carregando={props.carregando} />
                    </div>
                    {
                        !props.carregando
                            ? <div className='rxlib-button-crud'>
                                {
                                    ((props.linkCancelarVoltar) && (props.linkCancelarVoltar !== ''))
                                        ? <ButtonLink
                                            texto='Cancelar'
                                            link={props.linkCancelarVoltar} />
                                        : (!!props.onCancelarVoltar)
                                            ? <Button
                                                type='button'
                                                texto='Cancelar'
                                                onClick={props.onCancelarVoltar} />
                                            : ''
                                }
                            </div>
                            : ''
                    }
                </div>
            </div>
    )
}