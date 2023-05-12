import { Route, Routes } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<RootLayout />}></Route>
		</Routes>
	);
};

export default Router;
