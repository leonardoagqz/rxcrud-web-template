/* rxlib - NavbarLayout v1.1.1 */

import { useState } from 'react';
import { Menu } from '../rxlib-Layout';
import logo from '../../../../images/logo.png';
import { obterAmbiente } from '../../../services/utilitarios';
import { obterNomeUsuario } from '../../../services/seguranca';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { obterNomeEmpresa, obterVersao } from '../../../../services/utilitarios';

interface NavbarLayoutProps {
    menu: Menu;
    nomeEmpresa: string;
    children: React.ReactNode;
    exibirNomeEmpresa: boolean;
}

export function NavbarLayout(props: NavbarLayoutProps) {
    const [token] = useState<string>(useAppSelector(state => state.token));

    const dispatch = useAppDispatch();

    return (
        <>
            <nav className='navbar navbar-expand-lg fixed-top navbar-dark rxlib-navbar-top' >
                <div className='container-fluid'>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <a className='navbar-brand rxlib-navbar-brand' href='/home'>
                        <img src={logo} alt='rxcrud' className='rxlib-logo-navbar' />
                        {
                            (props.exibirNomeEmpresa && props.nomeEmpresa)
                                ? <span className='rxlib-nome-navbar'>
                                    {props.nomeEmpresa}
                                </span>
                                : ''
                        }
                    </a>
                    <div className='collapse navbar-collapse rxlib-navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav'>
                            {
                                props.menu.items.map((item, index) =>
                                    <li className='nav-item dropdown' key={index}>
                                        <button className='btn btn-link nav-link dropdown-toggle' id={`navbarDropdown${index}`} data-bs-toggle='dropdown' aria-expanded='false'>
                                            {item.nome}
                                        </button>
                                        <ul className='dropdown-menu' aria-labelledby={`navbarDropdown${index}`}>
                                            {
                                                item.subItens.map((subitem, index) =>
                                                    <li key={index}><a className='dropdown-item' href={subitem.link}>{subitem.nome}</a></li>
                                                )
                                            }
                                        </ul>
                                    </li>
                                )
                            }
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

            <nav className='navbar fixed-bottom rxlib-navbar-footer'>
                <span className='text-center rxlib-developer-by'>© 2020-2022 - {obterNomeEmpresa()} - {obterVersao()}
                    <span className='rxlib-homologacao'>{obterAmbiente()}</span>
                </span>
            </nav>
        </>
    )
}