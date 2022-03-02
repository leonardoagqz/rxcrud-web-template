/* rxlib - Seguranca v1.1.2 */

import jwt_decode, { JwtPayload } from 'jwt-decode';

interface Jwt extends JwtPayload {
    id: string;
    name: string;
    email: string;
    role: string[];
    licensed: string;
    administrador: string;
}

export function obterIdUsuario(token: string): string {
    if (!token) {
        return '';
    }

    let id = jwt_decode<Jwt>(token).id;
    return id
        ? id
        : '';
}

export function obterNomeUsuario(token: string): string {
    if (!token) {
        return 'Não identificado';
    }

    let usuario = jwt_decode<Jwt>(token).name;
    return usuario
        ? usuario
        : 'Não identificado';
}

export function obterEmailUsuario(token: string): string {
    if (!token) {
        return '';
    }

    let email = jwt_decode<Jwt>(token).email;
    return email
        ? email
        : '';
}

export function obterLicenciada(token: string): string {
    if (!token) {
        return '';
    }

    let licensed = jwt_decode<Jwt>(token).licensed;
    return licensed
        ? licensed
        : '';
}

export function obterAdministrador(token: string): boolean {
    if (!token) {
        return false;
    }

    let licensed: boolean = (jwt_decode<Jwt>(token).administrador.toLowerCase() === 'true');
    return licensed
        ? licensed
        : false;
}

export function usuarioTemPermissao(token: string, permissao: string): boolean {
    if (!token) {
        return false;
    }

    let permissoes = jwt_decode<Jwt>(token).role;
    return permissoes
        ? !!permissoes.find(item => item === permissao)
        : false;
}

export function tokenExpirado(token: string): boolean {
    if (!token) {
        return true;
    }

    let exp = jwt_decode<Jwt>(token).exp;
    if (exp) {
        return ((new Date(exp * 1000)) < (new Date()));
    } else {
        return true;
    }
}