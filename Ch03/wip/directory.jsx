import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function Directory() {}

createRoot(document.getElementById("directory-root")).render(
	<StrictMode>
		<Directory />
	</StrictMode>,
);
