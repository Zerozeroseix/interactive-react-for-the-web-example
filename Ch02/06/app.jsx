(() => {
	function SizeSelector(props) {
		function sizeOptions() {
			const sizes = window.Inventory.allSizes;

			return sizes.map((num) => (
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

	function ProductImage(props) {
		return (
			<img
				src={`../../../assets/${props.color}.jpg`}
				alt={`A ${props.color} sneaker`}
			/>
		);
	}

	function ProductCustomizer(props) {
		return (
			<div className="customizer">
				<div className="product-image">
					<ProductImage color="red" />
				</div>
				<div className="selectors">
					<SizeSelector size={8} />
				</div>
			</div>
		);
	}

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(<ProductCustomizer />);
})();
