/* rxlib - SidebarLayout v1.1.1 */

import { useState } from 'react';
import Sidebar from 'react-sidebar';
import { Menu } from '../rxlib-Layout';
import { SidebarContent } from './content';
import logo from '../../../../images/logo.png';
import { obterAmbiente } from '../../../services/utilitarios';
import { obterNomeUsuario } from '../../../services/seguranca';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { obterNomeEmpresa, obterVersao } from '../../../../services/utilitarios';

interface SidebarLayoutProps {
    menu: Menu;
    nomeEmpresa: string;
    children: React.ReactNode;
    usarSidebarBodyGradient: boolean;
}

export function SidebarLayout(props: SidebarLayoutProps) {
    const [navOpen, setNavOpen] = useState<boolean>(true);
    const [token] = useState<string>(useAppSelector(state => state.token));

    const dispatch = useAppDispatch();

    let navClasName = '';
    navOpen
        ? navClasName = 'navbar navbar-expand-lg fixed-top navbar-dark rxlib-navbar-top rxlib-navbar-sidebar-top-open'
        : navClasName = 'navbar navbar-expand-lg fixed-top navbar-dark rxlib-navbar-top rxlib-navbar-sidebar-top';

    return (
        <Sidebar
            sidebar={
                <SidebarContent
                    menu={props.menu}
                    nomeEmpresa={props.nomeEmpresa}
                    usarSidebarBodyGradient={props.usarSidebarBodyGradient} />
            }
            open={navOpen}
            shadow={false}
            transitions={false}
            onSetOpen={setNavOpen}
            docked={true && navOpen}>

            <nav className={navClasName} >
                <div className='container-fluid'>
                    {
                        !navOpen
                            ? <div className='rxlib-sidebar-header'>
                                <a href='/home'>
                                    <img src={logo} alt={props.nomeEmpresa} className='rxlib-sidebar-logo-navbar' />
                                </a>
                                <span>{props.nomeEmpresa}</span>
                            </div>
                            : ''
                    }
                    <div className='navbar-brand rxlib-navbar-brand'>
                        <span className='navbar-toggler-icon' onClick={() => setNavOpen(!navOpen)} style={{ cursor: 'pointer' }}></span>
                    </div>
                    <div className='collapse navbar-collapse rxlib-navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav'>
                        </ul>
                    </div>
                    <ul className='navbar-nav rxlib-navbar-nav'>
                        <li>
                            <span className='nav-link rxlib-usuario-logado-navbar'>Usuário: {obterNomeUsuario(token)}</span>
                        </li>
                        <li>
                            <a className='nav-link rxlib-sair' href='/' onClick={() => dispatch({ type: 'LOG_OUT' })}>Sair</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {props.children}

            <nav className='navbar fixed-bottom rxlib-navbar-footer rxlib-navbar-sidebar-footer'>
                <span className='text-center rxlib-developer-by'>© 2022 - {obterNomeEmpresa()} - {obterVersao()}
                    <span className='rxlib-homologacao'>{obterAmbiente()}</span>
                </span>
            </nav>
        </Sidebar>
    );
}