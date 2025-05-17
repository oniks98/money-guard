import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
    return (
        <div className={css.loaderBackdrop}>
            <div className={css.spinnerWrapper}>
                <RotatingLines strokeColor="lavender" strokeWidth="4" animationDuration="0.8" width="96" visible={true} />
            </div>
        </div>
    );
};

export default Loader;
