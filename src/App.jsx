import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './styles/globalStyles';
import Router from './router/Router';
import { AuthProvider } from './providers/Auth.provider';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<GlobalStyles />
				<AuthProvider>
					<Router />
				</AuthProvider>
			</BrowserRouter>
		</>
	);
};

export default App;
