import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';

// Layouts
import RootLayout from '../layouts/RootLayout';

// Pages
import Home from '../pages/home/Home';
import SignIn from '../pages/sign-in/SignIn';
import SignUp from '../pages/sign-up/SignUp';
import NotFound from '../pages/not-found/NotFound';
import Profile from '../pages/profile/Profile';
import AddItem from '../pages/add-item/AddItem';
import Item from '../pages/item/Item';

const Router = () => {
	const { loggedUser } = useContext(AuthContext);

	return (
		<Routes>
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='/itm/:itemId' element={<Item />} />
				{loggedUser ? (
					<Route path='/signin' element={<Home />} />
				) : (
					<Route path='/signin' element={<SignIn />} />
				)}
				{loggedUser ? (
					<Route path='/signup' element={<Home />} />
				) : (
					<Route path='/signup' element={<SignUp />} />
				)}
				{loggedUser ? (
					<Route path='/profile' element={<Profile />} />
				) : (
					<Route path='/profile' element={<SignIn />} />
				)}
				{loggedUser ? (
					<Route path='/additem' element={<AddItem />} />
				) : (
					<Route path='/additem' element={<SignIn />} />
				)}

				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default Router;
