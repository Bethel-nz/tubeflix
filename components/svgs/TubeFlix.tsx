import { motion, Variants } from 'framer-motion';
import { FC, SVGProps } from 'react';

const containerVariants: Variants = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.1, // Delay between animating children
		},
	},
};

const pathVariants: Variants = {
	initial: {
		opacity: 0,
		x: 920,
		pathLength: 0,
	},
	animate: {
		opacity: 1,
		x: 0,
		pathLength: 1,
		transition: {
			duration: 0.5, // Animation duration for each path
		},
	},
};

export const TubeFlix: FC<SVGProps<SVGElement>> = () => {
	return (
		<div className='md:w-[70rem] grid place-items-center px-24 h-[20rem]'>
			<motion.svg
				variants={containerVariants}
				initial='initial'
				animate='animate'
				viewBox={'0 0 653 97'}
				className={`w-full`}
			>
				<motion.path
					d='M58.3644 6.58987V25.9992H40.1005V93.7679H18.2656V25.9992H0V6.58987H18.2656V6.42603H40.1005V6.58987H58.3644Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
				<motion.path
					d='M145.587 34.524V72.8149C145.587 94.8253 122.962 96.0338 114.827 96.0338C106.693 96.0338 84.0682 94.8253 84.0682 72.8149V34.524H104.69V69.2237C104.69 72.2592 105.853 78.9213 114.827 78.9213C123.803 78.9213 124.965 72.2592 124.965 69.2237V34.524H145.587Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
				<motion.path
					d='M250.863 64.413C250.863 81.9021 238.074 96.0796 222.3 96.0796C215.358 96.0796 208.998 93.3324 204.047 88.7683V93.9096H183.426V0.503998H204.047V40.0576C208.998 35.4935 215.358 32.7463 222.3 32.7463C238.074 32.7463 250.862 46.9239 250.863 64.413ZM229.681 64.413C229.681 56.8864 223.83 50.7836 216.612 50.7836C209.394 50.7836 204.047 56.8864 204.047 64.413C204.047 71.9409 209.394 78.0436 216.612 78.0436C223.829 78.0436 229.681 71.9396 229.681 64.413Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
				<motion.path
					d='M328.184 72.3287H347.897C347.897 93.0839 325.868 96.068 316.757 96.068C307.647 96.068 284.429 90.3785 284.429 64.5287C284.429 38.6788 304.481 32.382 316.539 32.382C335.171 32.382 343.894 41.9904 346.793 55.6246C347.606 59.41 347.97 63.4977 347.97 67.767H305.04C305.04 77.4838 310.122 81.2932 317.437 81.2932C324.75 81.2932 328.184 77.1813 328.184 72.3287ZM305.535 55.6246H328.644L328.51 55.5403C328.51 51.1727 325.212 45.908 317.096 45.908C308.994 45.908 305.536 51.707 305.535 55.6246Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
				<motion.path
					d='M433.998 25.9992H407.158V93.7679H385.322V6.42603H407.158V6.58987H433.998V25.9992Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
				<motion.path
					d='M412.445 50.1707C412.445 43.6571 417.562 38.3772 423.873 38.3772C430.184 38.3772 435.3 43.6571 435.3 50.1707C435.3 56.6843 430.184 61.9639 423.873 61.9639C417.562 61.9639 412.445 56.6843 412.445 50.1707Z'
					fill='#EAB643'
					variants={pathVariants}
				/>
				<motion.path
					d='M470.863 93.9096V0.503998H491.485V93.9096H470.863Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
				<motion.path
					d='M528.956 11.7933C528.956 5.28098 534.072 0 540.382 0C546.694 0 551.81 5.28098 551.81 11.7933C551.81 18.3069 546.694 23.5878 540.382 23.5878C534.072 23.5878 528.956 18.3068 528.956 11.7933Z'
					fill='#EAB643'
					variants={pathVariants}
				/>
				<motion.path
					d='M530.014 93.8818V34.5698H550.637V93.8818H530.014Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
				<motion.path
					d='M655.835 93.8373H634.001L620.6 77.0779L607.199 93.8373H584.15L609.076 62.6648L586.576 34.524H608.411L619.993 49.0089L631.575 34.524H654.622L631.517 63.4221L655.835 93.8373Z'
					fill='#F0F0F0'
					variants={pathVariants}
				/>
			</motion.svg>
		</div>
	);
};
