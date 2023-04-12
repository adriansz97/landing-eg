import { useEffect, useRef, useState } from "react"; 
import { Col, Row } from "react-bootstrap";
import { CDBBtn, CDBIcon } from "cdbreact";
import { useLocation } from "react-router-dom"
import { useIsFocused } from "../../hooks/useIsFocused";
import { useIsHovering } from "../../hooks/useIsHovering";
import './styles.scss'
import { createMessagePublic, getPublicMessagesList } from "../../apis";
import Swal from "sweetalert2";

export const SearchGrievance = () => {

  const location = useLocation();
  const [msgToSend, setMsgToSend] = useState("");
  const [errorsMsg, setErrorsMsg] = useState([]);
  const { isFocused, handleOnFocus, handleOnBlur } = useIsFocused();
  const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();
  const [msgs, setMsgs] = useState([]);
  const attachmentsRef = useRef(null);

  useEffect(() => {
    getPublicMessagesList(location.state.tracking_code)
    .then(resp=>setMsgs(resp.response));
  }, []);

  const handleSendMessage = async() => {
    const errors = [];
    if (msgToSend.trim()==="") {
      errors.push("Este campo no deberia de estar vacio")
    }
    setErrorsMsg(errors);
    if (errors.length === 0) {
      try {
        await createMessagePublic(location.state.tracking_code, msgToSend);
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


          <Col xs={6}>

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
                    cols="30" 
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
              <CDBBtn
                className="mt-2"
                style={{ backgroundColor: isHovering ? '#00bbff' : '#009ED7', borderRadius: 4 }} 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut}
                onClick={handleSendMessage}
              >
                Terminar
              </CDBBtn>
            </div>


          </Col>

          <input className="d-none" type="file" id="attachments-input" cols="30" rows="10" ref={attachmentsRef} ></input>

          <Col xs={6} className="history-mail">
            
            <h4 className="col-title">Mailbox</h4>

            <div className="main-content-cols">

                <div className="atta">
                  
                  {
                    !msgs 
                    ? <>
                        <p>Aquí encontrará los mensajes que algún asesor o responsable de investigación le envíe, en cuanto tenga alguno usted podrá enviar sus respuestas.</p>
                        <div class="alert alert-danger m-t-20" role="alert">Hasta el momento no se han recibido mensajes para usted.</div>
                      </>
                    : <div className="chat-container" style={{ backgroundColor: '#F0F0F0' }}>
                        <div className="chat-msg sended">
                          <div>Hola.</div>
                        </div>
                        <div className="chat-msg recived">
                          <div>Hola, en que puedo ayudarte?.</div>
                        </div>
                        <div className="chat-msg sended">
                          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae enim perspiciatis, earum in numquam fuga, voluptatibus est error dolorum omnis molestiae nesciunt repellendus adipisci ut perferendis dignissimos! Ipsum, perferendis voluptate.</div>
                        </div>
                        <div className="chat-msg recived">
                          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae enim perspiciatis, earum in numquam fuga, voluptatibus est error dolorum omnis molestiae nesciunt repellendus adipisci ut perferendis dignissimos! Ipsum, perferendis voluptate.</div>
                        </div>
                        <div className="chat-msg sended">
                          <div>Adios</div>
                        </div>
                        {
                          msgs.map(item=>(
                            <div className="chat-msg sended">
                              <div>{item.content}</div>
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
