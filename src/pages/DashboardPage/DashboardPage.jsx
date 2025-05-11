import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import useMedia from '../../hooks/useMedia';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';
import ModalLogOut from '../../components/ModalLogOut/ModalLogOut';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';

import { getTransactions } from '../../redux/transactions/operations';
import { getTransactionsCategories } from '../../redux/statistics/operations';

import css from './DashboardPage.module.css';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();

    useEffect(() => {
        dispatch(getTransactionsCategories());
        dispatch(getTransactions());
    }, [dispatch]);

    return (
        <>
            <Header />
            <main>
                <section className={css.dashboardPage}>
                    <>
                        <div className={css.dashboardData}>
                            <div>
                                <div className={css.navigation}>
                                    <Navigation />
                                </div>
                                <div className={css.balance}>{!isMobile && <Balance />}</div>
                            </div>
                            <div className={css.currency}>{!isMobile && <Currency />}</div>
                        </div>
                        <Suspense fallback={<Loader />}>
                            <Outlet />
                        </Suspense>
                        <ModalLogOut />
                        <ModalEditTransaction />
                        <ModalAddTransaction />
                    </>
                </section>
            </main>
            <Toaster />
        </>
    );
};

export default DashboardPage;
