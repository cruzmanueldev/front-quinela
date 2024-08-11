import React from "react";
import { Segmented } from "antd";
import { useSelector } from "react-redux";

const MatchesCA = () => {

	const {
        rex_data_matches,
    } = useSelector(({matches}) => matches)

	return (
		<div className="Matches-CA">
			<Segmented
				options={rex_data_matches.map(mat => mat.fecnombre)}
				onChange={(value) => {
				}}
			/>
		</div>
	)
};

export default MatchesCA;
