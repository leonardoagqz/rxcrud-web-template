/* rxlib - AcessoBloqueado v1.1.0 */

import { Redirect } from 'react-router-dom';

interface AcessoBloqueadoProps {
    permissao: boolean;
}

export function AcessoBloqueado(props: AcessoBloqueadoProps) {
    return (
        !props.permissao
            ? <Redirect to='/home/acessobloqueado' />
            : null
    )
}