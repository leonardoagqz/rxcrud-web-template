import { useState } from 'react';
import { AxiosError } from 'axios';
import api, { ApiError } from '../../../services/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Exclusao } from '../../../rxlib/componentes/layout/exclusao';
import { ExclusaoProps, FormExclusao } from '../../../services/tipos';
import { Redirecionar } from '../../../rxlib/componentes/redirecionar';
import { RxlibLayout } from '../../../rxlib/componentes/layout/rxlib-Layout';
import { ModalWarning } from '../../../rxlib/componentes/modal/modal-warning';
import { ModalPrimary } from '../../../rxlib/componentes/modal/modal-primary';
import { Breadcrumb, BreadcrumbItem } from '../../../rxlib/componentes/breadcrumb';

function UsuarioExclusao(props: ExclusaoProps) {
    const [excluido, setExcluido] = useState<boolean>(false);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [showPrimary, setShowPrimary] = useState<boolean>(false);
    const [messageWarning, setMessageWarning] = useState<string>('');
    const [messagePrimary, setMessagePrimary] = useState<string>('');

    const { handleSubmit } = useForm<FormExclusao>();

    const handleHideWarning = () => setShowWarning(false);

    const handleHidePrimary = () => {
        setShowPrimary(false);
        setExcluido(true);
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { texto: 'Home', link: '/home' },
        { texto: 'Usuários', link: '/usuario' },
        { texto: 'Exclusão', link: '' },
    ]

    const onSubmit: SubmitHandler<FormExclusao> = data => {
        setCarregando(true);
        api.delete(`/Usuario/${props.match.params.id}`, data)
            .then(response => {
                setMessagePrimary('Usuário excluído com sucesso.');
                setShowPrimary(true);
            }).catch((error: AxiosError<ApiError>) => {
                setCarregando(false);
                if (error.response) {
                    setMessageWarning(error.response.data.Mensagem);
                } else {
                    setMessageWarning('Não foi possível excluir o usuário: ' + error.message);
                }
                setShowWarning(true);
            });
    }

    return (
        <>
            <RxlibLayout>
                <Breadcrumb
                    itens={breadcrumbs} />
                <Exclusao
                    linkCancelar='/usuario'
                    carregando={carregando}
                    onSubmit={handleSubmit(onSubmit)}
                    titulo='Deseja realmente excluir o usuário selecionado?' />
                <ModalWarning
                    showWarning={showWarning}
                    onHide={handleHideWarning}
                    messageWarning={messageWarning} />
                <ModalPrimary
                    showPrimary={showPrimary}
                    onHide={handleHidePrimary}
                    messagePrimary={messagePrimary} />
                <Redirecionar
                    se={excluido}
                    para='/usuario' />
            </RxlibLayout>
        </>
    )
}

export default UsuarioExclusao;