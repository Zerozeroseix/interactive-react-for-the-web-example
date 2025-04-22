import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

function Person(props) {
	return (
		<div className="person">
			<h3>
				{props.person.name}, {props.person.title}
			</h3>

			<p>
				<img
					className="size-medium alignright"
					src={props.person.img}
					alt={props.person.name}
					width="300"
					height="300"
					sizes="(max-width: 300px) 100vw, 300px"
				/>

				{props.person.bio}
			</p>
		</div>
	);
}

function People(props) {
	return (
		<div className="results">
			{props.people.map((person) => (
				<Person key={person.id} person={person} />
			))}
		</div>
	);
}

function Filters(props) {
	const titles = window.LMDirectory.titles;

	function updateName(event) {
		props.setCurrentName(event.target.value);
	}

	function updateTitle(event) {
		props.setCurrentTitle(event.target.value);
	}

	function updateIntern(event) {
		props.setIsIntern(event.target.checked);
	}

	return (
		<form action="" id="directory-filters">
			<div className="group">
				<label htmlFor="person-name">Name:</label>
				<input
					type="text"
					name="person_name"
					placeholder="Name of employee"
					id="person-name"
					value={props.currentName}
					onChange={updateName}
				/>
			</div>
			<div className="group">
				<label htmlFor="person-title">Job Title:</label>
				<select
					name="person_title"
					id="person-title"
					value={props.currentTitle}
					onChange={updateTitle}
				>
					<option value="">- Select -</option>
					{titles.map((title) => (
						<option value={title.key} key={title.key}>
							{title.display}
						</option>
					))}
				</select>
			</div>
			<div className="group">
				<label>
					<input
						type="checkbox"
						value="1"
						name="person_intern"
						checked={props.isIntern}
						onChange={updateIntern}
					/>{" "}
					Intern
				</label>
			</div>
		</form>
	);
}

function Directory() {
	const [people, setPeople] = useState(window.LMDirectory.people);
	const [currentName, setCurrentName] = useState("");
	const [currentTitle, setCurrentTitle] = useState("");
	const [isIntern, setIsIntern] = useState(false);

	return (
		<div className="company-directory">
			<h2>Company Directory</h2>
			<p>
				Learn more about each person at Leaf & Mortar in this company directory.
			</p>

			<Filters
				currentName={currentName}
				currentTitle={currentTitle}
				isIntern={isIntern}
				setCurrentName={setCurrentName}
				setCurrentTitle={setCurrentTitle}
				setIsIntern={setIsIntern}
			/>

			<People people={people} />
		</div>
	);
}

createRoot(document.getElementById("directory-root")).render(
	<StrictMode>
		<Directory />
	</StrictMode>,
);
