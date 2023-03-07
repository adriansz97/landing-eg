import { CDBAccordion } from "cdbreact";
import "./styles.scss";

const FrequentQuestions = () => {
    const data = [
        {
            title: "¿Se tomará algún tipo de represalia por realizar una denuncia o pregunta?",
            content: "Cuando realiza una pregunta o denuncia, se le proporcionará un folio de seguimiento. Necesita esta información para realizar el seguimiento de una denuncia, obtener una respuesta a la pregunta o comprobar el estado de una denuncia ya efectuada."
        },
        {
            title: "¿Se tomará algún tipo de represalia por realizar una denuncia o pregunta?",
            content: "Cuando realiza una pregunta o denuncia, se le proporcionará un folio de seguimiento. Necesita esta información para realizar el seguimiento de una denuncia, obtener una respuesta a la pregunta o comprobar el estado de una denuncia ya efectuada."
        },
        {
            title: "¿Se tomará algún tipo de represalia por realizar una denuncia o pregunta?",
            content: "Cuando realiza una pregunta o denuncia, se le proporcionará un folio de seguimiento. Necesita esta información para realizar el seguimiento de una denuncia, obtener una respuesta a la pregunta o comprobar el estado de una denuncia ya efectuada."
        },
        {
            title: "¿Se tomará algún tipo de represalia por realizar una denuncia o pregunta?",
            content: "Cuando realiza una pregunta o denuncia, se le proporcionará un folio de seguimiento. Necesita esta información para realizar el seguimiento de una denuncia, obtener una respuesta a la pregunta o comprobar el estado de una denuncia ya efectuada."
        },
        {
            title: "¿Se tomará algún tipo de represalia por realizar una denuncia o pregunta?",
            content: "Cuando realiza una pregunta o denuncia, se le proporcionará un folio de seguimiento. Necesita esta información para realizar el seguimiento de una denuncia, obtener una respuesta a la pregunta o comprobar el estado de una denuncia ya efectuada."
        },
        {
            title: "¿Se tomará algún tipo de represalia por realizar una denuncia o pregunta?",
            content: "Cuando realiza una pregunta o denuncia, se le proporcionará un folio de seguimiento. Necesita esta información para realizar el seguimiento de una denuncia, obtener una respuesta a la pregunta o comprobar el estado de una denuncia ya efectuada."
        }
    ];
    return (
        <div id="frequent-questions">
            <div className="text-center">
                <h3 className="mb-5">PREGUNTAS FRECUENTES</h3>
            </div>
            <CDBAccordion data={data} />
        </div>
    );
};

export default FrequentQuestions;