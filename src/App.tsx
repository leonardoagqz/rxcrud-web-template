import Home from './view/home';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './view/login';
import PageNotFound from './view/page-not-found';

import UsuarioListagem from './view/usuario/listagem';
import UsuarioCadastro from './view/usuario/cadastro';
import UsuarioExclusao from './view/usuario/exclusao';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route path='/login/:acao' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route path='/home/:acao' component={Home} />

            <Route exact path='/usuario' component={UsuarioListagem} />
            <Route path='/usuario/pagina/:pagina' component={UsuarioListagem} />
            <Route exact path='/usuario/novo' component={UsuarioCadastro} />
            <Route path='/usuario/editar/:id' component={UsuarioCadastro} />
            <Route path='/usuario/visualizar/:id/:action' component={UsuarioCadastro} />
            <Route path='/usuario/exclusao/:id' component={UsuarioExclusao} />

            <Route path='*' component={PageNotFound} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;