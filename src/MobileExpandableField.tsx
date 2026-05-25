import type { FC, PropsWithChildren, ReactNode } from 'react';
import { useEffect, useRef, useMemo } from 'react';

import { DialogLayoutMobile } from '@tui-react/dialog-layout';
import type { ModalProps } from '@tui-react/modal';
import { Modal } from '@tui-react/modal';
import TuiIconTdsServiceCross from '@tui-react/proprietary-icons/dist/svg/tuiIconTdsServiceCross.svg';

import { Icon } from './Icon/Icon';
import { ThemeWrapper } from './ThemeWrapper/ThemeWrapper';
import { useIOSScrollReset } from './hooks/useIOSScrollReset';

import styles from './MobileExpandableField.css';
import classnames from 'classnames';

export const Z_INDEX_OF_LAYER_ABOVE_CHAT = 2200;


type OverlayContentProps = {
    isDarkTheme: boolean;
    onClose: () => void;
    title: string;
    footer?: ReactNode;
};

const MobileLayout: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <DialogLayoutMobile dataQaType="mobileExpandableField.dialogLayout">
            <DialogLayoutMobile.Content dataQaType="mobileExpandableField.content">
                {children}
            </DialogLayoutMobile.Content>
        </DialogLayoutMobile>
    );
};

const MobileModal = ({
    disableAnimation,
    open,
    disableScroll,
    children,
}: PropsWithChildren<ModalProps> & { disableAnimation?: boolean }) => {
    return (
        <Modal open={open} disableScroll={disableScroll}>
            <Modal.Content
                dataQaType="mobileExpandableField"
                disableAnimation={disableAnimation}
                size="fullscreen"
                /** В открытом состоянии компонент должен перекрывать кнопку открытия чата */
                zIndex={Z_INDEX_OF_LAYER_ABOVE_CHAT}
                className={styles.modalContentSafePadding}
            >
                <MobileLayout>{children}</MobileLayout>
            </Modal.Content>
        </Modal>
    );
};

const OverlayContent: FC<PropsWithChildren<OverlayContentProps>> = ({
    isDarkTheme,
    onClose,
    title,
    footer,
    children,
}) => (
    <div
        className={classnames(styles.container, { [styles.darkTheme]: isDarkTheme })}
        data-qa-type="mobileExpandableField.container"
    >
        <div className={styles.headerWrapper}>
            <div className={styles.cross}>
                <Icon dataQaType="cross" icon={TuiIconTdsServiceCross} iconSize={24} onClick={onClose} />
            </div>
            <div className={styles.headerTitle}>{title}</div>
        </div>
        <div className={styles.contentWrapper} data-qa-type="mobileGuestsInput">
            {children}
        </div>
        {footer && <div className={styles.footerWrapper}>{footer}</div>}
    </div>
);

export const MobileExpandableField: FC<PropsWithChildren<MobileExpandableFieldProps>> = ({
    opened,
    title,
    footer,
    onClose,
    children,
}) => {
    const ref = useRef<HTMLElement>();
    const disableAnimation = false;
    const isDarkTheme = false;
    // iOS Safari некорректно сбрасывает скролл при открытии Overlay.
    // В MobileExpandableField вместо шторки используется Overlay,
    // поэтому при открытии принудительно сбрасываем скролл в 0.
    useIOSScrollReset(opened);

    useEffect(() => {
        ref.current = document.body;
    }, []);

    useEffect(() => {
        const payload = {
            type: 'hotels/modalStateChange',
            opened,
        };

        window.parent.postMessage(payload, window.origin);
    }, [opened]);

    const ThemedOverlayContent = useMemo(
        () =>
            ThemeWrapper((props: OverlayContentProps) => <OverlayContent {...props} />, {
                isDarkTheme,
            }),
        [isDarkTheme],
    );

    return (
        <MobileModal disableScroll disableAnimation={disableAnimation} open={opened}>
            <ThemedOverlayContent isDarkTheme={isDarkTheme} onClose={onClose} title={title} footer={footer}>
                {children}
            </ThemedOverlayContent>
        </MobileModal>
    );
};

type MobileExpandableFieldProps = {
    opened: boolean;
    title: string;
    footer?: ReactNode;
    onClose: () => void;
};
