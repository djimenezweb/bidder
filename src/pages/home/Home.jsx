import { Cube, Gavel, Heart, Horse } from '@phosphor-icons/react';

const Home = () => {
	return (
		<>
			<h2>Home</h2>
			<p>
				Phosphor is a flexible icon family for interfaces, diagrams,
				presentations — whatever, really
			</p>
			<Horse />
			<Heart color='#AE2983' weight='fill' size={32} />
			<Cube color='teal' weight='duotone' />
			<Gavel size={32} />
		</>
	);
};

export default Home;
