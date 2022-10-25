import { IoAlertCircleOutline } from "react-icons/io5";

import styles from "./errorMessage.module.scss";

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className={styles.error}>
            <IoAlertCircleOutline style={{ color: "#f38e82" }} />
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
