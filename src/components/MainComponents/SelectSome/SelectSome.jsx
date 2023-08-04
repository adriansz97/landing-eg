import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Select from 'react-select';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MCLabel } from '../Label/Label';
import { MCSelect } from '../Select/Select';
import Icon from '../../Icon/Icon';
import './styles.scss'

export const MCSelectSome = ({ options = [], label, placeholder, selecteds = [], onChange = () => { } }) => {

	const [selected, setSelected] = useState(selecteds);
	const { gTheme } = useSelector((state) => state.theme);

	useEffect(() => {
		onChange(selected);
	}, [selected]);

	const removeItem = (value) => {
		let newSelecteds = selected.filter((item) => item.value !== value);
		setSelected(newSelecteds);
	}

	const handleSelected = (event) => {
		const temp = options.find(itemtemp => itemtemp.value === event.value);
		const existing = selected.find(item => item.value === event.value)
		if (!existing) {
			let selection = { ...temp }
			setSelected(lastData => [...lastData, selection]);
		}
		// event.target.selectedIndex = null;
	}

	const styleDarkMode = gTheme === "light" ? "" : "dark-mode"

	const tooltip = (
		<Tooltip id="tooltip" placement="right" style={{marginTop:15}}>
			<strong>Eliminar!</strong>
		</Tooltip>
	);

	const getOptions = (childrens) => {
		var option = [];

		for (var i=0; i < childrens.length; i++) {
			option.push({value:(childrens[i].value || childrens[i].code), key:i, label:(childrens[i].label || childrens[i].name)})
		}

		return option;
	};

	return (
		<>
			<div className="d-flex flex-column">
				<div className="d-flex flex-row mb-1">
					<div className="d-flex justify-content-start w-50">
						<MCLabel text={label} />
					</div>
					<div className="d-flex justify-content-end w-50">
						<MCLabel text={`${selected.length} / ${options.length}`} />
					</div>
				</div>
			</div>
			<MCSelect 
				placeholder={ <div>Seleccione una opción</div> }
				options={getOptions(options)}
				onChange={handleSelected}
			/>
			{
				selected.length > 0
					? <div className="d-flex flex-row" style={{ marginTop: '10px' }}>
						{
							selected.map((item, idx) => (
								<div key={idx} className={`chipBox ${styleDarkMode}`}>
									<div className="d-flex justify-content-between">
										<span className="justify-content-star align-self-center">{item.label || item.name || item.country}</span>
										<OverlayTrigger placement='right' overlay={tooltip}>
											<div className='d-flex justify-content-end aling-items-center'>
												<Icon name="bold_close_circle" onClick={() => removeItem(item.value)} className={`w-50 chipClose justify-content-end ${styleDarkMode}`}/>
											</div>
										</OverlayTrigger>
									</div>
								</div>
							))
						}
					</div>
					: <></>
			}
		</>
	);
}