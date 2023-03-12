import s from "./renderMessage.module.scss";

type RenderMessageProps = {
	text: string;
	icon: React.ReactNode;
};

const RenderMessage = ({ text, icon }: RenderMessageProps) => {
	return (
		<div className={s.root}>
			<div className={s.icon}>{icon}</div>
			<p className={s.text}>{text}</p>
		</div>
	);
};

export { RenderMessage };
