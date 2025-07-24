import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { SidebarPortal } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components';
import BlocksForm from '@plone/volto/components/manage/Blocks/Block/BlocksForm';
import { emptyBlocksForm } from '@plone/volto/helpers/Blocks/Blocks';
import {
  addBlock,
  changeBlock,
  deleteBlock,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
} from '@plone/volto/helpers/Blocks/Blocks';
import { readMoreSchema } from './schema';
import './styles.scss';

const ReadMoreEdit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    pathname,
    manage,
    selected,
    intl,
    blocksConfig,
    metadata,
    properties,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNestedBlock, setSelectedNestedBlock] = useState(null);

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

  // Create the nested form data following Volto patterns
  const nestedFormData = {
    blocks: blocks || {},
    blocks_layout: blocks_layout || { items: [] },
  };

  // Handle changes to the nested blocks form
  const handleNestedFormChange = (newFormData) => {
    // Ensure slate blocks have proper initialization
    Object.keys(newFormData.blocks || {}).forEach(blockId => {
      const blockData = newFormData.blocks[blockId];
      if (blockData['@type'] === 'slate' && !blockData.value) {
        newFormData.blocks[blockId] = {
          '@type': 'slate',
          value: [
            {
              type: 'p',
              children: [{ text: '' }],
            },
          ],
          plaintext: '',
        };
      }
    });
    
    onChangeBlock(block, {
      ...data,
      blocks: newFormData.blocks || {},
      blocks_layout: newFormData.blocks_layout || { items: [] },
    });
  };

  // Handle field changes (needed for slate blocks)
  const handleFieldChange = (fieldName, value) => {
    const newFormData = {
      ...nestedFormData,
      [fieldName]: value,
    };
    
    onChangeBlock(block, {
      ...data,
      blocks: newFormData.blocks || {},
      blocks_layout: newFormData.blocks_layout || { items: [] },
    });
  };

  // Handle adding new blocks
  const handleAddBlock = (blockType, index) => {
    const currentFormData = isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData;
    const newFormData = addBlock(currentFormData, blockType, index);
    handleNestedFormChange(newFormData);
    
    const newBlockId = newFormData.blocks_layout.items[index];
    setSelectedNestedBlock(newBlockId);
    
    return newBlockId;
  };

  // Handle block changes
  const handleChangeBlock = (blockId, blockData) => {
    const currentFormData = isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData;
    const newFormData = changeBlock(currentFormData, blockId, blockData);
    handleNestedFormChange(newFormData);
  };

  // Handle deleting blocks
  const handleDeleteBlock = (blockId) => {
    const currentFormData = isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData;
    const newFormData = deleteBlock(currentFormData, blockId);
    handleNestedFormChange(newFormData);
    
    if (selectedNestedBlock === blockId) {
      setSelectedNestedBlock(null);
    }
  };

  // Handle moving blocks
  const handleMoveBlock = (dragIndex, dropIndex) => {
    const currentFormData = isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData;
    const newFormData = moveBlock(currentFormData, dragIndex, dropIndex);
    handleNestedFormChange(newFormData);
  };

  // Handle mutating block types
  const handleMutateBlock = (blockId, value) => {
    const currentFormData = isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData;
    const newFormData = mutateBlock(currentFormData, blockId, value);
    handleNestedFormChange(newFormData);
  };

  // Handle focus navigation
  const handleFocusNextBlock = (blockId) => {
    const currentFormData = isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData;
    const nextId = nextBlockId(currentFormData, blockId);
    if (nextId) {
      setSelectedNestedBlock(nextId);
    }
  };

  const handleFocusPreviousBlock = (blockId) => {
    const currentFormData = isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData;
    const prevId = previousBlockId(currentFormData, blockId);
    if (prevId) {
      setSelectedNestedBlock(prevId);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderToggleElement = () => {
    const text = isExpanded ? readLessText : readMoreText;
    const alignmentClass = `read-more-toggle--${alignment}`;
    const widthClass = `read-more-toggle--${width}`;

    return (
      <div className={`read-more-toggle ${alignmentClass} ${widthClass}`}>
        <button
          className={displayStyle === 'button' ? 'read-more-button' : 'read-more-link'}
          onClick={toggleExpanded}
          type="button"
        >
          {text}
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={`block read-more ${selected ? 'selected' : ''}`}>
        <div className="read-more-preview-label">Preview:</div>
        <div className="read-more-preview">
          {renderToggleElement()}
          {isExpanded && (
            <div className="read-more-content">
              <div className="read-more-content-label">Content will be shown here when expanded</div>
            </div>
          )}
        </div>

        <div className="read-more-content-label">Collapsible Content:</div>
        <div className="read-more-content-edit">
          <BlocksForm
            title="Content blocks"
            description="Add the blocks that will be hidden/shown when users click the toggle"
            manage={manage}
            allowedBlocks={Object.keys(blocksConfig)}
            metadata={isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData}
            properties={isEmpty(nestedFormData.blocks) ? emptyBlocksForm() : nestedFormData}
            selectedBlock={selected ? selectedNestedBlock : null}
            onSelectBlock={(id) => setSelectedNestedBlock(id)}
            onChangeFormData={handleNestedFormChange}
            onChangeField={handleFieldChange}
            onAddBlock={handleAddBlock}
            onChangeBlock={handleChangeBlock}
            onDeleteBlock={handleDeleteBlock}
            onMoveBlock={handleMoveBlock}
            onMutateBlock={handleMutateBlock}
            onFocusNextBlock={handleFocusNextBlock}
            onFocusPreviousBlock={handleFocusPreviousBlock}
            pathname={pathname}
            blocksConfig={blocksConfig}
          />
        </div>
      </div>

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={readMoreSchema(intl)}
          title="Read More Settings"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

export default ReadMoreEdit;