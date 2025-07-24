import React, { useState } from 'react';
import { RenderBlocks } from '@plone/volto/components';
import './styles.scss';

const ReadMoreView = (props) => {
  const { data, ...rest } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const {
    readMoreText = 'Read more',
    readLessText = 'Read less',
    alignment = 'left',
    displayStyle = 'button',
    width = 'default',
    hideAfterClick = false,
    blocks = {},
    blocks_layout = { items: [] },
  } = data;

  const toggleExpanded = () => {
    if (hideAfterClick && !isExpanded) {
      // If hideAfterClick is enabled and we're expanding for the first time
      setIsExpanded(true);
      setIsHidden(true);
    } else if (!hideAfterClick) {
      // Normal toggle behavior
      setIsExpanded(!isExpanded);
    }
  };

  const renderToggleElement = () => {
    // Don't show button if it's hidden after click
    if (isHidden) return null;
    
    const text = isExpanded ? readLessText : readMoreText;
    const alignmentClass = `read-more-toggle--${alignment}`;
    const widthClass = `read-more-toggle--${width}`;

    return (
      <div className={`read-more-toggle ${alignmentClass} ${widthClass}`}>
        <button
          className={displayStyle === 'button' ? 'read-more-button' : 'read-more-link'}
          onClick={toggleExpanded}
          type="button"
          aria-expanded={isExpanded}
          aria-controls="read-more-content"
        >
          {text}
        </button>
      </div>
    );
  };

  // Don't render anything if there's no content
  if (!blocks || Object.keys(blocks).length === 0) {
    return null;
  }

  return (
    <div className="block read-more">
      {renderToggleElement()}
      {isExpanded && (
        <div 
          className="read-more-content"
          id="read-more-content"
          role="region"
          aria-live="polite"
        >
          <RenderBlocks
            {...rest}
            content={{ blocks, blocks_layout }}
          />
        </div>
      )}
    </div>
  );
};

export default ReadMoreView;