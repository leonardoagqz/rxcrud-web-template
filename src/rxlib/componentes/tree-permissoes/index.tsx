/* rxlib - TreePermissoes v1.1.0 */

import React from 'react';
import Tree from 'react-animated-tree';
import { Checkbox } from 'rxlib-react';
import { Permissoes, PerfilPermissao, PerfilUsuario } from '../../../services/tipos';

interface TreePermissoesProps {
    naoPodeEditar: boolean;
    permissoes: Permissoes[];
    idPerfilSelecionao: string;
    perfilsUsuario: PerfilUsuario[];
    perfilPermissao: PerfilPermissao[];
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export function TreePermissoes(props: TreePermissoesProps) {
    let gruposListados: string[] = [];

    return (
        <div>
            {
                props.permissoes.map((grupos) =>
                    !gruposListados.includes(grupos.grupo)
                        ? <Tree
                            content={grupos.grupo}
                            key={gruposListados.indexOf(grupos.grupo)}>
                            <div className='d-none'>
                                {gruposListados.push(grupos.grupo)}
                            </div>
                            {
                                props.permissoes
                                    .filter((permissao) => permissao.grupo === grupos.grupo)
                                    .map((permissao, index) =>
                                        <div key={permissao.id} className='rxlib-checkbox-permissao'>
                                            <Checkbox
                                                onChange={props.onChange}
                                                value={permissao.id}
                                                text={permissao.nome}
                                                name={'permissoes.' + index}
                                                referencia={React.createRef()}
                                                defaultChecked={!!props.perfilPermissao.find(permissaoPerfil => permissaoPerfil.idPermissao === permissao.id)}
                                                disabled={
                                                    props.perfilsUsuario
                                                        .find(perfilUsuario => perfilUsuario.idPerfil === props.idPerfilSelecionao)
                                                        ? true
                                                        : props.naoPodeEditar
                                                            ? true
                                                            : false
                                                } />
                                        </div>
                                    )
                            }
                        </Tree>
                        : null
                )
            }
        </div>
    )
}