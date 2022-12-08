import React from 'react';
import Role from '../../../SharedUI/Community/Role/Role';
import styles from '../userpage.module.scss';

const Info = ({ userId = '', userRoles = [] }) => {
    return (
        <div className={styles.userinfo}>
            <div className={styles.userid}>
                <p>User Id:</p>
                <p>{userId}</p>
            </div>
            <div className={styles.roles}>
                <p>Roles:</p>
                <div className={styles.rolesaddition}>
                    {userRoles.map(role => <Role key={role} title={role} />)}
                </div>
            </div>
            <div className={styles.groups}>
                <p>Groups:</p>
                <p>Some groups</p>
            </div>
            <div className={styles.uploads}>
                <p>Uploads:</p>
                <p>4</p>
            </div>
        </div>
    );
};

export default Info;