/* rxlib - SidebarLayout v1.1.1 */

import { Menu } from '../rxlib-Layout';
import logo from '../../../../images/logo.png';

interface SidebarContentProps {
    menu: Menu;
    nomeEmpresa: string;
    usarSidebarBodyGradient: boolean;
}

export function SidebarContent(props: SidebarContentProps) {
    let sidebarClasName = '';
    props.usarSidebarBodyGradient
        ? sidebarClasName = 'rxlib-sidebar rxlib-sidebar-body-gradient'
        : sidebarClasName = 'rxlib-sidebar rxlib-sidebar-body';

    return (
        <div className={sidebarClasName}>
            <div className='rxlib-sidebar-header'>
                <a href='/home'>
                    <img src={logo} alt='rxcrud' className='rxlib-sidebar-logo' />
                </a>
                <span>{props.nomeEmpresa}</span>
            </div>
            <div className=''>
                <div className='accordion' id='sidebarAccordion'>
                    {
                        props.menu.items.map((item, index) =>
                            <div className='accordion-item' key={index}>
                                <h2 className='accordion-header' id={`heading${index}`}>
                                    <button className='accordion-button rxlib-sidebar-accordion-button collapsed' type='button' data-bs-toggle='collapse'
                                        data-bs-target={`#collapse${item.nome}`} aria-expanded='false' aria-controls={`collapse${item.nome}`}>
                                        {item.nome}
                                    </button>
                                </h2>
                                <div id={`collapse${item.nome}`} className='accordion-collapse collapse' aria-labelledby={`heading${index}`} data-bs-parent='#sidebarAccordion'>
                                    <div className='accordion-body rxlib-sidebar-accordion-body'>
                                        <ul className='list-group'>
                                            {
                                                item.subItens.map((subitem, index) =>
                                                    <li key={index} className='list-group-item'><a className='dropdown-item' href={subitem.link}>{subitem.nome}</a></li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};