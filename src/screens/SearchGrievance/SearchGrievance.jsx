import { useEffect, useRef, useState } from "react"; 
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { createAnonymousMessage, getAnonymousPanel } from "../../apis";
import { useIsFocused } from "../../hooks/useIsFocused";
import { MCButton } from "../../components/MainComponents/Button/Button";
import './styles.scss'

export const SearchGrievance = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const [isloading, setIsloading] = useState(true);
  const [msgToSend, setMsgToSend] = useState("");
  const { isFocused, handleOnFocus, handleOnBlur } = useIsFocused();
  const [msgs, setMsgs] = useState([]);
  const attachmentsRef = useRef(null);

  useEffect(() => {
    getAnonymousPanel(location.state.tracking_code)
    .then(resp=>{
      setMsgs(resp);
      setIsloading(false);
    });
  }, []);

  const handleSendMessage = async() => {
    const errors = [];
    if (msgToSend.trim()==="") {
      errors.push("Este campo no deberia de estar vacio")
    }
    if (errors.length === 0) {
      try {
        await createAnonymousMessage({ tracking_code: location.state.tracking_code, content: msgToSend });
        Swal.fire( 'Mensaje enviado', 'Gracias por su aportación adicional', 'success');
        setMsgToSend("");
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire( 'El mensaje no puede estar vacio', '', 'error');
    }
  }

  const handleAttClick = () => {
    attachmentsRef.current.click();
  }

  return (
    <div className="search-grievance-page container">

      <div className="header">
        <h1>Report Information</h1>
        <h4>{location.state.tracking_code} sended at mar, 11 de abr de 2023 a las 05:09:02 CDT</h4>
        <h5>The current status of your report is: {location.state.status}, {location.state.message}</h5>
      </div>
      
      <main className="main-content mt-5">


        <Row className="gx-5">


          <Col lg={6}>

            <span className="col-title">Additional Information</span>

            <div className="main-content-cols">

                <div className="additional-facts" style={{ backgroundColor: isFocused ? '#F0F0F0' : 'transparent' }}>

                  <label htmlFor="additional-facts-input">Additional facts</label>

                  <textarea 
                    value={msgToSend}
                    onChange={(e)=>setMsgToSend(e.target.value)}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    id="additional-facts-input" 
                    className="additional-facts-input"
                    rows="10">
                  </textarea>

                </div>

                <hr />

                <div className="attachments" style={{ backgroundColor: '#F0F0F0' }} onClick={handleAttClick} >

                  <label htmlFor="attachments-input">Attachtments</label>

                  <div className="attachments-icon-container">
                    <i className="fa-regular fa-file-image"></i>
                    <i className="fa-regular fa-file-lines"></i>
                    <i className="fa-regular fa-file-audio"></i>
                    <i className="fa-regular fa-file-video"></i>
                    <i className="fa-regular fa-file-word"></i>
                  </div>
                  
                  <div className="attachments-instructions">
                    <p>Drag your files here</p>
                    <p>or click here.</p>
                  </div>


                </div>

            </div>
            <div className="d-flex justify-content-end">
              <MCButton 
                className="mt-2 me-2"
                label="Volver"
                variant="primary"
                onClick={()=>navigate(-1)}
                />
              <MCButton 
                className="mt-2"
                label="Terminar"
                variant="primary"
                onClick={handleSendMessage}
              />
            </div>


          </Col>

          <input className="d-none" type="file" id="attachments-input" cols="30" rows="10" ref={attachmentsRef} ></input>

          <Col lg={6} className="history-mail">
            
            <h4 className="col-title">Mailbox</h4>

            <div className="main-content-cols">

                <div className="atta">
                  
                  {
                    !isloading && msgs.length === 0
                    ? <>
                        <p>Aquí encontrará los mensajes que algún asesor o responsable de investigación le envíe, en cuanto tenga alguno usted podrá enviar sus respuestas.</p>
                        <div className="alert alert-danger m-t-20" role="alert">Hasta el momento no se han recibido mensajes para usted.</div>
                      </>
                    : <div className="chat-container" style={{ backgroundColor: '#F0F0F0' }}>
                        {
                          msgs.map(item=>(
                            <div className={`chat-msg ${item.is_sender?"sended":"recived"}`}>
                              <div>{item.content} <br /> <small><small>{item.created_at}</small></small></div>
                            </div>
                          ))
                        }
                      </div>
                  }

                </div>

            </div>
          
          </Col>
        </Row>

      </main>
        
    </div>
  )
}
