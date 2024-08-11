import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDataSelectionsReducer } from "../Redux/Actions/Selections/Selections";
import './../Styles/Routes/Statistics.css'
import { Typography } from "antd";
import ModalLastMatches from "../Components/Statistics/ModalLastMatches";
import { GetDataLastMatchesReducer } from "../Redux/Actions/Matches/Matches";

const Statistics = () => {

	const dispatch = useDispatch()
	const [ showModalMatches, setShowModalMatches ] = useState(false)

	const { Title } = Typography

	const {
        rex_data_selections,
    } = useSelector(({selections}) => selections)

	const {
        rex_data_user,
    } = useSelector(({top}) => top)

	const getSelections = async () => {
		await dispatch(GetDataSelectionsReducer())
	}

	const showLastMathces = async (value) => {
		await dispatch(GetDataLastMatchesReducer(value))
		setShowModalMatches(true)
	}

	useEffect(()=> {
		getSelections()
	},[])

	return (
		<div className="Statistics-Container">
			{
				rex_data_selections.length > 0
				? <>
					{
						rex_data_selections.map((sel) => {
							return <div 
								className={`Card-Selection ${rex_data_user.tornombre}`}
								onClick={()=> showLastMathces(sel.selid)}
								>
									<img
										height={120}
										width={120}
										src={sel.selimagen}
									/>
							</div>
						})
					}
				</>
				: <div>Cargando</div>
			}
			<ModalLastMatches
				showModalMatches={showModalMatches}
				setShowModalMatches={setShowModalMatches}
			/>
		</div>
	)
};

export default Statistics;
