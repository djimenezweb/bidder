// Icons
import {
	ClockCountdown,
	CurrencyEur,
	Gavel,
	Heart,
	Money,
	PlusCircle,
	PlusSquare,
	Power,
	SignIn,
	SignOut,
	User,
	UserCircle,
	X
} from '@phosphor-icons/react';

const testIcons = () => {
	return (
		<>
			<Heart color='#AE2983' weight='thin' size={32} />
			<Heart color='#AE2983' weight='light' size={32} />
			<Heart color='#AE2983' weight='regular' size={32} />
			<Heart color='#AE2983' weight='bold' size={32} />
			<Heart color='#AE2983' weight='fill' size={32} />
			<Heart color='#AE2983' weight='duotone' size={32} />

			<Gavel size={32} weight='thin' />
			<Gavel size={32} weight='light' />
			<Gavel size={32} weight='regular' />
			<Gavel size={32} weight='bold' />
			<Gavel size={32} weight='fill' />
			<Gavel size={32} weight='duotone' />

			<User size={32} />
			<UserCircle size={32} />
			<SignIn size={32} />
			<SignOut size={32} />
			<Power size={32} />
			<X size={32} />
			<Money size={32} />
			<CurrencyEur size={32} />
			<ClockCountdown size={32} />
			<PlusCircle size={32} />
			<PlusSquare size={32} />
		</>
	);
};

export default testIcons;
