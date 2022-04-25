import { AxiosError } from 'axios';
import api from '../../../services/api';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Redirecionar from '../../../components/redirecionar';
import { ApiError, CadastroProps, Usuario } from '../../../services/tipos';
import { RxlibLayout } from '../../../rxlib/componentes/layout/rxlib-Layout';
import { ModalPrimary } from '../../../rxlib/componentes/modal/modal-primary';
import { ModalWarning } from '../../../rxlib/componentes/modal/modal-warning';
import { criptografar, descriptografar, tratarErroApi } from '../../../rxlib/services/utilitarios';

import {
    Breadcrumb,
    InputLabel,
    ButtonsCrud,
    BreadcrumbItem,
} from 'rxlib-react';

function UsuarioCadastro(props: CadastroProps) {
    const [salvo, setSalvo] = useState<boolean>(false);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [showPrimary, setShowPrimary] = useState<boolean>(false);
    const [messageWarning, setMessageWarning] = useState<string[]>([]);
    const [messagePrimary, setMessagePrimary] = useState<string[]>([]);

    const [usuario, setUsuario] = useState<Usuario>({
        id: '',
        nome: '',
        email: '',
        senha: '',
        nomeAcesso: '',
    });

    const { register, handleSubmit } = useForm<Usuario>();

    const handleHideWarning = () => setShowWarning(false);

    const handleHidePrimary = () => {
        setShowPrimary(false);
        setSalvo(true);
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { texto: 'Home', link: '/home' },
        { texto: 'Usuários', link: '/usuario' },
        { texto: props.match.params.action ? 'Visualização' : props.match.params.id ? 'Edição' : 'Novo', link: '' },
    ];

    useEffect(() => {
        if (props.match.params.id) {
            api.get(`/Usuario/${props.match.params.id}`)
                .then(response => {
                    setUsuario({
                        id: response.data.id,
                        nome: response.data.nome,
                        email: response.data.email,
                        nomeAcesso: response.data.nomeAcesso,
                        senha: descriptografar(response.data.senha).replaceAll(response.data.nomeAcesso, ''),
                    });
                }).catch((error: AxiosError<ApiError>) => {
                    tratarErro(error);
                });
        }
    }, [props.match.params.id]);

    const onSubmit: SubmitHandler<Usuario> = data => {
        setCarregando(true);
        data.senha = criptografar(data.nomeAcesso + data.senha);
        props.match.params.id
            ? editar(data)
            : salvar(data);
    }

    function salvar(data: Usuario) {
        api.post('/Usuario', data)
            .then(response => {
                informarSucesso();
            }).catch((error: AxiosError<ApiError>) => {
                tratarErro(error);
            });
    }

    function editar(data: Usuario) {
        api.put('/Usuario', data)
            .then(response => {
                informarSucesso();
            }).catch((error: AxiosError<ApiError>) => {
                tratarErro(error);
            });
    }

    function informarSucesso() {
        setMessagePrimary(['Usuário salvo com sucesso.']);
        setShowPrimary(true);
    }

    function tratarErro(error: AxiosError<ApiError>) {
        setCarregando(false);
        setMessageWarning(tratarErroApi(error, 'Não foi possível salvar o usuário: '));
        setShowWarning(true);
    }

    return (
        <>
            <RxlibLayout>
                <Breadcrumb
                    itens={breadcrumbs} />
                <form onSubmit={handleSubmit(onSubmit)} className='rxlib-form'>
                    <div className='container-fluid'>
                        <div className='row px-1'>
                            <div className='col-12'>
                                <h6>{props.match.params.action ? 'Visualizar' : props.match.params.id ? 'Editar' : 'Novo'} usuário</h6>
                            </div>
                        </div>
                        {
                            props.match.params.id
                                ? <div className='row px-1'>
                                    <div className='col-12 mt-1'>
                                        <InputLabel
                                            name='id'
                                            type='text'
                                            id='inputId'
                                            maxLength={50}
                                            label='Código:'
                                            readOnly={true}
                                            autoFocus={false}
                                            defaultValue={usuario.id}
                                            placeholder='Código do usuário'
                                            referencia={register({ required: true })} />
                                    </div>
                                </div>
                                : ''
                        }
                        <div className='row px-1'>
                            <div className='col-12 mt-1'>
                                <InputLabel
                                    name='nome'
                                    type='text'
                                    label='Nome:'
                                    id='inputNome'
                                    maxLength={50}
                                    autoFocus={true}
                                    defaultValue={usuario.nome}
                                    placeholder='Nome do usuário'
                                    referencia={register({ required: true })}
                                    readOnly={props.match.params.action === 'view'} />
                            </div>
                        </div>
                        <div className='row px-1'>
                            <div className='col-12 mt-1'>
                                <InputLabel
                                    name='email'
                                    type='email'
                                    id='inputEmail'
                                    label='E-mail:'
                                    maxLength={100}
                                    autoFocus={false}
                                    defaultValue={usuario.email}
                                    placeholder='E-mail do usuário'
                                    referencia={register({ required: true })}
                                    readOnly={props.match.params.action === 'view'} />
                            </div>
                        </div>
                        <div className='row px-1'>
                            <div className='col-12 mt-1'>
                                <InputLabel
                                    type='text'
                                    maxLength={50}
                                    label='Usuário:'
                                    autoFocus={false}
                                    name='nomeAcesso'
                                    id='inputNomeAcesso'
                                    placeholder='Usuário'
                                    defaultValue={usuario.nomeAcesso}
                                    referencia={register({ required: true })}
                                    readOnly={props.match.params.action === 'view'} />
                            </div>
                        </div>
                        <div className='row px-1'>
                            <div className='col-12 mt-1'>
                                <InputLabel
                                    name='senha'
                                    label='Senha:'
                                    maxLength={50}
                                    id='inputSenha'
                                    type='password'
                                    autoFocus={false}
                                    defaultValue={usuario.senha}
                                    placeholder='Senha do usuário'
                                    referencia={register({ required: true })}
                                    readOnly={props.match.params.action === 'view'} />
                            </div>
                        </div>
                        <ButtonsCrud
                            styleButton='btn-rxlib'
                            carregando={carregando}
                            linkCancelarVoltar='/usuario'
                            visualizar={props.match.params.action === 'view'} />
                    </div>
                </form>
                <ModalWarning
                    show={showWarning}
                    message={messageWarning}
                    onHide={handleHideWarning} />
                <ModalPrimary
                    show={showPrimary}
                    message={messagePrimary}
                    onHide={handleHidePrimary} />
                <Redirecionar
                    se={salvo}
                    para='/usuario' />
            </RxlibLayout>
        </>
    );
}

export default UsuarioCadastro;