import { Segmented, Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'


const ModalMatches = ({ onChange, showModal, setShowModal }) => {

    const {
        rex_data_matches,
    } = useSelector(({matches}) => matches)

    const {
        rex_data_user,
    } = useSelector(({top}) => top)

    return (
        <Modal
            open={showModal}
            footer={null}
            onCancel={()=> setShowModal(false)}
            className={`Modal-Matches-Calendar ${rex_data_user?.tornombre}`}
            style={{display:'flex', flexWrap:'wrap', width:'100%'}}
            closeIcon={false}
        >
            <Segmented
                options={rex_data_matches.map(mat => mat.fecnombre)}
                onChange={onChange}
            />
        </Modal>
    )
}

export default ModalMatches