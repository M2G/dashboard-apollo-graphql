/*eslint-disable*/
import getRandomId from 'utils/general';

export const actions = [
    {
        label: 'click',
        icon: 'pencil',
        action: () => {},
        id: getRandomId(),
    },
    {
        label: 'comment',
        icon: 'comment-text',
        action: () => {},
        id: getRandomId(),
    },
    {
        label: 'open in new',
        icon: 'open-in-new',
        action: () => {},
        id: getRandomId(),
    },
];

export const moreActions = [
    ...actions,
    {
        label: 'stop',
        icon: 'square',
        action: () => {},
        id: getRandomId(),
    },
    {
        label: 'delete',
        icon: 'trash',
        iconType: 'dripicons',
        action: () => {},
        id: getRandomId(),
    },
    {
        label: 'yolo',
        icon: 'plus',
        action: () => {},
        id: getRandomId(),
    },
];
