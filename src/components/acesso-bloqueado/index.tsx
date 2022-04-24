/* rxcrud - AcessoBloqueado v1.0.0 */

import { Redirect } from 'react-router-dom';

interface AcessoBloqueadoProps {
    permissao: boolean;
}

export default function AcessoBloqueado({ permissao }: AcessoBloqueadoProps) {
    return (
        (!permissao)
            ? <Redirect to='/home/acessobloqueado' />
            : null
    );
}