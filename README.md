# Read More Block for Volto

A Volto block that allows editors to create collapsible content sections with customizable toggle buttons. Perfect for creating progressive disclosure interfaces, reducing page clutter, and improving user experience.

## ⚠️ Known Limitation - Text Blocks

**Important**: This block has a known limitation with text blocks. While text blocks can be added and edited, they have reduced functionality:

- ❌ **Enter key doesn't create new paragraphs/blocks** as expected
- ❌ **Copy/paste operations** don't work normally  
- ❌ **Sidebar doesn't show** full text block configuration options
- ❌ **Advanced text editing features** are limited

**Workarounds**:
- Use **HTML blocks** for rich text content instead
- Use **other block types** which work perfectly (images, videos, accordions, etc.)
- Keep text editing simple within text blocks

*This is a technical limitation with how nested BlocksForm components interact with slate text editors. We're actively investigating solutions for future versions.*

## Features

- **Expandable content**: Hide and show content sections with a single click
- **Nested blocks support**: Add any Volto blocks (images, videos, accordions, etc.) inside the collapsible area
- **Customizable toggle**: Configure button text, style, alignment, and width
- **Two behavior modes**: Standard toggle or one-time reveal (hide button after click)
- **Standard Volto interface**: Familiar editing experience using BlocksForm
- **Responsive design**: Works seamlessly on all device sizes
- **Accessibility features**: Proper ARIA attributes and keyboard support
- **Smooth animations**: CSS transitions for expand/collapse actions

## Installation

1. **Add the files** to your Volto project in `src/components/Blocks/ReadMore/`:
   - `Edit.jsx`
   - `View.jsx` 
   - `schema.js`
   - `index.js`
   - `styles.scss`

2. **Register the block** in your `src/index.js`:
   ```javascript
   import showSVG from '@plone/volto/icons/show.svg';
   import { Edit as ReadMoreEdit, View as ReadMoreView } from './components/Blocks/ReadMore';

   const applyConfig = (config) => {
     config.blocks.blocksConfig.readMore = {
       id: 'readMore',
       title: 'Read More',
       icon: showSVG,
       group: 'common',
       view: ReadMoreView,
       edit: ReadMoreEdit,
       restricted: false,
       mostUsed: false,
       sidebarTab: 1,
     };

     return config;
   };
   ```

## Usage

1. Add a "Read More" block to your page
2. Click the + button to add content blocks inside the collapsible area
3. Configure the toggle button appearance and behavior in the sidebar
4. Preview the expand/collapse functionality in the edit preview section

## Configuration Options

### Content
- **Read More Text**: Text displayed on the button when content is collapsed (default: "Read more")
- **Read Less Text**: Text displayed on the button when content is expanded (default: "Read less")

### Appearance
- **Alignment**: Position the toggle button (Left, Center, Right)
- **Display Style**: Button appearance (Button style or Plain link)
- **Width**: Container width (Narrow, Default, Wide) using Volto's standard container widths

### Behavior
- **Hide button after click**: When enabled, button disappears permanently after first click instead of toggling

## Supported Content

### ✅ Fully Working Block Types
- **Images**: Complete functionality with all editing features
- **Videos**: Full media player capabilities
- **Accordions**: Nested collapsible sections work perfectly
- **Tables**: Complete table editing and formatting
- **HTML blocks**: Full custom HTML content editing
- **Listing blocks**: Dynamic content lists
- **Maps**: Interactive map components
- **All other standard Volto blocks**: Work as expected

### ⚠️ Limited Functionality
- **Text blocks**: Basic text input/editing works, but advanced features are limited (see limitation note above)

## Technical Details

- Uses Volto's standard `BlocksForm` component for nested block management
- Follows established Volto patterns for container blocks
- Proper block data structure with `blocks` and `blocks_layout` fields
- CSS custom properties for responsive width control
- Accessibility compliant with ARIA labels and keyboard navigation
- Smooth CSS animations for expand/collapse transitions
- No external dependencies - pure Volto implementation

## Version 1.0 - Production Ready

This version is stable and production-ready with the documented text block limitation. The block provides significant value for:

- **Marketing pages**: Progressive content disclosure
- **FAQ sections**: Collapsible question/answer pairs
- **Product descriptions**: Expandable feature details
- **News articles**: "Read more" functionality
- **Documentation**: Collapsible sections

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Keyboard navigation support
- Screen reader compatible

## Contributing

We welcome contributions! Areas where help is especially needed:

1. **Text block integration**: Resolving the nested BlocksForm + slate editor context issues
2. **Performance optimizations**: Large content areas
3. **Additional styling options**: Theme integration
4. **Accessibility improvements**: Enhanced screen reader support

## License

This block follows standard Volto licensing and is compatible with Plone's open-source ecosystem.

---

**Version**: 1.0  
**Volto Compatibility**: 16.0+  
**Status**: Production Ready (with documented limitations)
