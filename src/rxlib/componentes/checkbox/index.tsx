/* rxlib - Checkbox v1.1.0 */

interface CheckboxProps {
    text: string;
    name: string;
    value: string;
    checked: boolean;
    action: '' | 'view';
    referencia: React.LegacyRef<HTMLInputElement>;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export function Checkbox(props: CheckboxProps) {
    return (
        <>
            {
                (props.action === 'view')
                    ? props.checked
                        ? <input ref={props.referencia} className='form-check-input me-2' type='checkbox' value={props.value}
                            name={props.name} onChange={props.onChange} aria-label='...' defaultChecked disabled />
                        : <input ref={props.referencia} className='form-check-input me-2' type='checkbox' value={props.value}
                            name={props.name} onChange={props.onChange} aria-label='...' disabled />
                    : props.checked
                        ? <input ref={props.referencia} className='form-check-input me-2' type='checkbox' value={props.value}
                            name={props.name} onChange={props.onChange} aria-label='...' defaultChecked />
                        : <input ref={props.referencia} className='form-check-input me-2' type='checkbox' value={props.value}
                            name={props.name} onChange={props.onChange} aria-label='...' />
            }
            {props.text}
        </>
    )
}