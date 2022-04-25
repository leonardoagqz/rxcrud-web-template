import { useState } from 'react';
import { AcessoProps } from '../../services/tipos';
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
            </RxlibLayout>

            <ModalWarning
                show={showWarning}
                onHide={handleHide}
                message={messageWarning} />
        </>
    );
}

export default Home;