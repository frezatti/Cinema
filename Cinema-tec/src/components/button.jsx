import React from "react";

function Button({
	type = "button",
	className = "btn btn-primary",
	text = "Text",
	onclick,
}) {
	return (
		<>
			<button type={type} className={className} onClick={onclick}>
				{text}
			</button>
		</>
	);
}

export default Button;
