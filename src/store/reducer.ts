import { Reducer } from 'redux';

interface State {
    token: string,
    logado: boolean,
    tenantId: string,
    expirado: boolean,
    administrador: boolean,
}

const INITIAL_STATE: State = {
    token: '',
    tenantId: '',
    logado: false,
    expirado: false,
    administrador: false,
};

const reducer: Reducer<State> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, token: action.token, logado: true, expirado: false, administrador: action.administrador, tenantId: action.tenantId, }
        case 'LOG_OUT':
            return { ...state, token: '', logado: false, expirado: false, administrador: false, tenantId: '', }
        case 'LOG_OUT_EXPIRED':
            return { ...state, token: '', logado: false, expirado: true, administrador: false, tenantId: '', }
        default:
            return state;
    }
}

export default reducer;