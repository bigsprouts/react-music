import React from 'react';
import ButtonCounter from '../../components/buttons/buttonCounter';
import ButtonSwitch from '../../components/buttons/buttonSwitch';

class Buttons extends React.Component {

	render() {
		return (
			<div className="item">
				<h3 style={{color:'#113c2b'}}>一.按钮组合</h3>
				<ButtonCounter />
				<ButtonSwitch />
			</div>
		)
	}
}

export default Buttons;
