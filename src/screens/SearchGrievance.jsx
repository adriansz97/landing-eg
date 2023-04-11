import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom"

export const SearchGrievance = () => {

  const location = useLocation();

  return (
    <div className="search-grievance-page container">

      <div className="header">
        <h1>Report Information</h1>
        <h4>{location.state.tracking_code} sended at mar, 11 de abr de 2023 a las 05:09:02 CDT</h4>
        <h5>The current status of your report is: {location.state.status}</h5>
      </div>
      
      <main className="main-content">


        <Row>
          <Col xs={6} className="additional-info">

            <h4>Additional Information</h4>

            <div className="additional-facts">
              <label htmlFor="additional-facts-input">Additional facts</label>
              <textarea id="additional-facts-input" cols="30" rows="10"></textarea>
            </div>

            <div className="attachments">
              <label htmlFor="attachments-input">Additional facts</label>
              <input type="file" id="attachments-input" cols="30" rows="10"></input>
            </div>

          </Col>
          <Col xs={6} className="history-mail">
            
            <h4>Mailbox</h4>
          
          </Col>
        </Row>

      </main>
        
    </div>
  )
}
