import { useEffect } from "react";
import { Modal } from "react-bootstrap"

export const ModalTracking = ({ show, onHide }) => {

  useEffect(() => {
    console.log("se creo")
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      Hola
    </Modal>
  )
}
