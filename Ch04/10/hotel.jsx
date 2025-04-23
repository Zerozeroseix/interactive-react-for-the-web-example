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

	const [messageText, setMessageText] = useState("");
	const [messageType, setMessageType] = useState(defaultType);

	function onTextChange(evt) {
		setMessageText(evt.target.value);
	}

	function onTypeChange(evt) {
		setMessageType(evt.target.value);
	}

	function postStatusUpdate(evt) {
		evt.preventDefault();

		const newStatus = {
			msg: messageText,
			type: messageType,
			time: date.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
		};

		fetch(`${CONFIG.apiUrl}/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newStatus),
		})
			.then(function (response) {
				console.log(response);

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				return response.json();
			})
			.then(function (jsonData) {
				newStatus.id = jsonData.message.id;
				props.addStatusMessage(newStatus);

				// reset the form values
				setMessageText("");
				setMessageType(defaultType);
			})
			.catch(function (error) {
				console.error("Error posting status update:", error);
			});
	}

	return (
		<form onSubmit={postStatusUpdate}>
			<h3>Post an Update</h3>

			<div className="field-group">
				<label htmlFor="txt-message">Message</label>
				<textarea
					id="txt-message"
					rows="2"
					required
					onChange={onTextChange}
					value={messageText}
				/>
			</div>

			<div className="field-group">
				<label htmlFor="txt-type">Type</label>
				<select id="txt-type" onChange={onTypeChange} value={messageType}>
					{typeOptions}
				</select>
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
	let displayedStatuses;

	if (props.loading) {
		displayedStatuses = <Loading />;
	} else if (props.statuses.length > 0) {
		displayedStatuses = props.statuses.map((status) => {
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
	}

	return <ul id="status-list">{displayedStatuses}</ul>;
}

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
					setLoading(false);
				}
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
