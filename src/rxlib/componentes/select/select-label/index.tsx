/* rxlib - SelectLabel v1.1.3 */

interface SelectLabelProps {
    id: string;
    name: string;
    label: string;
    ariaLabel: string;
    className?: string;
    action: '' | 'view';
    foco: 'sim' | 'nao';
    required?: 'sim' | 'nao';
    valorSelecionado: string;
    campoExibicaoRegistro: string;
    campoIdentificadorRegistro: string;
    itens: [{ [key: string]: string; }];
    referencia: React.LegacyRef<HTMLSelectElement>;
    onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export function SelectLabel(props: SelectLabelProps) {
    let selectClass = 'form-select rxlib-select-label';
    if ((props.className) && (props.className !== '')) {
        selectClass = props.className + ' ' + selectClass;
    }

    let selectRequired = 'sim';
    if (props.required !== undefined) {
        selectRequired = props.required;
    }

    function MontarItens() {
        return (
            props.itens.map((item, index) =>
                (props.valorSelecionado !== '')
                    ? props.valorSelecionado === item[props.campoIdentificadorRegistro]
                        ? <option key={index} value={item[props.campoIdentificadorRegistro]} selected>{item[props.campoExibicaoRegistro]}</option>
                        : <option key={index} value={item[props.campoIdentificadorRegistro]}>{item[props.campoExibicaoRegistro]}</option>
                    : <option key={index} value={item[props.campoIdentificadorRegistro]}>{item[props.campoExibicaoRegistro]}</option>
            )
        )
    }

    return (
        <>
            <label htmlFor={props.id} className='form-label'>{props.label}</label>
            {
                (props.action === 'view')
                    ? (props.foco === 'sim')
                        ? (selectRequired === 'sim')
                            ? <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange} disabled autoFocus required>
                                {MontarItens()}
                            </select>
                            : <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange} disabled autoFocus>
                                {MontarItens()}
                            </select>
                        : (selectRequired === 'sim')
                            ? <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange} disabled required>
                                {MontarItens()}
                            </select>
                            : <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange} disabled>
                                {MontarItens()}
                            </select>
                    : (props.foco === 'sim')
                        ? (selectRequired === 'sim')
                            ? <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange} autoFocus required>
                                {MontarItens()}
                            </select>
                            : <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange} autoFocus>
                                {MontarItens()}
                            </select>
                        : (selectRequired === 'sim')
                            ? <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange} required>
                                {MontarItens()}
                            </select>
                            : <select ref={props.referencia} name={props.name} id={props.id} className={selectClass} aria-label={props.ariaLabel} onChange={props.onChange}>
                                {MontarItens()}
                            </select>
            }
            {
                (props.action === 'view')
                    ? (selectRequired === 'sim')
                        ? <select ref={props.referencia} name={props.name} id={props.id} className={selectClass + ' d-none'} aria-label={props.ariaLabel} onChange={props.onChange} required autoFocus>
                            {MontarItens()}
                        </select>
                        : <select ref={props.referencia} name={props.name} id={props.id} className={selectClass + ' d-none'} aria-label={props.ariaLabel} onChange={props.onChange} autoFocus>
                            {MontarItens()}
                        </select>
                    : ''
            }
        </>
    )
}