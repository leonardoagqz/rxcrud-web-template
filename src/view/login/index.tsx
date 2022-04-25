import './template.css';
import { useState } from 'react';
import { AxiosError } from 'axios';
import api from '../../services/api';
import '../../rxlib/style/rxlib.css';
import { Button } from 'rxlib-react';
import logo from '../../images/logo.png';
import { Redirect } from 'react-router-dom';
import '../../rxlib/style/responsividade.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { obterVersao } from '../../services/utilitarios';
import { tokenExpirado } from '../../rxlib/services/seguranca';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { AcessoProps, ApiError, FormLogin } from '../../services/tipos';
import { ModalWarning } from '../../rxlib/componentes/modal/modal-warning';
import { criptografar, obterAmbiente, tratarErroApi } from '../../rxlib/services/utilitarios';

function Login(props: AcessoProps) {
    const [acao, setAcao] = useState(props.match.params.acao);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [messageWarning, setMessageWarning] = useState<string[]>([]);
    const [token, setToken] = useState<string>(useAppSelector(state => state.token));
    const [logado, setLogado] = useState<boolean>(useAppSelector(state => state.logado));
    const [expirado, setExpirado] = useState<boolean>(useAppSelector(state => state.expirado));

    const { register, handleSubmit } = useForm<FormLogin>();

    const dispatch = useAppDispatch();

    const handleHide = () => setShowWarning(false);

    const onSubmit: SubmitHandler<FormLogin> = data => {
        setCarregando(true);
        data.senha = criptografar(data.usuario + data.senha);
        api.post('/Login/Authenticate', data)
            .then(response => {
                setTimeout(() => {
                    dispatch({
                        type: 'LOG_IN',
                        token: response.data.token,
                    });
                    setToken(response.data.token);
                    setLogado(true);
                }, 250);
            }).catch((error: AxiosError<ApiError>) => {
                tratarErro(error);
            });
    }

    function tratarErro(error: AxiosError<ApiError>) {
        setCarregando(false);
        setMessageWarning(tratarErroApi(error, 'Não foi possível realizar o login: '));
        setShowWarning(true);
    }

    function showSecaoExpirada() {
        setMessageWarning(['A seção do usuário expirou. Realize o login novamente.']);
        setShowWarning(true);
        setExpirado(false);
    }

    function showAcessoBloqueado() {
        setMessageWarning(['O acesso foi bloqueado pois o usuário não esta logado.']);
        setShowWarning(true);
        setAcao('');
    }

    return (
        <>
            {
                !tokenExpirado(token)
                    ? logado
                        ? <Redirect to='/home' />
                        : ''
                    : ''
            }
            {
                expirado
                    ? showSecaoExpirada()
                    : ''
            }
            {
                acao === 'acessobloqueado'
                    ? showAcessoBloqueado()
                    : ''
            }
            <div className='login-content d-flex align-items-center'>
                <form className='form-signin mx-auto rxlib-login' onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-center rxlib-conteiner-logo'>
                        <img className='rxlib-logo' src={logo} alt='rxcrud' />
                    </div>
                    <div className='text-center mb-3'>
                        <label className='rxlib-nome'>RXCrud</label>
                    </div>
                    <div className='form-label-group'>
                        <input ref={register({ required: true })} name='usuario' type='text' id='inputUsuario' className='form-control' placeholder='Usuário' required autoFocus />
                        <label htmlFor='inputUsuario'>Usuário</label>
                    </div>
                    <div className='form-label-group'>
                        <input ref={register({ required: true })} name='senha' type='password' id='inputPassword' className='form-control' placeholder='Senha' required />
                        <label htmlFor='inputPassword'>Senha</label>
                    </div>
                    <div className='d-grid align-middle'>
                        <Button
                            type='submit'
                            texto='Entrar'
                            className='btn-lg'
                            classStyle='btn-rxlib'
                            carregando={carregando} />
                    </div>
                    <p className='mt-4 text-muted text-center'>
                        © 2022 {obterVersao()}
                        <span className='rxlib-homologacao'>
                            {obterAmbiente()}
                        </span>
                    </p>
                    <p className='mb-3 text-muted text-center'>
                        Developed by Gleryston Matos
                    </p>
                </form>
            </div>
            <ModalWarning
                show={showWarning}
                onHide={handleHide}
                message={messageWarning} />
        </>
    );
}

export default Login;