(() => {
	function ProductImage(props) {
		return <img src="../../../assets/red.jpg" alt="A red sneaker" />;
	}

	function ProductCustomizer(props) {
		return (
			<div className="customizer">
				<div className="product-image">
					<ProductImage />
				</div>
			</div>
		);
	}

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(<ProductCustomizer />);
})();
