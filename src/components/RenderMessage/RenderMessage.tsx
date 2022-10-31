import styles from "./renderMessage.module.scss";

type RenderMessageProps = {
    messageText: string;
    messageIcon: React.ReactNode;
};

const RenderMessage = ({ messageText, messageIcon }: RenderMessageProps) => {
    return (
        <div className={styles.message}>
            <div className={styles.messageIcon}>{messageIcon}</div>
            <p className={styles.messageText}>{messageText}</p>
        </div>
    );
};

export default RenderMessage;
