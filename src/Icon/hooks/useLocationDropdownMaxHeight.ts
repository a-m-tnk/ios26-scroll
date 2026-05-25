import { useEffect, useMemo, useState } from 'react';

/**
 * Опытным путем вычисленное смещение которое надо вычесть от высоты шторки
 * чтобы дропдаун корректно встроился в шторку без появления второго скролла
 * (скролла от самой шторки)
 *
 * Формула: высота дропдауна = высота самой шторки - HEIGHT_OFFSET
 */
const HEIGHT_OFFSET = 136;

/**
 * Задержка для дебаунсинга событий focusin, focusout и resize,
 * чтобы избежать ложных срабатываний и частых обновлений состояния
 */
const KEYBOARD_EVENTS_TIME = 100;
/**
 * При focusout используется задержка в 300 мс,
 * потому что на некоторых устройствах клавиатура исчезает с небольшим опозданием.
 */
const HIDE_KEYBOARD_EVENT_TIME = 300;

/**
 * Хук отслеживает состояние клавиатуры на мобилке
 * @returns {boolean} keyboardOpen = true, если клавиатура открыта
 */
function useKeyboard(): boolean {
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        let timeout: any;
        let previousHeight = window.innerHeight;
        /** Порог в px для определения клавиатуры */
        const keyboardSizeThreshold = 100;

        const checkViewport = () => {
            const currentHeight = window.visualViewport?.height ?? window.innerHeight;
            const heightDiff = previousHeight - currentHeight;

            if (heightDiff > keyboardSizeThreshold && !keyboardOpen) {
                setKeyboardOpen(true);
            } else if (heightDiff < -keyboardSizeThreshold && keyboardOpen) {
                setKeyboardOpen(false);
            }

            previousHeight = currentHeight;
        };

        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(checkViewport, KEYBOARD_EVENTS_TIME);
        };

        const handleFocusIn = () => {
            clearTimeout(timeout);
            timeout = setTimeout(checkViewport, KEYBOARD_EVENTS_TIME);
        };

        const handleFocusOut = () => {
            clearTimeout(timeout);
            timeout = setTimeout(checkViewport, HIDE_KEYBOARD_EVENT_TIME);
        };

        // Используем visualViewport, если доступен
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        }

        // Резервный вариант
        window.addEventListener('resize', handleResize);
        /**
         * На практике focusin и focusout
         * оказались самым надежным способом определить открытие клавиатуры
         * потому что visualViewport resize срабатывает не всегда
         */
        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);

        // Инициализация при монтировании (на случай, если клавиатура уже открыта)
        checkViewport();

        // Очистка при размонтировании
        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleResize);
            }
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
            clearTimeout(timeout);
        };
    }, [keyboardOpen]); // Зависимость нужна, чтобы обновлять логику при смене состояния

    return keyboardOpen;
}

/**
 * Высота области скролла списка направлений
 * внутри шторки выбора направлений
 */
export const useLocationDropdownMaxHeight = () => {
    const [popupMobileHeight, setPopupMobileHeight] = useState(0);
    const dropdownMaxHeight = popupMobileHeight - HEIGHT_OFFSET;
    const keyboardOpen = useKeyboard();
    const memoizedKeyboardOpen = useMemo(() => keyboardOpen, [keyboardOpen]);

    useEffect(() => {
        /** Safari IOS не корректно рассчитывает высоту при открытии клавиатуры,
         * поэтому используем visualViewport.height вместо window.innerHeight
         */
        const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        setPopupMobileHeight(height);
    }, [memoizedKeyboardOpen]);

    return dropdownMaxHeight;
};
