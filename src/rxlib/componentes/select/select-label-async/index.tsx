/* rxlib - SelectLabelAsync v1.1.6 */

import { Spinner } from '../../spinner';
import api from '../../../../services/api';
import AsyncSelect from 'react-select/async';
import React, { useEffect, useState } from 'react';
import { ButtonLink } from '../../buttons/button-link';
import { ModalWarning } from '../../modal/modal-warning';
import { ActionMeta, OptionsType, StylesConfig } from 'react-select';

import {
    requestUrl,
    RequestType,
    SelectLabelAsyncPrimaryColor,
    SelectLabelAsyncDisabledColor,
    SelectLabelAsyncSecondaryColor,
} from '../../../../services/config';

export type RequestUrlType = {
    url: string;
    type: RequestType;
    fieldValue: string;
    fieldLabel: string;
    fieldValueLowerCase: string;
    fieldLabelLowerCase: string;
}

export interface SelectValue {
    value: string;
    label: string;
    isDisabled: boolean;
}

export type FiltroPesonalizado = {
    nameField: string;
    valueField: string;
    valueDefault: string;
    tipo: 'guid' | 'string';
}

interface SelectLabelAsyncProps {
    id: string;
    name: string;
    label: string;
    type: RequestType;
    isMulti?: boolean;
    className?: string;
    linkAtalho?: string;
    action: '' | 'view';
    foco: 'sim' | 'nao';
    dados?: SelectValue[];
    defaultOptions?: boolean;
    required?: 'sim' | 'nao';
    valorSelecionado?: string;
    usarAtalhoParaCadastro?: boolean;
    listaIdParaDesabilitar?: string[];
    filtroPersonalizado?: FiltroPesonalizado[];
    referencia: React.LegacyRef<HTMLInputElement>;
    onChangeValueSelected?: (valor: string) => void;
}

