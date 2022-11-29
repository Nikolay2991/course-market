import { memo, useContext } from "react";
import { AppContext } from "../../../context/app.context";
import { format } from "date-fns";
import cn from "classnames";
import styles from "./Menu.module.css";

const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

	return (
		<div>
			<ul>
			{menu.map(m => (
				<li key={m._id.secondCategory}>
				  {m._id.secondCategory}
				</li>
			))}
			</ul>
		</div>
	);
};

export default memo(Menu);