import type { FC } from 'react';
import { useRef } from 'react';
import React from 'react';

import { DropdownList } from '@platform-ui/dropdown';
import type { SingleOption, Value } from '@platform-ui/dropdown/types';
import Input from '@platform-ui/input';
import type { InputOnCleanEvent } from '@platform-ui/input/types';
import { TuiIconTdsMediumMagnifier } from '@tui-react/proprietary-icons';

import { useInputLocation } from './hooks/useInputLocation';
import overrideStyles from './overrideDropdownStyles.css';
import { MobileExpandableField } from './MobileExpandableField/MobileExpandableField';
import { SearchFieldIconWrapper } from './SearchFieldIconWrapper/SearchFieldIconWrapper';

import { useLocationDropdownMaxHeight } from './hooks/useLocationDropdownMaxHeight';

import styles from './MobileInputLocation.css';

export const INPUT_LOCATION_PLACEHOLDER = 'Направление или отель';


const Placeholder = ({ isLoading, noResults }: { isLoading: boolean; noResults: boolean }) => {
    if (isLoading) {
        return (
            <div className={styles.loader}>
                SkeleTOP
            </div>
        );
    }
    if (noResults) {
        return <>NoResultsPlaceholder</>;
    }
    return null;
};

export const MobileInputLocation: FC<{
    onSelectSearchHistory?: (hash: number) => void;
    opened: boolean;
    setOpened: (open: boolean) => void;
}> = ({ onSelectSearchHistory, opened, setOpened }) => {
    const {
        searchValue,
        suggestions,
        noResults,
        error,
        isLoading,
        onChange,
        onOptionSelect,
        onBlur,
        onFocus,
        onClean,
    } = useInputLocation({ onSelectSearchHistory, open: opened, setOpen: setOpened });
    const inputRef = useRef<HTMLInputElement | null>(null);

    const dropdownMaxHeight = useLocationDropdownMaxHeight();

    const handleClick = () => {
        setOpened(true);
    };

    const handleFocus = () => {
        onFocus?.();
    };

    const handleClose = () => {
        // hotelSearchButtonCloseTap();
        onBlur?.();
        setOpened(false);
    };

    const handleOptionClick = (e: React.MouseEvent, params: { value?: Value; option: SingleOption }) => {
        const typedTarget = e?.target as HTMLElement;

        // Определяем, что кликнули на крестик в правой части опции
        const isDeleteClick = !!typedTarget && typedTarget.closest('[data-qa-type="uikit/dropdown.item.rightContent"]');

        // Делаем проверку аналогично тому, как это происходит в самом Dropdown, т.к. option может быть примитивом
        if (typeof params.option === 'object') {
            onOptionSelect();
        }
        if (!isDeleteClick) {
            setOpened(false);
        }
    };

    const handleClean = async (event: InputOnCleanEvent) => {
        event.stopPropagation();
        onClean?.();
        setOpened(true);
    };

    const leftContent = (
        <SearchFieldIconWrapper>
            <TuiIconTdsMediumMagnifier containerSize={24} />
        </SearchFieldIconWrapper>
    );

    return (
        <div className={styles.root}>
            <Input
                dataQaType="mobileInputLocation"
                ellipsis
                cleanable
                leftContent={leftContent}
                placeholder={INPUT_LOCATION_PLACEHOLDER}
                value={searchValue}
                error={!!error}
                onChange={onChange}
                onFocus={handleClick}
                onClean={handleClean}
                maxLength={50}
                refCallback={(ref) => {
                    inputRef.current = ref;
                }}
                variant="default"
            />

            <MobileExpandableField opened={opened} title={INPUT_LOCATION_PLACEHOLDER} onClose={handleClose}>
                <div className={styles.inputWrapper}>
                    <Input
                        dataQaType="mobileInputLocationExpandableField"
                        ellipsis
                        focused
                        leftContent={leftContent}
                        cleanable
                        autoFocus
                        placeholder={INPUT_LOCATION_PLACEHOLDER}
                        value={searchValue}
                        onChange={onChange}
                        onFocus={handleFocus}
                        onClean={onClean}
                        maxLength={50}
                    />
                </div>

                {!isLoading && !noResults && (
                    <DropdownList
                        opened
                        minWidth={325}
                        maxHeight={dropdownMaxHeight}
                        options={suggestions}
                        size="l"
                        onOptionClick={handleOptionClick}
                        // TODO: Секретный и ненадежный проп, удалить, когда появится альтернатива https://jira.tcsbank.ru/browse/UIKIT-4445
                        __overrideStyles={{
                            Dropdown: overrideStyles,
                        }}
                    />
                )}

                <Placeholder isLoading={isLoading} noResults={noResults && searchValue.length > 1} />
            </MobileExpandableField>
        </div>
    );
};