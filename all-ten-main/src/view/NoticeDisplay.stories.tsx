import React, {useState} from "react";
import {Meta} from "@storybook/react";

import * as ErrorCopy from "../util/ErrorCopy";
import {NoticeState} from "../state/AppState";
import NoticeDisplay from "./NoticeDisplay";

export const Main = () => {
	const [nextGen, setNextGen] = useState<number>(1);
	const [notice, setNotice] = useState<NoticeState | null>(null);

	const onShort = () => {
		setNotice({
			gen: nextGen,
			message: "This is notice #" + nextGen,
			duration: 2000,
		});
		setNextGen(nextGen + 1);
	};

	const onForever = () => {
		setNotice({
			gen: nextGen,
			message: "This is notice #" + nextGen,
			duration: 0,
		});
		setNextGen(nextGen + 1);
	};

	const onNone = () => {
		setNotice(null);
	};

	return (
		<div style={{fontFamily: "sans-serif", width: 320}}>
			<NoticeDisplay notice={notice} />
			<div style={{marginTop: 8}}>
				<button onClick={onShort}>Set short notice</button>
				<button onClick={onForever}>Set forever notice</button>
				<button onClick={onNone}>Set no notice</button>
			</div>
		</div>
	);
};

const errorCopyKeys = Object.keys(ErrorCopy);
errorCopyKeys.sort();

export const Errors = () => {
	const [nextGen, setNextGen] = useState<number>(1);
	const [notice, setNotice] = useState<NoticeState | null>(null);

	const onChange = (evt: any) => {
		const key: keyof typeof ErrorCopy = evt.currentTarget.value;
		const message =
			typeof ErrorCopy[key] === "function" ? null : ErrorCopy[key];
		if (!message) {
			setNotice(null);
			return;
		}
		setNotice({
			gen: nextGen,
			message: message as string, // needed since ErrorCopy includes one function for fractions
			duration: 5000,
		});
		setNextGen(nextGen + 1);
	};

	const options = errorCopyKeys.map((k) => (
		<option key={k} value={k}>
			{k}
		</option>
	));
	return (
		<div style={{fontFamily: "sans-serif", width: 320}}>
			<NoticeDisplay notice={notice} />
			<div style={{marginTop: 8}}>
				<select onChange={onChange}>
					<option value="">(none)</option>
					{options}
				</select>
			</div>
		</div>
	);
};

export default {
	title: "Components/NoticeDisplay",
	component: NoticeDisplay,
} as Meta;
