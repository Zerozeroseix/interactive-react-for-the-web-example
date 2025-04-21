(() => {
	function SizeSelector(props) {
		function sizeOptions() {
			return props.sizes.map((num) => (
				<option value={num} key={num}>
					{num}
				</option>
			));
		}

		return (
			<div className="field-group">
				<label htmlFor="size-options">Size:</label>
				<select defaultValue={props.size} name="sizeOptions" id="size-options">
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

		return (
			<div className="field-group">
				<label htmlFor="color-options">Color:</label>
				<select
					defaultValue={props.color}
					name="colorOptions"
					id="color-options"
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

	function ProductCustomizer() {
		const [size, setSize] = React.useState(8);
		// This might not need to be in state
		const [sizes, setSizes] = React.useState(window.Inventory.allSizes);

		const [color, setColor] = React.useState("red");
		// This might not either
		const [colors, setColors] = React.useState(window.Inventory.allColors);

		return (
			<div className="customizer">
				<div className="product-image">
					<ProductImage color={color} />
				</div>
				<div className="selectors">
					<SizeSelector size={size} sizes={sizes} />
					<ColorSelector color={color} colors={colors} />
				</div>
			</div>
		);
	}

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(<ProductCustomizer />);
})();
