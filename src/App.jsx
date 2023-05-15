// Router
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

// Global Styles
import { GlobalStyles } from './styles/globalStyles';

// Providers
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
