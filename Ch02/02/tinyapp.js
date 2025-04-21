(() => {
	const ProductCustomizer = React.createElement(
		"div",
		{ className: "customizer" },
		"Product customizer will go here",
	);

	const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
	root.render(ProductCustomizer);
})();
