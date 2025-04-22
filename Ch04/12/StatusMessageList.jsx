import React from "react";
import { Loading } from "./Loading";
import { StatusMessage } from "./StatusMessage";

export function StatusMessageList(props) {
	let displayedStatuses;

	if (props.loading) {
		displayedStatuses = <Loading />;
	} else if (props.statuses.length > 0) {
		// Sort the messages the API returns by time
		// This is a shallow copy, which is fine since we're not changing anything except the order
		let sortedStatuses = props.statuses.slice(0);

		sortedStatuses.sort((a, b) => {
			return new Date(b.time) - new Date(a.time);
		});

		displayedStatuses = sortedStatuses.map((status) => {
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
