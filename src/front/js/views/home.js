import React from "react";
import "../../styles/home.css";
import { Character } from "../component/character.js";
import { Planets } from "../component/planets.js"

export const Home = () => {
	return (
	<div>
	<Character/>
	<Planets/>
	</div>
);
}
