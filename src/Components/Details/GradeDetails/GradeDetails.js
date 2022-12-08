import React from 'react';
import styles from './gradedetails.module.scss';

const GradeDetails = ({ grades, handleGrade = () => {} }) => {
    return (
        <>
        {grades.map(grade => 
            <div key={grade.title} onClick={() => handleGrade(grade.grade)} className={styles.flyoutlist}>
                <p>({grade.grade})</p>
                <p>{grade.title}</p>
            </div>
        )}
        </>
    );
};

export default GradeDetails;