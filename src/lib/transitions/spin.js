import { cubicIn } from 'svelte/easing';

export function spin(node, { delay = 0, duration = 200, direction = 1 }) {
	return {
		delay,
		duration,
		css: (t) => {
			let eased = cubicIn(1 - t);
			return `transform: rotate(${direction * eased * 180}deg)`;
		}
	};
}
