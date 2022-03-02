/* rxlib - Utilitarios v1.1.3 */

import crypto from 'crypto-js';
import api from '../../services/api';
import { SecretKey } from '../../services/config';
import { formatarPorTipoPersonalizado } from '../../services/utilitarios';
import { maskCep, maskCnpj, maskCpf } from '../componentes/input-label/mask';

export function obterAmbiente(): string {
    let ambiente = '';
    let baseURL = api.defaults.baseURL;

    if (baseURL) {
        if (baseURL.indexOf('localhost') > -1) {
            ambiente = ' HOMOLOGAÇÃO';
        }
    }

    return ambiente;
}

export function obterDataAtual(): string {
    const dataAtual = new Date();
    return (dataAtual.getFullYear() + '-' + ('00' + (dataAtual.getMonth() + 1)).slice(-2) + '-' + ('00' + dataAtual.getDate()).slice(-2));
}

export function obterDataHoraAtualFormatada(): string {
    const dataAtual = new Date();
    return (('00' + dataAtual.getDate()).slice(-2)) + '/' + ('00' + (dataAtual.getMonth() + 1)).slice(-2) + '/' + dataAtual.getFullYear() + ' ' +
        (('00' + dataAtual.getHours()).slice(-2)) + ':' + (('00' + dataAtual.getMinutes()).slice(-2)) + ':' + (('00' + dataAtual.getSeconds()).slice(-2));
}

export function formatarPorTipo(type: string, value: string): string {
    if (type) {
        switch (type) {
            case 'boolean':
                return formatarBoolean(value);
            case 'date':
                return formatarData(value);
            case 'status':
                return formatarStatus(value);
            case 'currency':
                return formatarCurrency(value);
            default:
                return formatarPorTipoPersonalizado(type, value);
        }
    } else {
        return value;
    }
}

function formatarBoolean(value: string): string {
    switch (value) {
        case 'true':
            return 'Sim';
        case 'false':
            return 'Não';
        default:
            return '';
    }
}

export function formatarData(data: string): string {
    if (data) {
        const arrayData = data.substring(0, 10).split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    } else {
        return '';
    }
}

export function formatarDataHora(data: string): string {
    if (data) {
        const arrayData = data.substring(0, 10).split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0] + ' ' + data.substring(11, 19);
    } else {
        return '';
    }
}

export function obterDataAtualJson(data: Date): string {
    return (data.getFullYear() + '-' +
        ('00' + (data.getMonth() + 1)).slice(-2) + '-' +
        ('00' + data.getDate()).slice(-2) + 'T' +
        ('00' + data.getHours()).slice(-2) + ':' +
        ('00' + data.getMinutes()).slice(-2) + ':' +
        ('00' + data.getSeconds()).slice(-2) + 'Z');
}

function formatarStatus(value: string): string {
    switch (parseInt(value)) {
        case 1:
            return 'Ativo';
        case 0:
            return 'Inativo';
        default:
            return '';
    }
}

function formatarCurrency(value: string): string {
    if (value === null)
        return '0,00';
    const casasDecimais = 2
    const separadorDecimal = ','
    const separadorMilhar = '.'
    const valorFloat = parseFloat(value).toFixed(casasDecimais)
    const [currency, decimal] = valorFloat.split('.')
    return `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, separadorMilhar)}${separadorDecimal}${decimal}`;
}

export function formatarDataParaComponente(data: string): string {
    const arrayData = data.substring(0, 10).split('-');
    return arrayData[0] + '-' + arrayData[1] + '-' + arrayData[2];
}

export function obterQuantidadeParaPular(pagina: number, quantidadeRegistrosPorPagina: number): number {
    return pagina
        ? ((pagina * quantidadeRegistrosPorPagina) - quantidadeRegistrosPorPagina)
        : 0;
}

export function obterIdButton(e: React.FormEvent<HTMLButtonElement>): string {
    if ((e) && (e.currentTarget) && (e.currentTarget.id)) {
        return e.currentTarget.id;
    }
    else {
        return '';
    }
}

export function criptografar(texto: string): string {
    var key = crypto.enc.Utf8.parse(SecretKey);
    var iv = crypto.enc.Utf8.parse(SecretKey);

    var cipherOption = {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
    }

    var encrypted = crypto.AES.encrypt(crypto.enc.Utf8.parse(texto), key, cipherOption);
    return encrypted.toString(crypto.format.OpenSSL);
}

export function descriptografar(texto: string): string {
    var key = crypto.enc.Utf8.parse(SecretKey);
    var iv = crypto.enc.Utf8.parse(SecretKey);

    var cipherOption = {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
    }

    var decrypted = crypto.AES.decrypt(texto, key, cipherOption);
    return decrypted.toString(crypto.enc.Utf8);
}

export function formatarCpfCnpj(cpfCnpj: string): string {
    if (cpfCnpj.length <= 11) {
        return maskCpf(cpfCnpj);
    } else {
        return maskCnpj(cpfCnpj);
    }
}

export function formatarCep(cep: string): string {
    return maskCep(cep);
}