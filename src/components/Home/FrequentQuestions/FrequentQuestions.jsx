import { CDBAccordion } from "cdbreact";
import "./styles.scss";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const FrequentQuestions = () => {

    const {clientName} = useContext(AppContext);
    
    const data = [
        {
            title: `¿Se tomará algún tipo de represalia por realizar un reporte?`,
            content: `Se presume que todos los reportes son hechas de buena fe y buscando única y exclusivamente que las conductas reportadas se apeguen a los principios éticos de la Compañía, por lo que NO habrá represalias en caso de realizar una denuncia.\n\nSin embargo, es nuestro deber proteger la integridad y el respeto a la reputación e imagen de nuestros colaboradores, por lo que, un reporte hecho de mala fe con el propósito de desprestigiar, denigrar o acusar falsamente como un medio de venganza, es una conducta no deseada y se sancionará de acuerdo con las políticas aplicables.\n\nEn el Código de Ética de ${clientName} establece un apartado de no represalias, lo cual es una política de la organización.`
        },
        {
            title: `¿Por qué reportar?`,
            content: `Queremos que te desarrolles en un ambiente de respeto y de derecho, en igualdad de circunstancias, protegiéndote de cualquier conducta que pudiese afectarte en el ámbito laboral o personal, propiciando con ello un clima sano y armonioso de libre expresión, que contribuya con el fortalecimiento de nuestra Empresa y su contribución con la comunidad, sociedad y las autoridades.`
        },
        {
            title: `¿Cuál es el horario para generar reportes, dudas o inquietudes vía telefónica?`,
            content: `Puedes hacerlo de lunes a sábado de 8 de la mañana a 10 de la noche y domingo de 9 de la mañana a 3 de la tarde. También, te recordamos que puedes dejar un mensaje en nuestro buzón de voz las 24 horas, los 365 días del año.`
        },
        {
            title: `¿Cuándo debo usar Línea Ética ${clientName}?`,
            content: `Cuando conozcas, te informen o estés involucrado en una situación que atente contra el Código de Ética de ${clientName}. Así mismo, cuando tengas inquietudes o sugerencias que prefieras que gestione el Comité de Ética en lugar de tratarlo directamente con tu supervisor. La decisión de usar la plataforma Línea Ética ${clientName} es voluntaria.`
        },
        {
            title: `¿En cuánto tiempo le darán solución a un reporte ya hecho?`,
            content: `EthicsGlobal envía la información al Comité de Ética en un marco máximo de 48 horas después de haber sido realizado el reporte; debido a la complejidad de cada caso en particular, el Comité será quien determine los tiempos de investigación y solución a los reportes realizados.`
        },
        {
            title: `¿Qué pasa si después de poner mi reporte quiero aportar más información?`,
            content: `En cualquier momento, tú como informante puedes acceder a Línea Ética ${clientName} y con folio de seguimiento en mano aportarás nueva información o alguna reincidencia, en caso de conocerlo.`
        }
    ];
    return (
        <div id="frequent-questions">
            <div className="text-center">
                <h3 className="mb-5">PREGUNTAS FRECUENTES</h3>
            </div>
            <CDBAccordion data={data} />
            {/* <p>{temp}</p> */}
        </div>
    );
};

export default FrequentQuestions;