/* rxlib - Spinner v1.1.1 */

interface SpinnerProps {
    className?: string;
    classStyle?: string;
}

export function Spinner(props: SpinnerProps) {
    let divClass = 'text-center';
    if ((props.className) && (props.className !== '')) {
        divClass = props.className + ' ' + divClass;
    }

    let divSpinnerClass = 'spinner-border text-warning rxlib-spinner-default';
    if ((props.classStyle) && (props.classStyle !== '')) {
        divSpinnerClass = props.classStyle + ' ' + divSpinnerClass;
    }

    return (
        <div className={divClass}>
            <div className={divSpinnerClass} role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
    )
}