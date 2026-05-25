import { useEffect } from 'react';

import { useIsIOS } from './useIsIOS';

/**
 * Сбрасывает позицию скролла на iOS устройствах при срабатывании триггера
 * @param trigger - булево значение, при true сбрасывает скролл
 */
export const useIOSScrollReset = (trigger: boolean) => {
    const isIOS = useIsIOS();

    // Сбрасываем позицию скролла на iOS при открытии клавиатуры
    useEffect(() => {
        if (trigger && isIOS) {
            const resetScroll = () => {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            };

            resetScroll();
            const timer = setTimeout(resetScroll, 50);

            return () => clearTimeout(timer);
        }
    }, [trigger]);
};
