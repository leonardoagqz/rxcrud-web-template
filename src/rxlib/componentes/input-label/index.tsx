/* rxlib - InputLabel v1.1.3 */

import React, { useEffect, useState } from 'react';
import { maskCpf, maskCnpj, maskCep, maskCurrency, maskInteiro, maskTelefone } from './mask';

interface InputLabelProps {
    id: string;
    name: string;
    label: string;
    maxLength: number;
    accept?: 'image/*';
    className?: string;
    action: '' | 'view';
    foco: 'sim' | 'nao';
    placeholder: string;
    defaultValue?: string;
    required?: 'sim' | 'nao';
    setFile?: (file: File) => void;
    referencia: React.LegacyRef<HTMLInputElement>;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    type: 'text' | 'password' | 'date' | 'email' | 'number' | 'file';
    mask?: 'cpf' | 'cnpj' | 'cep' | 'telefone' | 'currency' | 'number';
}

export function InputLabel(props: InputLabelProps) {
    const [valorPadrao, setValorPadrao] = useState('');

    let inputClass = 'form-control rxlib-input-label';
    if ((props.className) && (props.className !== '')) {
        inputClass = props.className + ' ' + inputClass;
    }

    let inputRequired = 'sim';
    if (props.required !== undefined) {
        inputRequired = props.required;
    }

    function verificarEvento(event: React.ChangeEvent<HTMLInputElement>) {
        if (props.mask) {
            const { value } = event.currentTarget
            event.currentTarget.value = getMask(value)
        }

        if ((props.accept) && (props.setFile)) {
            if ((event.target) && (event.target.files) && (event.target.files[0])) {
                props.setFile(event.target.files[0]);
            }
        }

        if (props.onChange) {
            props.onChange(event);
        }
    }

    function getMask(value: string): string {
        switch (props.mask) {
            case 'cpf':
                return maskCpf(value);
            case 'cnpj':
                return maskCnpj(value);
            case 'cep':
                return maskCep(value);
            case 'telefone':
                return maskTelefone(value);
            case 'currency':
                return maskCurrency(value);
            case 'number':
                return maskInteiro(value);
            default:
                return value;
        }
    }

    useEffect(() => {
        function formatarValorDecimal(valor: string) {
            const valorPadraoOriginal = parseFloat(valor);

            let formatador = Intl.NumberFormat("pr-BR", {
                style: "decimal",
                currency: "BRL",
                minimumFractionDigits: 2,
            });

            return formatador.format(valorPadraoOriginal);
        }

        function setStateValorPadrao() {
            if (props.defaultValue) {
                if ((String(props.defaultValue) === '') && (props.mask === 'currency')) {
                    setValorPadrao('0,00');
                } else if ((String(props.defaultValue) !== '') && (props.mask === 'currency')) {
                    setValorPadrao(formatarValorDecimal(props.defaultValue));
                } else if ((String(props.defaultValue) === '') && (props.mask === 'number')) {
                    setValorPadrao('0');
                } else {
                    setValorPadrao(props.defaultValue);
                }
            } else {
                setValorPadrao('');
            }
        }

        setStateValorPadrao();
    }, [props.defaultValue, props.mask]);

    return (
        <>
            {
                (props.label !== '')
                    ? <label htmlFor={props.id} className='form-label'>{props.label}</label>
                    : ''
            }
            {
                (props.action === 'view')
                    ? (props.foco === 'sim')
                        ? (inputRequired === 'sim')
                            ? <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0} required
                                autoFocus readOnly onChange={props.onChange} />
                            : <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0} autoFocus
                                readOnly onChange={props.onChange} />
                        : (inputRequired === 'sim')
                            ? <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0} required
                                readOnly onChange={props.onChange} />
                            : <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0} readOnly
                                onChange={props.onChange} />
                    : (props.foco === 'sim')
                        ? (inputRequired === 'sim')
                            ? <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0} required autoFocus
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => verificarEvento(event)} />
                            : <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0} autoFocus
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => verificarEvento(event)} />
                        : (inputRequired === 'sim')
                            ? <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0} required
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => verificarEvento(event)} />
                            : <input ref={props.referencia} name={props.name} type={props.type} id={props.id} className={inputClass} maxLength={props.maxLength}
                                placeholder={props.placeholder} defaultValue={valorPadrao} accept={props.accept} step={1} min={0}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => verificarEvento(event)} />
            }
        </>
    )
}