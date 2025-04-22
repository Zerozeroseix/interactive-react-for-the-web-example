import React, { StrictMode, Fragment, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { PostForm } from "./PostForm";
import { StatusMessageList } from "./StatusMessageList";
import { apiUrl } from "./constants";

function StatusMessageManager(props) {
	const messageTypes = {
		management: "Management",
		dining: "Dining Services",
		ops: "Operations",
		plumbing: "Plumbing",
		pool: "Pool",
	};

	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		// Fetch the status messages from the API
		fetch(`${apiUrl}/messages?delay=5000`)
			.then((response) => response.json())
			.then((data) => {
				setStatuses(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching status messages:", error);
				setLoading(false);
			});
	}, []);

	function addStatusMessage(status) {
		const updatedStatuses = statuses.slice(0);

		updatedStatuses.push(status);

		setStatuses(updatedStatuses);
	}

	return (
		<Fragment>
			<div id="post-status">
				<PostForm
					messageTypes={messageTypes}
					addStatusMessage={addStatusMessage}
				/>
			</div>
			<StatusMessageList
				messageTypes={messageTypes}
				statuses={statuses}
				loading={loading}
			/>
		</Fragment>
	);
}

createRoot(document.getElementById("react-statusmanager")).render(
	<StrictMode>
		<StatusMessageManager />
	</StrictMode>,
);
