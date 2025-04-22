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
	return <p>Filters go here</p>;
}

function Directory() {
	const [people, setPeople] = useState(window.LMDirectory.people);

	return (
		<div className="company-directory">
			<h2>Company Directory</h2>
			<p>
				Learn more about each person at Leaf & Mortar in this company directory.
			</p>

			<Filters />

			<People people={people} />
		</div>
	);
}

createRoot(document.getElementById("directory-root")).render(
	<StrictMode>
		<Directory />
	</StrictMode>,
);
