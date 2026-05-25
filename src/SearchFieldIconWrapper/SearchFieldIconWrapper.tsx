import { ReactNode, FC } from 'react';

import styles from './SearchFieldIconWrapper.css';

type IconWrapperProps = {
    children?: ReactNode;
};

export const SearchFieldIconWrapper: FC<IconWrapperProps> = ({ children }) => {
    return <span className={styles.root}>{children}</span>;
};
