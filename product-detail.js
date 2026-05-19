// Product Detail Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  initializeProductDetail()
  initializeTabs()
  initializeOptions()
  initializePurchaseButtons()
  initializeImageGallery()
})

// Initialize product detail functionality
function initializeProductDetail() {
  // Initialize wishlist button
  const wishlistBtn = document.querySelector(".wishlist-btn-detail")
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      const isWishlisted = wishlistBtn.textContent === "♥"
      wishlistBtn.textContent = isWishlisted ? "♡" : "♥"
      showNotification(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "success")
    })
  }
}

// Initialize image gallery - Fixed
function initializeImageGallery() {
  const thumbnails = document.querySelectorAll(".thumbnail")
  const mainImage = document.getElementById("mainImage")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"))
      // Add active class to clicked thumbnail
      thumbnail.classList.add("active")
      // Update main image
      if (mainImage) {
        mainImage.src = thumbnail.src
        mainImage.alt = thumbnail.alt
      }
    })
  })
}

// Initialize tabs functionality - Fixed
function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab

      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      btn.classList.add("active")
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })
}

// Initialize product options (flavor, size) - Fixed
function initializeOptions() {
  // Initialize flavor options
  const flavorBtns = document.querySelectorAll(".flavor-options .option-btn")
  flavorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all flavor buttons
      flavorBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      showNotification(`Selected flavor: ${btn.textContent}`, "info")
    })
  })

  // Initialize size options
  const sizeBtns = document.querySelectorAll(".size-options .option-btn")
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all size buttons
      sizeBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      // Update price based on size selection
      updatePriceBasedOnSize(btn.dataset.size || btn.textContent)
      showNotification(`Selected size: ${btn.textContent}`, "info")
    })
  })
}

// Update price based on size selection
function updatePriceBasedOnSize(size) {
  const currentPriceElement = document.querySelector(".current-price")
  const mrpPriceElement = document.querySelector(".mrp-price")

  // Price mapping based on size
  const priceMap = {
    "152g": { current: "₹ 1,200", mrp: "₹1,400" },
    "454g": { current: "₹ 3,000", mrp: "₹3,549" },
    "907g": { current: "₹ 8,700", mrp: "₹10,249" },
    "2.27kg": { current: "₹ 16,600", mrp: "₹19,549" },
    "1.7kg": { current: "₹ 12,500", mrp: "₹14,699" },
    "4kg": { current: "₹ 25,000", mrp: "₹29,499" },
    "152 g (5.36 oz)": { current: "₹ 1,200", mrp: "₹1,400" },
    "454 g (1 lbs)": { current: "₹ 3,000", mrp: "₹3,549" },
    "907 g (2 lbs)": { current: "₹ 8,700", mrp: "₹10,249" },
    "2.27 kg (5 lbs)": { current: "₹ 16,600", mrp: "₹19,549" },
    "1.7 kg (3.7 lbs)": { current: "₹ 12,500", mrp: "₹14,699" },
    "4 kg (8.8 lbs)": { current: "₹ 25,000", mrp: "₹29,499" },
  }

  if (priceMap[size]) {
    if (currentPriceElement) {
      currentPriceElement.textContent = priceMap[size].current
    }
    if (mrpPriceElement) {
      mrpPriceElement.textContent = priceMap[size].mrp
    }
  }
}

// Quantity controls
function increaseQuantity() {
  const quantityInput = document.getElementById("quantity")
  if (quantityInput) {
    const currentValue = Number.parseInt(quantityInput.value)
    const maxValue = Number.parseInt(quantityInput.max) || 10

    if (currentValue < maxValue) {
      quantityInput.value = currentValue + 1
    }
  }
}

function decreaseQuantity() {
  const quantityInput = document.getElementById("quantity")
  if (quantityInput) {
    const currentValue = Number.parseInt(quantityInput.value)
    const minValue = Number.parseInt(quantityInput.min) || 1

    if (currentValue > minValue) {
      quantityInput.value = currentValue - 1
    }
  }
}

// Initialize purchase buttons
function initializePurchaseButtons() {
  const addToCartBtn = document.querySelector(".add-to-cart-btn")
  const buyNowBtn = document.querySelector(".buy-now-btn")

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const productData = getSelectedProductData()
      showNotification(`Added ${productData.quantity}x ${productData.name} to cart!`, "success")
    })
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const productData = getSelectedProductData()

      // Create checkout URL with product data
      const checkoutURL = `checkout.html?product=${encodeURIComponent(productData.name)}&price=${productData.price}&image=${encodeURIComponent(productData.image)}&quantity=${productData.quantity}&flavor=${encodeURIComponent(productData.flavor)}&size=${encodeURIComponent(productData.size)}`

      showNotification(`Proceeding to checkout with ${productData.quantity}x ${productData.name}`, "success")

      // Redirect to checkout after a short delay
      setTimeout(() => {
        window.location.href = checkoutURL
      }, 1000)
    })
  }
}

// Get selected product data
function getSelectedProductData() {
  const productName = document.querySelector(".product-title")?.textContent || "Anabolic Iso+Hydro Chocolate"
  const selectedFlavor =
    document.querySelector(".flavor-options .option-btn.active")?.textContent || "Double Rich Chocolate"
  const selectedSize = document.querySelector(".size-options .option-btn.active")?.textContent || "907 g (2 lbs)"
  const currentPrice =
    document
      .querySelector(".current-price")
      ?.textContent.replace(/[₹,\s]/g, "")
      .match(/\d+/)?.[0] || "8700"
  const quantity = document.getElementById("quantity")?.value || "1"
  const productImage = document.getElementById("mainImage")?.src || "images/product1.jpg"

  return {
    name: `${productName} | ${selectedFlavor} | ${selectedSize}`,
    price: currentPrice,
    image: productImage,
    quantity: quantity,
    flavor: selectedFlavor,
    size: selectedSize,
  }
}

// Utility function for notifications
function showNotification(message, type = "info") {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    wordWrap: "break-word",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  })

  // Set background color based on type
  const colors = {
    success: "#4caf50",
    error: "#f44336",
    info: "#2196f3",
    warning: "#ff9800",
  }
  notification.style.backgroundColor = colors[type] || colors.info

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}
