import type { FC } from 'react';
import React from 'react';

import type { GroupOption, SingleOption } from '@platform-ui/dropdown/types';

import styles from './DropdownListCustom.module.css';

interface DropdownListCustomProps {
    opened: boolean;
    minWidth?: number;
    maxHeight: number;
    options: GroupOption[];
    size?: 'm' | 'l';
    onOptionClick?: (e: React.MouseEvent, params: { value?: string | number; option: SingleOption }) => void;
}

export const DropdownListCustom: FC<DropdownListCustomProps> = ({
    maxHeight,
    options,
    size = 'l',
    onOptionClick,
}) => {
    const handleOptionClick = (e: React.MouseEvent, option: SingleOption) => {
        onOptionClick?.(e, { value: (option as any).value, option });
    };

    return (
        <div
            className={styles.dropdownList}
            style={{ maxHeight: `${maxHeight}px`, margin: '0 10px' }}
            data-qa-type="dropdownListCustom"
        >
            {options.map((group, groupIndex) => (
                <div key={group.title || groupIndex} className={styles.group}>
                    {group.title && <div data-attr="ant-group" className={styles.groupTitle} style={{ fontWeight: 'bold' }}>{group.title}</div>}
                    <div className={styles.groupContent}>
                        {group.options.map((option, optionIndex) => {
                            const typedOption = option as any;
                            const leftContent = typedOption.leftContent;
                            const rightContent = typedOption.rightContent;
                            const title = typedOption.title || typedOption.value;
                            const description = typedOption.description;

                            return (
                                <div
                                    key={typedOption.key || optionIndex}
                                    className={styles.item}
                                    onClick={(e) => handleOptionClick(e, option)}
                                    data-qa-type="dropdownListCustom.item"
                                >
                                    {leftContent && (
                                        <div className={styles.leftContent}>
                                            <span className={styles.icon}>{leftContent}</span>
                                        </div>
                                    )}
                                    <div className={styles.content}>
                                        {title && <div className={styles.title}>{title}</div>}
                                        {description && <div className={styles.description}>{description}</div>}
                                    </div>
                                    {rightContent && (
                                        <div
                                            className={styles.rightContent}
                                            data-qa-type="uikit/dropdown.item.rightContent"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (typeof rightContent === 'function') {
                                                    rightContent();
                                                }
                                            }}
                                        >
                                            {rightContent}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
