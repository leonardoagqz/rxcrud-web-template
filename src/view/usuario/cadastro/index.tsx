import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import api, { ApiError } from '../../../services/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CadastroProps, Usuario } from '../../../services/tipos';
import { InputLabel } from '../../../rxlib/componentes/input-label';
import { Redirecionar } from '../../../rxlib/componentes/redirecionar';
import { RxlibLayout } from '../../../rxlib/componentes/layout/rxlib-Layout';
import { ModalPrimary } from '../../../rxlib/componentes/modal/modal-primary';
import { ModalWarning } from '../../../rxlib/componentes/modal/modal-warning';
import { ButtonsCrud } from '../../../rxlib/componentes/buttons/buttons-crud';
import { Breadcrumb, BreadcrumbItem } from '../../../rxlib/componentes/breadcrumb';
import { criptografar, descriptografar } from '../../../rxlib/services/utilitarios';

function UsuarioCadastro(props: CadastroProps) {
    const [salvo, setSalvo] = useState<boolean>(false);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [showPrimary, setShowPrimary] = useState<boolean>(false);
    const [messageWarning, setMessageWarning] = useState<string>('');
    const [messagePrimary, setMessagePrimary] = useState<string>('');

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
            : salvar(data)
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
        setMessagePrimary('Usuário salvo com sucesso.');
        setShowPrimary(true);
    }

    function tratarErro(error: AxiosError<ApiError>) {
        setCarregando(false);
        if (error.response) {
            setMessageWarning(error.response.data.Mensagem);
        } else {
            setMessageWarning('Não foi possível salvar o usuário: ' + error.message);
        }
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
                                <h6>{props.match.params.action ? 'Visualizar' : props.match.params.id ? 'Editar' : 'Novo'} usuario de usuário</h6>
                            </div>
                        </div>
                        {
                            props.match.params.id
                                ? <div className='row px-1'>
                                    <div className='col-12 mt-1'>
                                        <InputLabel
                                            name='id'
                                            foco='nao'
                                            type='text'
                                            id='inputId'
                                            action='view'
                                            maxLength={50}
                                            label='Código:'
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
                                    foco='sim'
                                    name='nome'
                                    type='text'
                                    label='Nome:'
                                    id='inputNome'
                                    maxLength={50}
                                    defaultValue={usuario.nome}
                                    placeholder='Nome do usuário'
                                    action={props.match.params.action}
                                    referencia={register({ required: true })} />
                            </div>
                        </div>
                        <div className='row px-1'>
                            <div className='col-12 mt-1'>
                                <InputLabel
                                    foco='nao'
                                    name='email'
                                    type='email'
                                    id='inputEmail'
                                    label='E-mail:'
                                    maxLength={100}
                                    defaultValue={usuario.email}
                                    placeholder='E-mail do usuário'
                                    action={props.match.params.action}
                                    referencia={register({ required: true })} />
                            </div>
                        </div>
                        <div className='row px-1'>
                            <div className='col-12 mt-1'>
                                <InputLabel
                                    foco='nao'
                                    type='text'
                                    maxLength={50}
                                    label='Usuário:'
                                    name='nomeAcesso'
                                    id='inputNomeAcesso'
                                    placeholder='Usuário'
                                    defaultValue={usuario.nomeAcesso}
                                    action={props.match.params.action}
                                    referencia={register({ required: true })} />
                            </div>
                        </div>
                        <div className='row px-1'>
                            <div className='col-12 mt-1'>
                                <InputLabel
                                    foco='nao'
                                    name='senha'
                                    label='Senha:'
                                    maxLength={50}
                                    id='inputSenha'
                                    type='password'
                                    defaultValue={usuario.senha}
                                    placeholder='Senha do usuário'
                                    action={props.match.params.action}
                                    referencia={register({ required: true })} />
                            </div>
                        </div>
                        <ButtonsCrud
                            carregando={carregando}
                            linkCancelarVoltar='/usuario'
                            action={props.match.params.action} />
                    </div>
                </form>

                <ModalWarning
                    showWarning={showWarning}
                    onHide={handleHideWarning}
                    messageWarning={messageWarning} />

                <ModalPrimary
                    showPrimary={showPrimary}
                    onHide={handleHidePrimary}
                    messagePrimary={messagePrimary} />

                <Redirecionar
                    se={salvo}
                    para='/usuario' />

            </RxlibLayout>
        </>
    )
}

export default UsuarioCadastro;