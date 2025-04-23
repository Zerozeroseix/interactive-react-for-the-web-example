import React, { StrictMode, Fragment, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import date from "date-and-time";

const CONFIG = {
	messageTypes: {
		management: "Management",
		dining: "Dining Services",
		ops: "Operations",
		plumbing: "Plumbing",
		pool: "Pool",
	},

	apiUrl: "/api",
};

function Loading({ what = "messages" }) {
	return (
		<p>
			Loading {what} <span className="loader" style={{ marginLeft: "0.5em" }} />
		</p>
	);
}

function PostForm(props) {
	const typeOptions = Object.keys(CONFIG.messageTypes).map(function (key) {
		return (
			<option key={key} value={key}>
				{CONFIG.messageTypes[key]}
			</option>
		);
	});

	// so we don't have to type this over and over
	const defaultType = typeOptions[0].key;

	return (
		<form>
			<h3>Post an Update</h3>

			<div className="field-group">
				<label htmlFor="txt-message">Message</label>
				<textarea id="txt-message" rows="2" required />
			</div>

			<div className="field-group">
				<label htmlFor="txt-type">Type</label>
				<select id="txt-type">{typeOptions}</select>
			</div>

			<div className="field-group action">
				<input type="submit" value="Post Update" />
			</div>
		</form>
	);
}

function StatusMessage(props) {
	const statusDate = date.parse(props.time, "YYYY-MM-DD HH:mm:ss");
	const dateFormat = "M/D/Y, h:mm A";

	return (
		<div className="status-message">
			{props.msg}
			<span className="name">— {props.type}</span>
			<span className="time">{date.format(statusDate, dateFormat)}</span>
		</div>
	);
}

function StatusMessageList(props) {
	const [statuses, setStatuses] = useState([]);

	useEffect(() => {
		// Fetch the status messages from the API
		fetch(`${CONFIG.apiUrl}/messages?delay=5000`)
			.then((response) => response.json())
			.then((data) => setStatuses(data))
			.catch((error) =>
				console.error("Error fetching status messages:", error),
			);
	}, []);

	let displayedStatuses;

	if (statuses.length > 0) {
		displayedStatuses = statuses.map((status) => {
			return (
				<li key={status.id} className={status.type}>
					<StatusMessage
						msg={status.msg}
						type={CONFIG.messageTypes[status.type]}
						time={status.time}
					/>
				</li>
			);
		});
	} else {
		displayedStatuses = <Loading />;
	}

	return <ul id="status-list">{displayedStatuses}</ul>;
}

function StatusMessageManager() {
	return (
		<Fragment>
			<div id="post-status">
				<PostForm />
			</div>
			<StatusMessageList />
		</Fragment>
	);
}

createRoot(document.getElementById("react-statusmanager")).render(
	<StrictMode>
		<StatusMessageManager />
	</StrictMode>,
);
