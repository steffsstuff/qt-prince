# 🎲 Random Image Selector

A beautiful, responsive webpage that randomly selects and displays 3 images from a predefined collection, with the ability to click and select individual images.

## Features

- **Random Selection**: Click the button to get 3 random images
- **Image Selection**: Click on any displayed image to select it
- **Replacement Display**: Selected image replaces the entire 3-image section
- **Sampling Without Replacement**: Selected images are permanently removed from future selections
- **Beautiful UI**: Modern gradient background with glassmorphism effects
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Interactive Elements**: Hover effects, animations, and ripple effects
- **Image Information**: Each image comes with a title and description
- **Refresh Functionality**: Keep the same selection or get new random images
- **Smart Pool Management**: Tracks selected images and prevents duplicates

## How to Use

1. **Open the webpage**: Simply open `index.html` in your web browser
2. **Select Images**: Click the "Select Random Images" button to get 3 random images
3. **Choose Your Favorite**: Click on any of the 3 displayed images to select it
4. **View Selection**: Your selected image replaces the 3-image display entirely
5. **Continue Selecting**: The selected image is permanently removed from future selections
6. **Get New Images**: Click "Get New Random Images" to see 3 more random images
7. **Reset When Needed**: When all images are selected, use the reset button to start over

## How It Works

- **Image Pool**: The webpage maintains a pool of available images
- **Random Selection**: Each time you click "Select Random Images", 3 random images are chosen from the pool
- **Click to Select**: Clicking on an image replaces the entire 3-image display with your selection
- **Permanent Removal**: Once an image is selected, it's permanently removed from the pool (sampling without replacement)
- **Dynamic Button**: The button text changes to "Get New Random Images" after selection
- **Automatic Reset**: When all images are selected, you can reset to start fresh

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Adding Your Own Images

To use your own images instead of the sample ones:

1. **Replace the image URLs**: Edit the `imageCollection` array in `script.js`
2. **Update titles and descriptions**: Modify the title and description for each image
3. **Use local images**: Place your images in an `images/` folder and update the paths

Example:
```javascript
const imageCollection = [
    {
        src: 'images/my-photo-1.jpg',
        title: 'My Vacation Photo',
        description: 'A beautiful sunset from my recent trip.'
    },
    // ... more images
];
```

### Styling Changes

- **Colors**: Modify the CSS variables in `styles.css`
- **Layout**: Adjust the grid settings and spacing
- **Animations**: Customize the animation durations and effects
- **Selected Image Display**: Modify the styling of the selected image when it replaces the main display

## Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies required
- **Responsive Grid**: Uses CSS Grid for flexible layouts
- **Fisher-Yates Shuffle**: Implements a proper random selection algorithm
- **Pool Management**: Smart system that permanently removes selected images
- **Event Handling**: Click events for image selection with visual feedback
- **State Management**: Tracks whether showing 3 images or a selected image
- **Modern CSS**: Uses CSS Grid, Flexbox, and modern properties
- **Performance**: Images are loaded with lazy loading for better performance
- **Animations**: Smooth transitions and feedback animations

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## License

This project is open source and available under the MIT License.

---

**Enjoy your interactive random image selection experience! 🎉**
