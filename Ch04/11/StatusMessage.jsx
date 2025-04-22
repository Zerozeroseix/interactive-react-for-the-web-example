import React from "react";
import date from "date-and-time";

export function StatusMessage(props) {
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
