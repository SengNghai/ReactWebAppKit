import styles from './index.module.scss';
import Form from './Form';

export default function Welcome() {
    return (
        <div className={styles.welcome}>
            <Form />
        </div>
    )
}