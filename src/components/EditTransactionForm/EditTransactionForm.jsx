import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

import { selectCategories } from '../../redux/statistics/selectors';
import { selectCurrentTransaction } from '../../redux/transactions/selectors';
import { editTransactions } from '../../redux/transactions/operations';
import { closeModal } from '../../redux/modals/slice';

import CustomIconForCalendar from '../AddTransactionForm/CustomIconForCalendar';
import { showToast } from '../CustomToaster/CustomToaster';
import FormButton from '../FormButton/FormButton';
import { validationEditTransaction } from '../../validations/validateForms';

import 'react-datepicker/dist/react-datepicker.css';
import css from './EditTransactionForm.module.css';

const EditTransactionForm = () => {
    const dispatch = useDispatch();
    const { transaction } = useSelector(selectCurrentTransaction);
    const categories = useSelector(selectCategories);
    const [startDate, setStartDate] = useState(new Date(transaction.date));

    if (!transaction) return null;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            amount: Math.abs(transaction.amount),
            comment: transaction.comment,
        },
        resolver: yupResolver(validationEditTransaction),
    });

    const onSubmit = data => {
        const updatedTransaction = {
            date: startDate.toISOString(),
            comment: data.comment,
            amount: parseFloat(data.amount),
            type: transaction.type,
            categoryId: transaction.categoryId,
        };

        dispatch(editTransactions({ id: transaction._id, updatedTransaction }))
            .unwrap()
            .then(() => dispatch(closeModal()))
            .catch(error => {
                showToast('error', 'Please try again.');
            });
    };

    const currentCategory = categories.data?.find(cat => cat.id === transaction.categoryId)?.name;

    return (
        <div className={css.modal}>
            <div className={css.header}>
                <h2 className={css.title}>Edit transaction</h2>
                <p className={css.toggleRow}>
                    <span className={`${css.toggle} ${transaction.type === 'INCOME' ? css.activeToggle : css.inactiveToggle}`}>Income</span>/
                    <span className={`${css.toggle} ${transaction.type === 'EXPENSE' ? css.activeToggle : css.inactiveToggle}`}>Expense</span>
                </p>
            </div>
            {transaction.type === 'EXPENSE' && <p className={currentCategory ? css.categoryLabel : css.categoryLabelEmpty}>{currentCategory}</p>}
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={css.twoInput}>
                    <div className={css.errorField}>
                        <input type="number" step="0.01" placeholder="0.00" className={css.numInput} {...register('amount')} />
                        {errors.amount && <span className={css.message}>{errors.amount.message}</span>}
                    </div>
                    <Controller
                        control={control}
                        name="date"
                        render={() => (
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                calendarStartDay={1}
                                dateFormat="dd.MM.yyyy"
                                maxDate={new Date()}
                                customInput={<CustomIconForCalendar />}
                            />
                        )}
                    />
                </div>
                <div className={css.errorField}>
                    <input type="text" placeholder="Comment" className={css.textInput} {...register('comment')} />
                    {errors.comment && <span className={css.message}>{errors.comment.message}</span>}
                </div>
                <div className={css.buttonsWrapper}>
                    <FormButton type={'submit'} text={'Save'} variant={'multiColorButton'} />
                    <FormButton type={'button'} text={'cancel'} variant={'whiteButton'} handlerFunction={() => dispatch(closeModal())} />
                </div>
            </form>
        </div>
    );
};

export default EditTransactionForm;
