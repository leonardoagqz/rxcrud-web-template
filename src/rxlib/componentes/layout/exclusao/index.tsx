/* rxlib - Exclusao v1.1.0 */

import { Button } from '../../buttons/button';
import { ButtonLink } from '../../buttons/button-link';

interface ExclusaoProps {
    titulo: string;
    carregando: boolean;
    onSubmit: () => void;
    linkCancelar?: string;
    onCancelar?: () => void;
}

export function Exclusao(props: ExclusaoProps) {
    return (
        <form onSubmit={props.onSubmit}>
            <div className='container-fluid'>
                <div className='row px-1'>
                    <div className='col-12 text-center'>
                        <h6>{props.titulo}</h6>
                    </div>
                </div>
                <div className='row px-1 mt-1'>
                    <div className='col-12 d-flex text-center'>
                        <div className={
                            props.carregando
                                ? 'rxlib-exclusao-button-com-spinner rxlib-exclusao-com-spinner '
                                : 'rxlib-exclusao-button rxlib-exclusao '
                        }>
                            <Button
                                type='submit'
                                texto='Excluir'
                                carregando={props.carregando} />
                        </div>
                        {
                            !props.carregando
                                ? <div className='rxlib-cancelar-button rxlib-cancelar'>
                                    {
                                        ((props.linkCancelar) && (props.linkCancelar !== ''))
                                            ? <ButtonLink
                                                texto='Cancelar'
                                                link={props.linkCancelar} />
                                            : (!!props.onCancelar)
                                                ? <Button
                                                    type='button'
                                                    texto='Cancelar'
                                                    onClick={props.onCancelar} />
                                                : ''
                                    }
                                </div>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}