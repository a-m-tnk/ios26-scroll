import { DropdownItemProps } from '@platform-ui/dropdown';
import { GroupOption } from '@platform-ui/dropdown/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@tui-react-mobile/avatar';
import { state } from './state';
import type { MediumContainerProps } from '@platform-ui/icon';
import identity from '@tinkoff/utils/function/identity';


import {
    TuiIconTdsMediumAirplane as AirplaneIcon,
    TuiIconTdsMediumTransportBus as BusIcon,
    TuiIconTdsMediumSignHotel as HotelIcon,
    TuiIconTdsMediumPinGeo as PlaceIcon,
    TuiIconTdsMediumGlobe as PlanetIcon,
    TuiIconTdsMediumTransportTrain as TrainIcon,
    TuiIconTdsMediumClock as ClockIcon,
} from '@tui-react/proprietary-icons';

export enum LocationTypeCode {
    Unspecified = 'unspecified',
    Airport = 'airport',
    BusStation = 'bus_station',
    City = 'city',
    Continent = 'continent',
    Country = 'country',
    District = 'district',
    Hotel = 'hotel',
    Landmark = 'landmark',
    Province = 'province',
    RailwayStation = 'railway_station',
    Street = 'street',
    Subway = 'subway',
}

export const placeTypeIconMap: Record<LocationTypeCode, (props: MediumContainerProps) => JSX.Element> = {
    [LocationTypeCode.Airport]: AirplaneIcon,
    [LocationTypeCode.BusStation]: BusIcon,
    [LocationTypeCode.Continent]: PlanetIcon,
    [LocationTypeCode.Hotel]: HotelIcon,
    [LocationTypeCode.RailwayStation]: TrainIcon,
    [LocationTypeCode.Subway]: TrainIcon,
    [LocationTypeCode.City]: PlaceIcon,
    [LocationTypeCode.Country]: PlaceIcon,
    [LocationTypeCode.District]: PlaceIcon,
    [LocationTypeCode.Landmark]: PlaceIcon,
    [LocationTypeCode.Province]: PlaceIcon,
    [LocationTypeCode.Street]: PlaceIcon,
    [LocationTypeCode.Unspecified]: PlaceIcon,
};

export const compileSearchHistoryDescription = (lastSearch: any): string => {
    const dateDescription = 'xxx';

    return `${dateDescription} • yyy`;
};

export interface LocationOption extends DropdownItemProps {
    code: LocationTypeCode;
    /** Идентификатор локации — заполняется только для истории поиска, т.к. key там содержит hash, а не id */
    locationId?: number;
}

type Props = {
    onSelectSearchHistory?: (selectedHistoryItemHash: number) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export const useInputLocation = ({ onSelectSearchHistory, open, setOpen }: Props) => {
    const { locationField, searchHistory, popularDestinations } = state;
        const { suggestedItems,  value: locationKey } = locationField;

        const iconBackgroundColor = '#c7c9cc';

    const searchHistoryItems: LocationOption[] | undefined = searchHistory?.map((historyItem, index) => {
        return {
            key: historyItem.hash,
            value: historyItem.location.searchValue,
            title: historyItem.location.searchValue,
            closeOnSelect: false,
            role: 'historyItem',
            description: compileSearchHistoryDescription(historyItem),
            leftContent: <Icon backgroundColor={iconBackgroundColor} square icon={ClockIcon} size="s" />,
            rightContent: <>X</>,
            code: LocationTypeCode.City,
            lazy: false,
            autocompleteGroupType: 'searchHistory',
            groupItemIndex: index,
            locationId: Number(historyItem.location.value),
        };
    });

    const popularDestinationsSuggests: LocationOption[] | undefined = popularDestinations
        ? (popularDestinations
              .map(({ id, type, name, signature }, index) => {
                  // остаются только сажесты с полноценными данными
                  if (!id || !type || !signature || !name) {
                      return;
                  }
                  return {
                      key: Number(id),
                      value: name,
                      title: name,
                      role: 'popularSuggests',
                      description: signature,
                      leftContent: (
                          <Icon
                              backgroundColor={iconBackgroundColor}
                              square
                              icon={placeTypeIconMap[type?.code as LocationTypeCode]}
                              size="s"
                          />
                      ),
                      code: type.code,
                      lazy: false,
                      autocompleteGroupType: 'popular_suggest',
                      groupItemIndex: index,
                  };
              })
              .filter(identity) as LocationOption[])
        : undefined;

    const locations: LocationOption[] | undefined = suggestedItems?.locations?.map(
        ({ id, name, signature, type }, index) => {
            return {
                key: id,
                value: name as string,
                title: name,
                description: signature,
                leftContent: (
                    <Icon
                        backgroundColor={iconBackgroundColor}
                        square
                        icon={placeTypeIconMap[type?.code as LocationTypeCode]}
                        size="s"
                    />
                ),
                code: type?.code as LocationTypeCode,
                lazy: false,
                autocompleteGroupType: 'locations',
                groupItemIndex: index,
            };
        },
    );
    const hotels: LocationOption[] | undefined = suggestedItems?.hotels?.map(({ id, name, signature, type }, index) => {
        return {
            key: id,
            value: name as string,
            title: name,
            description: signature,
            leftContent: (
                <Icon
                    backgroundColor={iconBackgroundColor}
                    square
                    icon={placeTypeIconMap[type?.code as LocationTypeCode]}
                    size="s"
                />
            ),
            code: type?.code as LocationTypeCode,
            lazy: false,
            autocompleteGroupType: 'hotels',
            groupItemIndex: index,
        };
    });

    const suggestions: GroupOption[] = [];


    searchHistoryItems?.length &&
        suggestions.push({
            title: 'Вы искали',
            options: searchHistoryItems ?? [],
        });
    popularDestinationsSuggests?.length && suggestions.push({ title: 'Популярные направления', options: popularDestinationsSuggests });
    locations &&
        suggestions.push({
            title: 'Направления',
            options: locations ?? [],
        });
    hotels &&
        suggestions.push({
            title: 'Отели',
            options: hotels ?? [],
        });


    return {
        searchValue: 'Moskwa',
        suggestions,
        open,
        setOpen,
        noResults: false,
        error: undefined,
        isLoading: false,
        onChange: () => {},
        onOptionSelect: () => {},
        onBlur: () => {},
        onClean: () => {},
        onFocus: () => {},
    };
};
