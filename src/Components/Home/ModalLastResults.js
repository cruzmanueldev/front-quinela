import { useDispatch, useSelector } from "react-redux"
import { GetDataLastResultsQuinelaReducer, ShowModalLastResultsReducer } from "../../Redux/Actions/Home/Home"
import { Button, Col, Divider, Empty, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import {
  CrownOutlined
} from '@ant-design/icons';
import ImageLoading from '../../Assets/images/loadingBall.gif'

const ModalLastResult = () => {

  const {
    rex_data_last_results,
    rex_show_modal_last_results,
    loading_data_results
  } = useSelector(({ home }) => home)

  const [currentJournery, setCurrentJournery] = useState(15)

  const dispatch = useDispatch()

  const [userSelected, setUserSelected] = useState(null)

  const closeModal = () => {
    dispatch(ShowModalLastResultsReducer(false))
  }

  const getData = (journey = null) => {
    dispatch(GetDataLastResultsQuinelaReducer(journey ? journey : currentJournery))
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <Modal
      open={rex_show_modal_last_results}
      footer={null}
      onCancel={closeModal}
      className='Modal-Form-Quinela'
      closeIcon={false}
    >
      <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Ultimos resultados Quinela</div>
      <div style={{ fontWeight: 'bold' }}>Jornada: </div>
      <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(jou => (
            <Button
              style={{
                backgroundColor: jou == currentJournery ? '#0958d9' : '#FFFFFF',
                color: jou == currentJournery ? '#FFFFFF' : '#0958d9',
                border: jou == currentJournery ? 'none' : '1px solid #0958d9'
              }}
              onClick={() => {
                if (jou != currentJournery) {
                  getData(jou)
                  setCurrentJournery(jou)
                  setUserSelected(null)
                }
              }}
            >{jou}</Button>
          ))
        }
      </div>
      {
        rex_data_last_results.length == 0
          ? <Empty />
          : null
      }

      {
        loading_data_results == true
          ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img
              src={ImageLoading}
              width={200}
            />
            <div style={{ fontSize: '20px' }}>Cargando...</div>
          </div>
          : <>
            {
              rex_data_last_results?.map((mat, index) => (
                <>
                  <Row key={index} gutter={[12, 12]} style={{ display: 'flex', margin: '10px 0' }}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>{mat._sum.puupuntostotal}ptos - {mat.usuario.usuusuario}</div>
                      </div>
                      <Button
                        style={{
                          backgroundColor: mat.usuid == userSelected ? '#0958d9' : '#FFFFFF',
                          color: mat.usuid == userSelected ? '#FFFFFF' : '#0958d9',
                          border: mat.usuid == userSelected ? 'none' : '1px solid #0958d9'
                        }}
                        onClick={() => {
                          if (mat.usuid == userSelected) {
                            setUserSelected(null)
                          } else {
                            setUserSelected(mat.usuid)
                          }
                        }}>Ver partidos</Button>
                    </Col>
                    <Col span={24}>
                      {
                        userSelected
                          ? <Row>
                            <Col span={9}></Col>
                            <Col style={{ textAlign: "center", color:'#0958d9' }} span={6}>Resultado</Col>
                            <Col span={3}></Col>
                            <Col span={6} style={{ textAlign: "center", color:'#0958d9' }}> Quinela</Col>
                          </Row>
                          : null
                      }
                      {
                        mat.predicts.filter(usu => mat.usuid == userSelected).map(pre => (
                          <>
                            <Row className='ContainerMatchHistorical'>
                              <Col span={9}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }}>
                                  <img
                                    height='30'
                                    width='auto'
                                    src={pre.pruparpartidos.parlocalsel.selimagen}
                                  />
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >vs</div>
                                  <img
                                    height='30'
                                    width='auto'
                                    src={pre.pruparpartidos.parvisitasel.selimagen}
                                  />
                                </div>
                              </Col>
                              <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', alignItems: 'center', backgroundColor: '#0266E2', borderRadius: '5px', padding: '1px 4px', color: '#FFFFFF' }}>
                                  <div>{pre.pruparpartidos.pargoleslocal}</div>
                                  <div>{'-'}</div>
                                  <div>{pre.pruparpartidos.pargolesvisita}</div>
                                </div>
                              </Col>
                              <Col span={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                  pre.prugoleslocal == pre.pruparpartidos.pargoleslocal && pre.prugolesvisita == pre.pruparpartidos.pargolesvisita
                                    ? <CrownOutlined style={{ color: '#F0AB42', fontSize: '18px' }} />
                                    : null
                                }
                              </Col>

                              <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{
                                  display: 'flex', justifyContent: `center`, gap: `3px`, alignItems: `center`,
                                  backgroundColor: `${pre.parganador == pre.pruganador ? '#237804' : '#ff4d4f'}`,
                                  borderRadius: `5px`, padding: `1px 4px`, color: `#FFFFFF`
                                }}
                                >
                                  <div style={{ alignItems: 'center', textAlign: 'center' }}>{pre.prugoleslocal}</div>
                                  <div>{'-'}</div>
                                  <div>{pre.prugolesvisita}</div>
                                </div>
                              </Col>
                            </Row>
                          </>
                        ))
                      }
                    </Col>
                    <Divider style={{ marginTop: '2px', marginBottom: '0' }} />
                  </Row>
                </>
              ))
            }
          </>
      }
    </Modal>
  )
}

export default ModalLastResult