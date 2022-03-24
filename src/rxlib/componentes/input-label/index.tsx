/* rxlib - InputLabel v1.1.5 */

import React, { useEffect, useState } from 'react';

import {
    maskCpf,
    maskCep,
    maskCnpj,
    maskInteiro,
    maskCurrency,
    maskTelefone,
} from './mask';

interface InputLabelProps {
    id: string;
    name: string;
    label: string;
    limpar?: boolean;
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

    let inputLimpar = false;
    if (props.limpar !== undefined) {
        inputLimpar = props.limpar;
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

    function configurarInput(): React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
        const tamanhoMinimo: number = 0;
        const incrementoQuandoInputTipoNumber: number = 1;

        let inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
            id: props.id,
            name: props.name,
            type: props.type,
            min: tamanhoMinimo,
            accept: props.accept,
            ref: props.referencia,
            className: inputClass,
            maxLength: props.maxLength,
            placeholder: props.placeholder,
            autoFocus: (props.foco === 'sim'),
            required: (inputRequired === 'sim'),
            readOnly: (props.action === 'view'),
            step: incrementoQuandoInputTipoNumber,
            defaultValue: (inputLimpar ? '' : valorPadrao),
            onChange: (props.action === 'view' ? props.onChange : (event: React.ChangeEvent<HTMLInputElement>) => verificarEvento(event)),
        };

        if (inputLimpar) {
            inputProps.value = '';
        }

        if (props.type === 'date') {
            inputProps.max = '9999-12-31';
        }

        return inputProps;
    }

    return (
        <>
            {
                (props.label !== '')
                    ? <label htmlFor={props.id} className='form-label'>{props.label}</label>
                    : ''
            }

            <input {...configurarInput()} />
        </>
    )
}