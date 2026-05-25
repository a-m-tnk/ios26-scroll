import styles from './ThemeWrapper.css';
import classnames from 'classnames';

type Options = {
    isDarkTheme?: boolean;
    withWhiteText?: boolean;
};

export const ThemeWrapper = (Component: any, options: Options = {}) => {
    const { isDarkTheme, withWhiteText } = options;

    return (props: any) => {
        return isDarkTheme ? (
            <div
                className={classnames(
                    styles.wrapperContainer,
                    { [styles.darkTheme]: isDarkTheme },
                    { [styles.whiteText]: withWhiteText },
                )}
            >
                <Component {...props} />
            </div>
        ) : (
            <Component {...props} />
        );
    };
};
