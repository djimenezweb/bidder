import { Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';

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
import MyItems from '../pages/my-items/MyItems';
import EditItem from '../pages/edit-item/EditItem';
import MyAuctions from '../pages/my-auctions/MyAuctions';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='/itm/:itemId' element={<Item />} />
				<Route path='/itm/:itemId/edit' element={<EditItem />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/login' element={<Navigate to='/signin' />} />
				<Route path='/signup' element={<SignUp />} />
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
				<Route path='/myitems' element={<MyItems />} />
				<Route path='/myauctions' element={<MyAuctions />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default Router;
