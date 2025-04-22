import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function People(props) {
	return <div className="results">People go here</div>;
}

function Filters(props) {
	return <p>Filters go here</p>;
}

function Directory() {
	return (
		<div className="company-directory">
			<h2>Company Directory</h2>
			<p>
				Learn more about each person at Leaf &amp; Mortar in this company
				directory.
			</p>

			<Filters />

			<People />
		</div>
	);
}

createRoot(document.getElementById("directory-root")).render(
	<StrictMode>
		<Directory />
	</StrictMode>,
);
