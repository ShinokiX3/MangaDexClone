import FilterItems from '../../../SharedUI/Filter/FilterItems';
import { strToUpper } from '../../../Utils/stringToUpperCase';
import styles from './filter-titles.module.scss';

const Tags = ({ tags = [], isFlexBox = false }) => {
    return (
        <div className={styles.tags} style={isFlexBox ? {display: 'flex'} : {}} >
            {tags.map(tag => {
                return (
                    <div className={styles.tag}>
                        <h3>{strToUpper(tag.type)}</h3>
                        <FilterItems items={tag.tags} isSpecific={isFlexBox} />
                    </div>
                )
            })}
        </div>
    )
}

export default Tags;