export function obterVersao(): string {
    return 'v1.0.4';
}

export function obterNomeEmpresa(): string {
    return 'Developed by Gleryston Matos';
}

export function formatarPorTipoPersonalizado(type: string, value: string): string {
    if (type) {
        switch (type) {
            default:
                return value;
        }
    } else {
        return value;
    }
}