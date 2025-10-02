import styles from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import type { FormikHelpers } from 'formik'




interface onSubmitProps {
    onSubmit: (query: string) => void;

}
interface OrderFormValues {
    quary: string;
}

export default function SearchBar({ onSubmit }: onSubmitProps) {

    const initialValues: OrderFormValues = {
        quary: ''
    }
    const handleSubmit = (
        values: OrderFormValues,
        actions: FormikHelpers<OrderFormValues>
    ) => {
        if (values.quary.trim() === '') {
            toast('Please enter your search query.')
            return
        }
        onSubmit(values.quary)
        actions.resetForm();
    }
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                {/* <form className={styles.form} action={handleSubmit} >
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form> */}
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className={styles.form}>
                        <Field type='text' name='quary' placeholder='Search movies...' className={styles.input} />
                        <button className={styles.button} type="submit">Search</button>
                    </Form>
                </Formik>
                <Toaster />
            </div>
        </header>
    )
}