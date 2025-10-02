import styles from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import type { FormikHelpers } from 'formik'




interface onSubmitProps {
    onSubmit: (query: string) => void;

}
interface OrderFormValues {
    query: string;
}

export default function SearchBar({ onSubmit }: onSubmitProps) {

    const initialValues: OrderFormValues = {
        query: ''
    }
    const handleSubmit = (
        values: OrderFormValues,
        actions: FormikHelpers<OrderFormValues>
    ) => {
        if (values.query.trim() === '') {
            toast('Please enter your search query.')
            return
        }
        onSubmit(values.query)
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

                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className={styles.form}>
                        <Field type='text' name='query' placeholder='Search movies...' className={styles.input} />
                        <button className={styles.button} type="submit">Search</button>
                    </Form>
                </Formik>
                <Toaster />
            </div>
        </header>
    )
}