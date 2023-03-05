import s from "./renderMessage.module.scss";

type RenderMessageProps = {
	messageText: string;
	messageIcon: React.ReactNode;
};

const RenderMessage = ({ messageText, messageIcon }: RenderMessageProps) => {
	return (
		<div className={s.root}>
			<div className={s.icon}>{messageIcon}</div>
			<p className={s.text}>{messageText}</p>
		</div>
	);
};

export { RenderMessage };
