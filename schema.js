import { defineMessages } from 'react-intl';

const messages = defineMessages({
  readMore: {
    id: 'Read more',
    defaultMessage: 'Read more',
  },
  readLess: {
    id: 'Read less',
    defaultMessage: 'Read less',
  },
  readMoreBlock: {
    id: 'Read More Block',
    defaultMessage: 'Read More',
  },
  readMoreText: {
    id: 'Read More Text',
    defaultMessage: 'Read More Text',
  },
  readLessText: {
    id: 'Read Less Text',
    defaultMessage: 'Read Less Text',
  },
  alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  displayStyle: {
    id: 'Display Style',
    defaultMessage: 'Display Style',
  },
  width: {
    id: 'Width',
    defaultMessage: 'Width',
  },
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  button: {
    id: 'Button',
    defaultMessage: 'Button',
  },
  link: {
    id: 'Plain Link',
    defaultMessage: 'Plain Link',
  },
  wide: {
    id: 'Wide',
    defaultMessage: 'Wide',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  narrow: {
    id: 'Narrow',
    defaultMessage: 'Narrow',
  },
  hideAfterClick: {
    id: 'Hide button after click',
    defaultMessage: 'Hide button after click',
  },
  hideAfterClickDescription: {
    id: 'When enabled, the button will disappear permanently after being clicked once',
    defaultMessage: 'When enabled, the button will disappear permanently after being clicked once',
  },
});

export const readMoreSchema = (intl) => {
  // Provide fallback if intl is undefined
  const formatMessage = intl?.formatMessage || ((msg) => msg.defaultMessage);
  
  return {
    title: formatMessage(messages.readMoreBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['readMoreText', 'readLessText', 'alignment', 'displayStyle', 'width', 'hideAfterClick'],
      },
    ],
    properties: {
      readMoreText: {
        title: formatMessage(messages.readMoreText),
        type: 'string',
        default: formatMessage(messages.readMore),
      },
      readLessText: {
        title: formatMessage(messages.readLessText),
        type: 'string',
        default: formatMessage(messages.readLess),
      },
      alignment: {
        title: formatMessage(messages.alignment),
        type: 'string',
        factory: 'Choice',
        default: 'left',
        choices: [
          ['left', formatMessage(messages.left)],
          ['center', formatMessage(messages.center)],
          ['right', formatMessage(messages.right)],
        ],
      },
      displayStyle: {
        title: formatMessage(messages.displayStyle),
        type: 'string',
        factory: 'Choice',
        default: 'button',
        choices: [
          ['button', formatMessage(messages.button)],
          ['link', formatMessage(messages.link)],
        ],
      },
      width: {
        title: formatMessage(messages.width),
        type: 'string',
        factory: 'Choice',
        default: 'default',
        choices: [
          ['narrow', formatMessage(messages.narrow)],
          ['default', formatMessage(messages.default)],
          ['wide', formatMessage(messages.wide)],
        ],
      },
      hideAfterClick: {
        title: formatMessage(messages.hideAfterClick),
        description: formatMessage(messages.hideAfterClickDescription),
        type: 'boolean',
        default: false,
      },
    },
    required: [],
  };
};