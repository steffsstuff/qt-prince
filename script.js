// Sample image data - you can replace these with your own images
const imageCollection = [
    {
        src: './rooms/attic-e.png',
        cost: 3
    },
    {
        src: './rooms/bedroom-e.png',
        cost: 0
    },
    {
        src: './rooms/closet-n.png',
        cost: 0
    },
    {
        src: './rooms/diningroom-w.png',
        cost: 0
    },
    {
        src: './rooms/kitchen-w.png',
        cost: 1
    },
    {
        src: './rooms/lavatory-e.png',
        cost: 0
    },
    {
        src: './rooms/nook-e.png',
        cost: 0
    },
    {
        src: './rooms/parlor-n.png',
        cost: 0
    },
    {
        src: './rooms/guestbedroom-n.png',
        cost: 0
    }
];

// DOM elements
const selectImagesBtn = document.getElementById('selectImages');
const imageContainer = document.getElementById('imageContainer');

// Global variables
let currentPool = [...imageCollection]; // Copy of the original collection
let selectedImage = null;
let isInSelectionMode = true; // Track whether we're showing 3 images or a selected image
let currentDisplayedImages = []; // Track the currently displayed images

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to select random images from the current pool
function selectRandomImages() {
    if (currentPool.length === 0) {
        // If no images remain, show depleted message
        showPoolDepletedMessage();
        return [];
    }
    
    // If 3 or more images, select 3. If less than 3, select all remaining
    const numToSelect = Math.min(3, currentPool.length);
    const shuffled = shuffleArray(currentPool);
    return shuffled.slice(0, numToSelect);
}

// Function to reset the image pool
function resetImagePool() {
    currentPool = [...imageCollection];
    selectedImage = null;
    isInSelectionMode = true;
    currentDisplayedImages = [];
    
    // Remove any pool depleted message
    const poolMessage = document.querySelector('.pool-depleted-message');
    if (poolMessage) {
        poolMessage.remove();
    }
    
    // Show placeholder
    showPlaceholder();
}

// Function to show placeholder
function showPlaceholder() {
    imageContainer.innerHTML = `
        <div class="placeholder">
            
        </div>
    `;
}

// Function to create image card HTML with click functionality
function createImageCard(image, index) {
    const costHTML = image.cost > 0 ? `<p class="image-cost">Cost: ${image.cost} <img src="./rooms/gem.png" style='width:25px;height:25px;display:inline;'></p>` : '';
    return `
        <div class="image-card" data-index="${index}" onclick="selectImage(${index})">
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            ${costHTML}
        </div>
    `;
}

// Function to display images
function displayImages(images) {
    currentDisplayedImages = [...images]; // Store the currently displayed images
    
    // Update button text to show how many images are available
    if (images.length < 3) {
        selectImagesBtn.textContent = `${images.length} Image${images.length === 1 ? '' : 's'} Remaining`;
    } else {
        selectImagesBtn.textContent = 'Draft new rooms';
    }
    
    const imageCardsHTML = images.map((image, index) => createImageCard(image, index)).join('');
    imageContainer.innerHTML = imageCardsHTML;
}

// Function to handle image selection
function selectImage(index) {
    if (index >= 0 && index < currentDisplayedImages.length) {
        // Get the image data from the displayed images array
        const imageData = currentDisplayedImages[index];
        
        // Find and remove the selected image from the current pool
        const poolIndex = currentPool.findIndex(img => img.src === imageData.src);
        if (poolIndex !== -1) {
            currentPool.splice(poolIndex, 1);
        }
        
        // Store the selected image
        selectedImage = imageData;
        
        // Switch to selection mode
        isInSelectionMode = false;
        
        // Replace the entire image display with the selected image
        displaySelectedImageInMainContainer(imageData);
        
        // Add visual feedback
        showSelectionFeedback();
        
        // Update button text to reflect new state
        if (currentPool.length > 0) {
            selectImagesBtn.textContent = 'Draft new rooms';
        } else {
            selectImagesBtn.textContent = 'Reset Pool';
        }
    }
}

// Function to display the selected image in the main container (replacing the images)
function displaySelectedImageInMainContainer(imageData) {
    const selectedImageHTML = `
        <div class="selected-image-main">
            <div class="selected-image-card">
                <img src="${imageData.src}" alt="${imageData.title}">
            </div>
        </div>
    `;
    imageContainer.innerHTML = selectedImageHTML;
}

// Function to show selection feedback
function showSelectionFeedback() {
    // Add a temporary success message
    const successMsg = document.createElement('div');
    successMsg.textContent = 'Image selected! 🎉';
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => successMsg.remove(), 500);
    }, 2000);
}

// Function to show pool depleted message
function showPoolDepletedMessage() {
    // Remove any existing message first
    const existingMessage = document.querySelector('.pool-depleted-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = 'pool-depleted-message';
    message.innerHTML = `
        <div style="text-align: center; padding: 40px; color: white;">
            <h3>🎯 All images have been selected!</h3>
            <p style="margin: 20px 0;">You've gone through all the available images.</p>
            <button onclick="resetImagePool()" class="btn" style="margin-top: 10px;">Reset Pool & Start Over</button>
        </div>
    `;
    
    // Replace the image container content
    imageContainer.innerHTML = '';
    imageContainer.appendChild(message);
}

// Function to handle image selection button
function handleImageSelection() {
    if (isInSelectionMode) {
        // Normal mode: show random images
        const selectedImages = selectRandomImages();
        if (selectedImages.length > 0) {
            displayImages(selectedImages);
            
            // Add some visual feedback
            if (selectedImages.length === 3) {
                selectImagesBtn.textContent = 'Images Selected!';
                setTimeout(() => {
                    if (currentPool.length >= 3) {
                        selectImagesBtn.textContent = 'Draft new rooms';
                    } else {
                        selectImagesBtn.textContent = `${currentPool.length} Image${currentPool.length === 1 ? '' : 's'} Remaining`;
                    }
                }, 1500);
            }
        }
    } else {
        // Selection mode: get new random images (but not the selected one)
        if (currentPool.length > 0) {
            const newImages = selectRandomImages();
            displayImages(newImages);
            isInSelectionMode = true;
        } else {
            // No images left, show depleted message
            showPoolDepletedMessage();
        }
    }
}

// Event listeners
selectImagesBtn.addEventListener('click', handleImageSelection);

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .selected-image-main {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .pool-depleted-message {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.1);
        border-radius: 15px;
        padding: 60px;
        color: white;
        font-size: 1.3rem;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    }
`;
document.head.appendChild(style);