export function SelectLabelAsync(props: SelectLabelAsyncProps) {
    const [carregando, setCarregando] = useState<boolean>(false);
    const [valueSelected, setValueSelected] = useState<string>('');
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [messageWarning, setMessageWarning] = useState<string>('');

    const [defaultValue, setDefaultValue] = useState<SelectValue>({
        label: '',
        value: '',
        isDisabled: false,
    });

    const [defaultValues, setDefaultValues] = useState<SelectValue[]>([{
        label: '',
        value: '',
        isDisabled: false,
    }]);

    const handleHideWarning = () => setShowWarning(false);

    function showMessageWarning(mensagem: string) {
        setMessageWarning(mensagem);
        setShowWarning(true);
    }

    let selectClass = 'rxlib-select-label-async';
    if ((props.className) && (props.className !== '')) {
        selectClass = props.className + ' ' + selectClass;
    }

    let selectRequired = 'sim';
    if (props.required !== undefined) {
        selectRequired = props.required;
    }

    let selectIsMulti = false;
    if (props.isMulti !== undefined) {
        selectIsMulti = props.isMulti;
    }

    let selectDefaultOptions = false;
    if (props.defaultOptions !== undefined) {
        selectDefaultOptions = props.defaultOptions;
    }

    useEffect(() => {
        if (props.onChangeValueSelected) {
            props.onChangeValueSelected(valueSelected);
        }
    }, [props, valueSelected]);

    useEffect(() => {
        function carregarDefaultValue() {
            setDefaultValue({
                label: '',
                value: '',
                isDisabled: false,
            });

            if (props.valorSelecionado) {
                const request = getEndPointRequestItem(props.type, props.valorSelecionado);

                if ((request) && (request.trim() !== '')) {
                    setCarregando(true);
                    api.get(request)
                        .then(response => {
                            const requestType = requestUrl.find(item => item.type === props.type);

                            if (requestType) {
                                setDefaultValue({
                                    label: response.data[requestType.fieldLabelLowerCase],
                                    value: response.data[requestType.fieldValueLowerCase],
                                    isDisabled: false,
                                });
                                setValueSelected(response.data[requestType.fieldValueLowerCase]);
                                setCarregando(false);
                            }
                        }).catch(error => {
                            showMessageWarning('Não foi possível realizar a consulta pelo item selecionado. ' + error.message);
                        });
                }
            }
        }

        function carregarDefaultValues() {
            setDefaultValues([{
                label: '',
                value: '',
                isDisabled: false
            }]);

            if (props.valorSelecionado) {
                let value: string = '';
                let values: SelectValue[] = [{
                    label: '',
                    value: '',
                    isDisabled: false,
                }];

                props.valorSelecionado.split('|').forEach((item, index) => {
                    const request = getEndPointRequestItem(props.type, item);

                    if ((request) && (request.trim() !== '')) {
                        setCarregando(true);
                        api.get(request)
                            .then(response => {
                                const requestType = requestUrl.find(item => item.type === props.type);

                                if (requestType) {
                                    if (index > 0) {
                                        value += '|';
                                    }

                                    value += response.data[requestType.fieldValueLowerCase];

                                    if (index === 0) {
                                        values[0] = {
                                            label: response.data[requestType.fieldLabelLowerCase],
                                            value: response.data[requestType.fieldValueLowerCase],
                                            isDisabled: false,
                                        };
                                    } else {
                                        values.push({
                                            label: response.data[requestType.fieldLabelLowerCase],
                                            value: response.data[requestType.fieldValueLowerCase],
                                            isDisabled: false,
                                        });
                                    }

                                    setValueSelected(value);
                                    setDefaultValues(values);
                                    setCarregando(false);
                                }
                            }).catch(error => {
                                showMessageWarning('Não foi possível realizar a consulta pelo item selecionado. ' + error.message);
                            });
                    }
                });
            }
        }

        if (selectIsMulti) {
            carregarDefaultValues();
        } else {
            carregarDefaultValue();
        }

    }, [props.type, props.valorSelecionado, selectIsMulti]);

    const LoadingIndicator = () => {
        return <Spinner classStyle='rxlib-spinner-select' />
    };

    const onChange = (value: SelectValue | OptionsType<SelectValue> | null, action: ActionMeta<SelectValue>) => {
        if (value) {
            if (selectIsMulti) {
                let selectedValues = '';
                let values = (value as SelectValue[]);

                values.map((item) =>
                    selectedValues += item.value + '|'
                );

                selectedValues = selectedValues.substring(0, selectedValues.length - 1);

                setValueSelected(selectedValues);
            } else {
                setValueSelected((value as SelectValue).value);
            }
        } else {
            setValueSelected('');
        }
    };

    const promiseOptions = (inputValue: string) =>
        new Promise<SelectValue[]>((resolve) => {
            setTimeout(() => {
                resolve(filterOptions(inputValue));
            }, 1000);
        });

    const filterOptions = (inputValue: string) => {
        if (props.type === 'DadosFixos') {
            if (props.dados) {
                if ((inputValue) && (inputValue.trim() !== '')) {
                    return props.dados.filter(item =>
                        item.label.toLowerCase().includes(inputValue.toLowerCase())
                    );
                } else {
                    return props.dados;
                }
            }
        } else {
            if ((inputValue) && (inputValue.trim() !== '')) {
                const request = getEndPointRequest(props.type, inputValue, props.filtroPersonalizado);

                if ((request) && (request.trim() !== '')) {

                    return api.get(request)
                        .then(response => {
                            if (selectIsMulti) {
                                setDefaultValues([{
                                    label: '',
                                    value: '',
                                    isDisabled: false,
                                }]);
                            } else {
                                setDefaultValue({
                                    label: '',
                                    value: '',
                                    isDisabled: false,
                                });
                            }

                            return getItens(response.data.value, props.type, props.listaIdParaDesabilitar);
                        }).catch(error => {
                            showMessageWarning('Não foi possível realizar a consulta. ' + error.message);
                            return [];
                        });
                }
            }
        }

        return [];
    };

    function verificarDefaultValue(): boolean {
        if (selectIsMulti) {
            return (defaultValues[0].label !== '');
        } else {
            return (defaultValue.label !== '')
        }
    }

    return (
        <>
            <div className={selectClass + ' col-btn-link'}>
                <div className='rxlib-select-label-async-group'>
                    <label className='form-label'>{props.label}</label>
                    <div>
                        {
                            !carregando
                                ? (verificarDefaultValue())
                                    ? <AsyncSelect
                                        isClearable
                                        onChange={onChange}
                                        styles={colourStyles}
                                        isMulti={selectIsMulti}
                                        isDisabled={!!props.action}
                                        loadOptions={promiseOptions}
                                        placeholder={'Selecione...'}
                                        classNamePrefix='rxlib-select'
                                        components={{ LoadingIndicator }}
                                        className='form-control rxlib-select'
                                        defaultOptions={selectDefaultOptions}
                                        loadingMessage={() => 'Carregando...'}
                                        autoFocus={props.foco === 'sim' ? true : false}
                                        noOptionsMessage={() => 'Não foram encontrados resultados'}
                                        defaultValue={selectIsMulti ? defaultValues : defaultValue} />
                                    : <AsyncSelect
                                        isClearable
                                        onChange={onChange}
                                        styles={colourStyles}
                                        isMulti={selectIsMulti}
                                        isDisabled={!!props.action}
                                        loadOptions={promiseOptions}
                                        placeholder={'Selecione...'}
                                        classNamePrefix='rxlib-select'
                                        components={{ LoadingIndicator }}
                                        className='form-control rxlib-select'
                                        defaultOptions={selectDefaultOptions}
                                        loadingMessage={() => 'Carregando...'}
                                        autoFocus={props.foco === 'sim' ? true : false}
                                        noOptionsMessage={() => 'Não foram encontrados resultados'} />
                                : ''
                        }
                    </div>
                    <div className='rxlib-select-label-async-input'>
                        {
                            (selectRequired === 'sim')
                                ? <input tabIndex={-1} className='form-control' ref={props.referencia} name={props.name} id={props.id} defaultValue={valueSelected} required />
                                : <input tabIndex={-1} className='form-control' ref={props.referencia} name={props.name} id={props.id} defaultValue={valueSelected} />
                        }
                    </div>
                </div>
                <div>
                    {
                        props.usarAtalhoParaCadastro
                            ? <ButtonLink
                                abrirNovaJanela={true}
                                className='btn-link-select'
                                texto='Atalho para cadastro'
                                classIcone='fas fa-plus fs-3'
                                link={
                                    props.linkAtalho
                                        ? props.linkAtalho
                                        : '/home'
                                } />
                            : ''
                    }
                </div>
            </div>

            <ModalWarning
                showWarning={showWarning}
                onHide={handleHideWarning}
                messageWarning={messageWarning} />
        </>
    )
}

