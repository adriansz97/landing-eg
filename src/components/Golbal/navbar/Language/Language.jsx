import { useState } from "react";
import { CDBSelect } from "cdbreact";
import "./styles.scss"

const Select = () => {
    const [option] = useState([
        // {
        //     text: "ES",
        //     value: "es",
        // },
        {
            text: "EN",
            value: "en",
        }
    ]);

    return (
        <CDBSelect id="lang-select" options={option} selected="ES"/>
    );
};

export default Select;