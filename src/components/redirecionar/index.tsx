/* rxcrud - Redirecionar v1.0.0 */

import { Redirect } from 'react-router-dom';

interface RedirecionarProps {
    se: boolean;
    para: string;
}

export default function Redirecionar({ se, para }: RedirecionarProps) {
    return (
        (se)
            ? <Redirect to={para} />
            : null
    );
}