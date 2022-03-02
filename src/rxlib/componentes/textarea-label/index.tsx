/* rxlib - TextareaLabel v1.1.1 */

interface TextareaLabelProps {
    id: string;
    name: string;
    rows?: number;
    label: string;
    maxLength: number;
    className?: string;
    foco: 'sim' | 'nao';
    action: '' | 'view';
    placeholder: string;
    defaultValue: string;
    referencia: React.LegacyRef<HTMLTextAreaElement>;
}

export function TextareaLabel(props: TextareaLabelProps) {
    let textareaClass = 'form-control rxlib-textarea-label';
    if ((props.className) && (props.className !== '')) {
        textareaClass = props.className + ' ' + textareaClass;
    }

    return (
        <>
            <label htmlFor={props.id} className='form-label'>{props.label}</label>
            {
                props.action
                    ? props.foco
                        ? <textarea ref={props.referencia} name={props.name} id={props.id} className={textareaClass} maxLength={props.maxLength} minLength={5}
                            placeholder={props.placeholder} defaultValue={props.defaultValue} rows={props.rows} required autoFocus readOnly />
                        : <textarea ref={props.referencia} name={props.name} id={props.id} className={textareaClass} maxLength={props.maxLength} minLength={5}
                            placeholder={props.placeholder} defaultValue={props.defaultValue} rows={props.rows} required readOnly />
                    : props.foco
                        ? <textarea ref={props.referencia} name={props.name} id={props.id} className={textareaClass} maxLength={props.maxLength} minLength={5}
                            placeholder={props.placeholder} defaultValue={props.defaultValue} rows={props.rows} required autoFocus />
                        : <textarea ref={props.referencia} name={props.name} id={props.id} className={textareaClass} maxLength={props.maxLength} minLength={5}
                            placeholder={props.placeholder} defaultValue={props.defaultValue} rows={props.rows} required />
            }
        </>
    )
}