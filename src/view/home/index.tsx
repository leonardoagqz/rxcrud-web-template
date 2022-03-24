import './home.css';
import { useState } from 'react';
import { AcessoProps } from '../../services/tipos';
import { obterVersao } from '../../services/utilitarios';
import { RxlibLayout } from '../../rxlib/componentes/layout/rxlib-Layout';
import { ModalWarning } from '../../rxlib/componentes/modal/modal-warning';

function Home(props: AcessoProps) {
    const [acao, setAcao] = useState(props.match.params.acao);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [messageWarning, setMessageWarning] = useState<string[]>([]);

    const handleHide = () => setShowWarning(false);

    function showMensagemSemAcesso() {
        setMessageWarning(['Usuário logado não tem permissão para realizar essa ação.']);
        setShowWarning(true);
        setAcao('');
    }

    return (
        <>
            {
                acao === 'acessobloqueado'
                    ? showMensagemSemAcesso()
                    : ''
            }

            <RxlibLayout>
                <div className='rxlib-lista-componentes'>
                    <p>rxlib {obterVersao()}</p>
                    <p> - componentes</p>
                    <p> - - AcessoBloqueado v1.1.0</p>
                    <p> - - Breadcrumb v1.1.0</p>
                    <p> - - Buttons</p>
                    <p> - - - Button v1.1.2</p>
                    <p> - - - ButtonLink v1.1.1</p>
                    <p> - - - ButtonTableOrder v1.1.0</p>
                    <p> - - - ButtonsCrud v1.1.0</p>
                    <p> - - Card v1.1.1</p>
                    <p> - - Checkbox v1.1.2</p>
                    <p> - - InputLabel v1.1.5</p>
                    <p> - - layout</p>
                    <p> - - - Exclusao v1.1.0</p>
                    <p> - - - Listagem v1.1.3</p>
                    <p> - - - NavbarLayout v1.1.1</p>
                    <p> - - - RxlibLayout v1.1.3</p>
                    <p> - - - SidebarLayout v1.1.1</p>
                    <p> - - modal</p>
                    <p> - - - ModalPrimary v1.1.2</p>
                    <p> - - - ModalWarning v1.1.2</p>
                    <p> - - Paginacao v1.1.1</p>
                    <p> - - Popover v1.1.0</p>
                    <p> - - Redirecionar v1.1.0</p>
                    <p> - - select</p>
                    <p> - - - SelectLabel v1.1.3</p>
                    <p> - - - SelectLabelAsync v1.1.11</p>
                    <p> - - - SelectLabelUf v1.1.1</p>
                    <p> - - Spinner v1.1.1</p>
                    <p> - - Table v1.1.5</p>
                    <p> - - TextareaLabel v1.1.2</p>
                    <p> - - TreePermissoes v1.1.0</p>
                    <p> - - VerticalTimeline v1.1.0</p>
                    <p> - services</p>
                    <p> - - Seguranca v1.1.2</p>
                    <p> - - Utilitarios v1.1.5</p>
                    <p> - style</p>
                    <p> - - Responsividade v1.1.0</p>
                    <p> - - RXLib v1.1.7</p>
                </div>
            </RxlibLayout>

            <ModalWarning
                show={showWarning}
                onHide={handleHide}
                message={messageWarning} />
        </>
    )
}

export default Home;