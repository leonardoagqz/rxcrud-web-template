/* rxlib - SelectLabelUf v1.1.2 */

import { SelectLabel } from '../select-label';

interface SelectLabelUfProps {
    id: string;
    name: string;
    label: string;
    ariaLabel: string;
    className?: string;
    action: '' | 'view';
    foco: 'sim' | 'nao';
    required?: 'sim' | 'nao';
    valorSelecionado: string;
    referencia: React.LegacyRef<HTMLSelectElement>;
    onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export function SelectLabelUf(props: SelectLabelUfProps) {

    const ufs: any = [
        { Id: '', Nome: 'Selecione' },
        { Id: 'AC', Nome: 'AC' },
        { Id: 'AL', Nome: 'AL' },
        { Id: 'AP', Nome: 'AP' },
        { Id: 'AM', Nome: 'AM' },
        { Id: 'BA', Nome: 'BA' },
        { Id: 'CE', Nome: 'CE' },
        { Id: 'DF', Nome: 'DF' },
        { Id: 'ES', Nome: 'ES' },
        { Id: 'GO', Nome: 'GO' },
        { Id: 'MA', Nome: 'MA' },
        { Id: 'MT', Nome: 'MT' },
        { Id: 'MS', Nome: 'MS' },
        { Id: 'MG', Nome: 'MG' },
        { Id: 'PA', Nome: 'PA' },
        { Id: 'PB', Nome: 'PB' },
        { Id: 'PR', Nome: 'PR' },
        { Id: 'PE', Nome: 'PE' },
        { Id: 'PI', Nome: 'PI' },
        { Id: 'RJ', Nome: 'RJ' },
        { Id: 'RN', Nome: 'RN' },
        { Id: 'RS', Nome: 'RS' },
        { Id: 'RO', Nome: 'RO' },
        { Id: 'RR', Nome: 'RR' },
        { Id: 'SC', Nome: 'SC' },
        { Id: 'SP', Nome: 'SP' },
        { Id: 'SE', Nome: 'SE' },
        { Id: 'TO', Nome: 'TO' }
    ];

    return (
        <SelectLabel
            itens={ufs}
            id={props.id}
            foco={props.foco}
            name={props.name}
            label={props.label}
            action={props.action}
            required={props.required}
            onChange={props.onChange}
            className={props.className}
            ariaLabel={props.ariaLabel}
            campoExibicaoRegistro='Nome'
            referencia={props.referencia}
            campoIdentificadorRegistro='Id'
            valorSelecionado={props.valorSelecionado} />
    )
}