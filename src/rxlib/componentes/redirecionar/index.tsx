/* rxlib - Redirecionar v1.1.0 */

import { Redirect } from 'react-router-dom';

interface RedirecionarProps {
    se: boolean;
    para: string;
}

export function Redirecionar(props: RedirecionarProps) {

    return (
        <>
            {
                props.se
                    ? <Redirect to={props.para} />
                    : null
            }
        </>
    )
}