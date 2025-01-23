import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, getActiveIndex] = useState(0);

	const getStepBack = () => getActiveIndex(activeIndex - 1);
	const getStepUp = () => getActiveIndex(activeIndex + 1);
	const getStartOver = () => getActiveIndex(0);

	const isFirstStep = activeIndex === 0 ? true : false;
	const isLastStep = activeIndex === data.length - 1 ? true : false;

	const { content } = steps[activeIndex];
	const stepsItems = steps.map(({ id, title }, index) => {
		const isDone =
			activeIndex >= index
				? styles['steps-item'] + ' ' + styles.done
				: styles['steps-item'];
		const isActive =
			styles['steps-item'] + ' ' + styles.done + ' ' + styles.active;

		const currentIndex = activeIndex === index;
		const setSelectedStep = () => {
			getActiveIndex(index);
		};

		return (
			<li className={currentIndex ? isActive : isDone} key={id}>
				<button
					className={styles['steps-item-button']}
					onClick={setSelectedStep}
				>
					{index + 1}
				</button>
				{title}
			</li>
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{content}</div>
					<ul className={styles['steps-list']}>{stepsItems}</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={getStepBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? getStartOver : getStepUp}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
