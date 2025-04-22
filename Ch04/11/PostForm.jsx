import React from "react";
import { useState } from "react";
import date from "date-and-time";
import { apiUrl } from "./constants";

export function PostForm(props) {
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

		fetch(`${apiUrl}/messages`, {
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
