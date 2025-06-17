import css from "./Loader.module.css";
import { DotLoader } from "react-spinners";

type Props = {
  loading: boolean;
};

export default function Loader({ loading }: Props) {
  return (
    <div className={css.load}>
      <DotLoader
        loading={loading}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
