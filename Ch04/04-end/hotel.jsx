import React, { StrictMode, Fragment, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import date from "date-and-time";

function PostForm(props) {
	const typeOptions = Object.keys(props.messageTypes).map(function (key) {
		if (Object.hasOwn(props.messageTypes, key)) {
			return (
				<option key={key} value={key}>
					{props.messageTypes[key]}
				</option>
			);
		}
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
	const stubStatuses = [
		{
			id: 1,
			msg: "The hot tub is currently closed for maintenance.  We expect it to be back up and running within 48 hours.",
			type: "management",
			time: "2025-04-11 09:15:32",
		},
		{
			id: 2,
			msg: "The hot tub maintenance is complete.  Please enjoy a dip!",
			type: "management",
			time: "2025-04-14 17:12:08",
		},
		{
			id: 3,
			msg: "The rice cooker is on the fritz, any fried rice dishes will require some extra time to cook.",
			type: "dining",
			time: "2025-04-18 15:00:00",
		},
	];

	const [statuses, setStatuses] = useState(stubStatuses);

	useEffect(() => {
		// Fetch the status messages from the API
		fetch(`/api/messages`)
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
						type={props.messageTypes[status.type]}
						time={status.time}
					/>
				</li>
			);
		});
	}

	return <ul id="status-list">{displayedStatuses}</ul>;
}

function StatusMessageManager() {
	const messageTypes = {
		management: "Management",
		dining: "Dining Services",
		ops: "Operations",
		plumbing: "Plumbing",
		pool: "Pool",
	};

	const apiUrl = "/api";

	return (
		<Fragment>
			<div id="post-status">
				<PostForm messageTypes={messageTypes} />
			</div>
			<StatusMessageList messageTypes={messageTypes} />
		</Fragment>
	);
}

createRoot(document.getElementById("react-statusmanager")).render(
	<StrictMode>
		<StatusMessageManager />
	</StrictMode>,
);
