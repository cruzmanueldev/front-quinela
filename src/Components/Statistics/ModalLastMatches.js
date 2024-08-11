import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import './../../Styles/Components/Matches/ModalLastMatches.css'

const ModalLastMatches = ({showModalMatches, setShowModalMatches}) => {

	const {
        rex_data_last_matches,
    } = useSelector(({matches}) => matches)


	return (
		<Modal
			open={showModalMatches}
			footer={null}
			onCancel={() => setShowModalMatches(false)}
			// className={`Modal-Matches-Calendar ${rex_data_user?.tornombre}`}
			closeIcon={false}
			>
				{
					rex_data_last_matches.map(dat => (
						<div style={{marginBottom:'10px'}}>
							<div style={{display:'flex', justifyContent:'center'}}>
								<div className="Container-Date-Match">{dat.pahfecha}</div>
							</div>
							<div className="Container-Detail-Match">
								<div style={{display:'flex', alignItems:'center', gap:'5px'}}>
									{dat.pahlocal}
									<img 
										src={dat.pahimagenlocal}
									/>
								</div>
								<div>{dat.pahgollocal} - {dat.pahgolvisita}</div>
								<div style={{display:'flex', alignItems:'center', gap:'5px'}}>
									<img src={dat.pahimagenvisita}/>
									{dat.pahvisitante}
								</div>
							</div>
						</div>
					))
				}
		</Modal>
	);
};

export default ModalLastMatches;
