/* rxlib - RxlibLayout v1.1.3 */

import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { NavbarLayout } from '../navbar-layout';
import { SidebarLayout } from '../sidebar-layout';
import { useAppSelector } from '../../../../store/hooks';

import {
    montarMenus,
    NomeEmpresa,
    UsarSidebarLayout,
    UsarSidebarBodyGradient,
    ExibirNomeEmpresaNavbarLayout,
} from '../../../../services/config';

interface Subitem {
    nome: string;
    link: string;
}

export interface Item {
    nome: string;
    subItens: Subitem[];
}

export interface Menu {
    items: Item[];
}

interface RxlibLayoutProps {
    children: React.ReactNode;
}

export function RxlibLayout(props: RxlibLayoutProps) {
    const [token] = useState<string>(useAppSelector(state => state.token));
    const [logado] = useState<boolean>(useAppSelector(state => state.logado));
    const [administrador] = useState<boolean>(useAppSelector(state => state.administrador));

    return (
        <>
            {
                ((!logado) && (!token))
                    ? <Redirect to='/login/acessobloqueado' />
                    : ''
            }
            {
                (useAppSelector(state => state.expirado))
                    ? <Redirect to='/login' />
                    : ''
            }
            {
                UsarSidebarLayout
                    ? <SidebarLayout
                        nomeEmpresa={NomeEmpresa}
                        menu={montarMenus(token, administrador)}
                        usarSidebarBodyGradient={UsarSidebarBodyGradient}>
                        {props.children}
                    </SidebarLayout>
                    : <NavbarLayout
                        nomeEmpresa={NomeEmpresa}
                        menu={montarMenus(token, administrador)}
                        exibirNomeEmpresa={ExibirNomeEmpresaNavbarLayout}>
                        {props.children}
                    </NavbarLayout>
            }
        </>
    )
}