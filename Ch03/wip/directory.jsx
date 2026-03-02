import React, { StrictMode, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createRoot } from "react-dom/client";

function getFilteredPeople(people, state) {
	const filteredPeople = people.filter(
		(person) =>
			(!state.isIntern || (person.intern && state.isIntern)) &&
			(state.currentName === "" ||
				person.name.toLowerCase().indexOf(state.currentName.toLowerCase()) !==
					-1) &&
			(state.currentTitle === "" || person.title_cat === state.currentTitle),
	);
	return filteredPeople;
}

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
			<AnimatePresence mode="popLayout">
				{props.people.map((person) => (
					<motion.div
						layout
						initial={{ opacity: 0.3, transform: "scaleY(0.1)" }}
						animate={{ opacity: 1, transform: "scaleY(1)" }}
						exit={{ opacity: 0.1, transform: "scaleY(0.1)" }}
						key={person.id}
						transition={{ duration: 0.3 }}
						style={{ originX: 0.5, originY: 0 }}
					>
						<Person person={person} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

function Filters(props) {
	const titles = window.LMDirectory.titles;

	const update = (key) => (event) => {
		if (key === "isIntern") {
			return props.updateFormState({ [key]: event.target.checked });
		}
		props.updateFormState({ [key]: event.target.value });
	};

	function resetFilters() {
		props.resetFormState({
			currentName: "",
			currentTitle: "",
			isIntern: false,
		});
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
					value={props.formState.currentName}
					onChange={update("currentName")}
				/>
			</div>
			<div className="group">
				<label htmlFor="person-title">Job Title:</label>
				<select
					name="person_title"
					id="person-title"
					value={props.formState.currentTitle}
					onChange={update("currentTitle")}
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
						checked={props.formState.isIntern}
						onChange={update("isIntern")}
					/>{" "}
					Intern
				</label>
			</div>
			<div className="group">
				<ResetButton reset={resetFilters} />
			</div>
		</form>
	);
}

function ResetButton({ reset }) {
	return (
		<button type="reset" onClick={reset}>
			Reset
		</button>
	);
}

function Directory() {
	const [people, setPeople] = useState(window.LMDirectory.people);
	const [formState, setFormState] = useState({
		currentName: "",
		currentTitle: "",
		isIntern: false,
	});

	const updateFormState = (spec) => {
		const newFormState = { ...formState, ...spec };
		setFormState(newFormState);
	};

	useEffect(() => {
		setPeople(getFilteredPeople(window.LMDirectory.people, formState));
	}, [formState]);

	return (
		<div className="company-directory">
			<h2>Company Directory</h2>
			<p>
				Learn more about each person at Leaf & Mortar in this company directory.
			</p>

			<Filters formState={formState} updateFormState={updateFormState} />

			<People people={people} />
		</div>
	);
}

createRoot(document.getElementById("directory-root")).render(
	<StrictMode>
		<Directory />
	</StrictMode>,
);
