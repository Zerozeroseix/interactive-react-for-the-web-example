(() => {
	function SizeSelector(props) {
		function sizeOptions() {
			return props.sizes.map((num) => (
				<option value={num} key={num}>
					{num}
				</option>
			));
		}

		function onSizeChange(evt) {
			props.handleSizeChange(evt.target.value);
		}

		return (
			<div className="field-group">
				<label htmlFor="size-options">Size:</label>
				<select
					defaultValue={props.size}
					name="sizeOptions"
					id="size-options"
					onChange={onSizeChange}
				>
					{sizeOptions()}
				</select>
			</div>
		);
	}

	function ColorSelector(props) {
		function colorOptions() {
			return props.colors.map((name) => (
				<option value={name} key={name}>
					{name}
				</option>
			));
		}

		function onColorChange(evt) {
			props.handleColorChange(evt.target.value);
		}

		return (
			<div className="field-group">
				<label htmlFor="color-options">Color:</label>
				<select
					defaultValue={props.color}
					name="colorOptions"
					id="color-options"
					onChange={onColorChange}
				>
					{colorOptions()}
				</select>
			</div>
		);
	}

	function ProductImage(props) {
		return (
			<img
				src={`../../../assets/${props.color}.jpg`}
				alt={`A ${props.color} sneaker`}
			/>
		);
	}

	function ProductCustomizer(props) {
		const [size, setSize] = React.useState(8);
		const [sizes, setSizes] = React.useState(window.Inventory.allSizes);

		function handleSizeChange(selectedSize) {
			const availableColors = window.Inventory.bySize[selectedSize];

			setColors(availableColors);

			if (availableColors.indexOf(color) === -1) {
				setColor(availableColors[0]);
			}
		}

		function handleColorChange(selectedColor) {
			const availableSizes = window.Inventory.byColor[selectedColor];

			setSizes(availableSizes);
			setColor(selectedColor);

			if (availableSizes.indexOf(size) === -1) {
				setSize(availableSizes[0]);
			}
		}

		const [color, setColor] = React.useState("red");
		const [colors, setColors] = React.useState(window.Inventory.allColors);

		return (
			<div className="customizer">
				<div className="product-image">
					<ProductImage color={color} />
				</div>
				<div className="selectors">
					<SizeSelector
						size={size}
						sizes={sizes}
						handleSizeChange={handleSizeChange}
					/>
					<ColorSelector
						color={color}
						colors={colors}
						handleColorChange={handleColorChange}
					/>
				</div>
			</div>
		);
	}

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(<ProductCustomizer />);
})();
