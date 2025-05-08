import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';
import { StatusBar } from 'expo-status-bar';


export default function App() {

  return (
    <>
    {/* <StatusBar /> */}
    <Provider store={store}>
      <Routes />
    </Provider>

    </>
  );
}
