import React, { StrictMode, Fragment, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { PostForm } from "./PostForm";
import { StatusMessageList } from "./StatusMessageList";
import { apiUrl } from "./constants";

function StatusMessageManager() {
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const abortController = new AbortController();

		// Fetch the status messages from the API
		fetch(`${CONFIG.apiUrl}/messages?delay=5000`, {
			signal: abortController.signal,
		})
			.then((response) => response.json())
			.then((data) => {
				setStatuses(data);
				setLoading(false);
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					// AbortErrors are expected during cleanup
					console.error("Error fetching status messages:", error);
				}
				setLoading(false);
			});

		return () => {
			abortController.abort();
		};
	}, []);

	function addStatusMessage(status) {
		const updatedStatuses = statuses.slice(0);

		updatedStatuses.push(status);

		setStatuses(updatedStatuses);
	}

	return (
		<Fragment>
			<div id="post-status">
				<PostForm addStatusMessage={addStatusMessage} />
			</div>
			<StatusMessageList statuses={statuses} loading={loading} />
		</Fragment>
	);
}

createRoot(document.getElementById("react-statusmanager")).render(
	<StrictMode>
		<StatusMessageManager />
	</StrictMode>,
);
