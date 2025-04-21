(() => {
	function SizeSelector() {
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
				<select name="sizeOptions" id="size-options">
					{sizeOptions()}
				</select>
			</div>
		);
	}

	function ProductImage() {
		return <img src="../../../assets/red.jpg" alt="A red sneaker" />;
	}

	function ProductCustomizer() {
		return (
			<div className="customizer">
				<div className="product-image">
					<ProductImage />
				</div>
				<div className="selectors">
					<SizeSelector />
				</div>
			</div>
		);
	}

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(<ProductCustomizer />);
})();
