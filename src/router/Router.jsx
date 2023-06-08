import { Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';

// Layouts
import RootLayout from '../layouts/RootLayout';

// Pages
import Home from '../pages/home/Home';
import SignIn from '../pages/sign-in/SignIn';
import SignUp from '../pages/sign-up/SignUp';
import Profile from '../pages/profile/Profile';
import AddItem from '../pages/add-item/AddItem';
import Item from '../pages/item/Item';
import EditItem from '../pages/edit-item/EditItem';
import Error from '../pages/error/Error';
import SellerItems from '../pages/seller-items/SellerItems';
import RedirectLoggedUser from './RedirectLoggedUser';
import { MESSAGES } from '../constants/messages';
import ResetPassword from '../pages/reset-password/ResetPassword';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='/itm/:itemId' element={<Item />} />
				<Route path='/itm/:itemId/edit' element={<EditItem />} />
				<Route path='/usr/:userEmail' element={<SellerItems />} />
				<Route
					path='/profile'
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route
					path='/additem'
					element={
						<RequireAuth>
							<AddItem />
						</RequireAuth>
					}
				/>
				<Route
					path='/signin'
					element={
						<RedirectLoggedUser>
							<SignIn />
						</RedirectLoggedUser>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectLoggedUser>
							<SignUp />
						</RedirectLoggedUser>
					}
				/>
				<Route
					path='/reset'
					element={
						<RedirectLoggedUser>
							<ResetPassword />
						</RedirectLoggedUser>
					}
				/>
				<Route path='/login' element={<Navigate to='/signin' />} />
				<Route
					path='*'
					element={<Error backButton>{MESSAGES.notFound}</Error>}
				/>
			</Route>
		</Routes>
	);
};

export default Router;
