import React from 'react';

export const Sidebar = ({width, height, children}) => {
    const [xPosition, setX] = React.useState(-width);

    const toggleMenu = () => {
        if(xPosition < 0) {
            setX(0);
        } else {
            setX(-width);
        }
    };

    React.useEffect(() => {
        setX(-width)
    }, []);

    return (
		<>
			<div
				className="side-bar"
				style={{
					transform: `translatex(${xPosition}px)`,
					width: width,
					height: height,
				}}
			>
				<button
					onClick={() => toggleMenu()}
					className="toggle-menu"
					style={{
						transform: `translate(${width}px, 20vh)`,
					}}
				></button>
				<div className="content">{children}</div>
			</div>
		</>
	);
}