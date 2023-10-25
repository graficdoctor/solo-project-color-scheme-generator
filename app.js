const colorBars = document.querySelectorAll('.color-bar');
const colorCodes = document.querySelectorAll('.color-code');
const colorScheme = document.getElementById('color-scheme');
const colorSeed = document.getElementById('seed-color');
const buttonEl = document.querySelector('.btn');

const getColorScheme = () => {
	const colorSeedHex = colorSeed.value.replace('#', '');
	const colorApi = `https://www.thecolorapi.com/scheme?hex=${colorSeedHex}&mode=${colorScheme.value}`;

	fetch(colorApi)
		.then((response) => response.json())
		.then((data) => {
			colorBars.forEach((colorBar, index) => {
				const color = data.colors[index];
				const colorCode = colorCodes[index];
				if (color && colorCode) {
					colorBar.style.backgroundColor = color.hex.value;
					colorCode.innerHTML = `${color.hex.value}`;
				}
				colorBar.addEventListener('click', () => {
					navigator.clipboard.writeText(color.hex.value);
					alert(`copied ${color.hex.value}`);
				});
			});
		});
};

buttonEl.addEventListener('click', getColorScheme);
