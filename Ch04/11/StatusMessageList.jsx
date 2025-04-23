import React from "react";
import { Loading } from "./Loading";
import { StatusMessage } from "./StatusMessage";
import { messageTypes } from "./constants";

export function StatusMessageList(props) {
	let displayedStatuses;

	if (props.loading) {
		displayedStatuses = <Loading />;
	} else if (props.statuses.length > 0) {
		displayedStatuses = props.statuses.map((status) => {
			return (
				<li key={status.id} className={status.type}>
					<StatusMessage
						msg={status.msg}
						type={messageTypes[status.type]}
						time={status.time}
					/>
				</li>
			);
		});
	}

	return <ul id="status-list">{displayedStatuses}</ul>;
}
