import { Formik, Form, Field, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import css from "./SearchBar.module.css";

type Props = {
  onSubmit: (query: string) => void;
};

type FormValues = {
  query: string;
};

export default function SearchBar({ onSubmit }: Props) {
  const handleSubmit = (
    { query }: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter a search term.");
      return;
    }

    onSubmit(trimmedQuery);
    resetForm();
  };

  return (
    <header className={css.header}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.searchBox}>
            <button type="submit" className={css.searchButton}>
              <FiSearch className={css.icon} size={20} />
            </button>
            <Field
              name="query"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={css.input}
            />
          </div>
        </Form>
      </Formik>
    </header>
  );
}