function getEndPointRequest(type: string, value: string, filtroPesonalizado?: FiltroPesonalizado[]): string {
    if ((type) && (value)) {
        const request = requestUrl.find(item => item.type === type);
        let url = request?.url;
        if ((request) && (url)) {
            if (filtroPesonalizado) {
                url = `${url} ${getFiltroPersonalizao(filtroPesonalizado)}`;
            }

            return url.replace('selectedValue', value);
        } else {
            return '';
        }
    } else {
        return '';
    }
}

function getEndPointRequestItem(type: string, value: string): string {
    if ((type) && (value)) {
        const request = `/${type}/selectedValue`;
        return request.replace('selectedValue', value);
    } else {
        return '';
    }
}

function getFiltroPersonalizao(filtroPesonalizado: FiltroPesonalizado[]): string {
    let filtros: string = '';
    for (let contador = 0; contador < filtroPesonalizado.length; contador++) {
        switch (filtroPesonalizado[contador].tipo) {
            case 'string':
                filtros = `${filtros} and ${filtroPesonalizado[contador].nameField} eq '${getvalorFiltroPersonalizao(filtroPesonalizado[contador])}' `;
                break;
            case 'guid':
                filtros = `${filtros} and ${filtroPesonalizado[contador].nameField} eq ${getvalorFiltroPersonalizao(filtroPesonalizado[contador])} `;
                break;
        }
    }
    return filtros;
}

function getvalorFiltroPersonalizao(filtroPesonalizado: FiltroPesonalizado): string {
    return filtroPesonalizado.valueField
        ? filtroPesonalizado.valueField
        : filtroPesonalizado.valueDefault;
}

function getItens(data: [{ [key: string]: string; }], type: RequestType, listaIdParaDesabilitar: string[] | undefined): SelectValue[] {
    let itens: SelectValue[] = [];

    for (let contador = 0; contador < data.length; contador++) {
        const requestType = requestUrl.find(item => item.type === type);

        if (requestType) {
            itens.push({
                value: String(data[contador][requestType.fieldValue]),
                label: data[contador][requestType.fieldLabel],
                isDisabled: (listaIdParaDesabilitar === undefined)
                    ? false
                    : listaIdParaDesabilitar.includes(String(data[contador][requestType.fieldValue]))
            });
        }
    }

    return itens;
}

const colourStyles: StylesConfig<SelectValue, false> = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'white',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor:
                isDisabled
                    ? undefined
                    : isSelected
                        ? isFocused
                            ? SelectLabelAsyncPrimaryColor
                            : undefined
                        : isFocused
                            ? SelectLabelAsyncPrimaryColor
                            : undefined,
            color:
                isDisabled
                    ? SelectLabelAsyncDisabledColor
                    : isSelected
                        ? isFocused
                            ? SelectLabelAsyncSecondaryColor
                            : undefined
                        : isFocused
                            ? SelectLabelAsyncSecondaryColor
                            : undefined,
            cursor:
                isDisabled
                    ? 'not-allowed'
                    : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor:
                    !isDisabled && (isSelected ? data.color : data.color),
            },
        };
    },
    multiValueRemove: (styles) => ({
        ...styles,
        color: 'black',
        ':hover': {
            backgroundColor: SelectLabelAsyncPrimaryColor,
            color: 'white',
        },
    }),
};