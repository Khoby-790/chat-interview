import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Auth0Provider } from '@auth0/auth0-react';

import reportWebVitals from './reportWebVitals';
import './index.css';
import Root from './Root';
import SocketProvider from './context/SocketContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain="dev-x6vtc4fw.us.auth0.com"
    clientId="KmDOlDq1yJyatACBgci252Gqx4AXzpb3"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      {/* <ApolloProvider client={client}> */}
      <SocketProvider>
        <Root />
      </SocketProvider>
      {/* </ApolloProvider> */}
    </Provider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
