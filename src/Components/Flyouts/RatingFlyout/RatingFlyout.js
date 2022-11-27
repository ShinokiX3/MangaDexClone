import React from 'react';
import styles from './ratingflyout.module.scss';

const Rate = ({ rate }) => {
    return (
        <tr className={styles.rate}>
            <td className={styles.grade}>{rate.grade}</td>
            <td className={styles.linewrapp}>
                <span className={styles.line} style={{width: `${rate.percentage}%`}}></span>
            </td>
            <td className={styles.amount}>({rate.value})</td>
        </tr> 
    )
}

const RatingFlyout = ({ distribution }) => {
    const rates = [];
    let amount = 0;

    for (let key in distribution) {
        amount += distribution[key];
    }

    for (let key in distribution) {
        rates.push({grade: key, value: distribution[key], percentage: distribution[key] / amount * 100 });
    }

    return (
        <table>
            <tbody>
                {rates.reverse().map(rate => <Rate key={rate.grade} rate={rate} />)}
            </tbody>
        </table>
    );
};

export default RatingFlyout;