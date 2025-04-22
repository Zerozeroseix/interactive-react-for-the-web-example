import React from "react";

export function Loading({ what = "messages" }) {
	return (
		<p>
			Loading {what} <span className="loader" style={{ marginLeft: "0.5em" }} />
		</p>
	);
}
