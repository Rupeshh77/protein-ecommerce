// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  initializeCategoryTabs()
  initializeProductHighlights()
  initializeBannerRotation()
  initializeSmoothScrolling()
  initializeProductButtons()
  initializeFeaturedPoster()
  initializeVideoButtons()
  initializeProductCardClicks()
})

// Category Tab Switching
function initializeCategoryTabs() {
  const categoryTabs = document.querySelectorAll(".category-tab")
  const nutritionSubmenu = document.getElementById("nutrition-submenu")
  const accessoriesSubmenu = document.getElementById("accessories-submenu")

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => t.classList.remove("active"))
      // Add active class to clicked tab
      tab.classList.add("active")

      // Show/hide appropriate submenu
      if (tab.dataset.category === "nutrition") {
        nutritionSubmenu.classList.remove("hidden")
        accessoriesSubmenu.classList.add("hidden")
      } else {
        nutritionSubmenu.classList.add("hidden")
        accessoriesSubmenu.classList.remove("hidden")
      }
    })
  })
}

// Product Highlight Tabs
function initializeProductHighlights() {
  const highlightTabs = document.querySelectorAll(".highlight-tab")
  const topSells = document.getElementById("top-sells")
  const newArrivals = document.getElementById("new-arrivals")

  highlightTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      highlightTabs.forEach((t) => t.classList.remove("active"))
      // Add active class to clicked tab
      tab.classList.add("active")

      // Show/hide appropriate product grid
      if (tab.dataset.tab === "top-sells") {
        topSells.classList.remove("hidden")
        newArrivals.classList.add("hidden")
      } else {
        topSells.classList.add("hidden")
        newArrivals.classList.remove("hidden")
      }
    })
  })
}

// Auto-rotating Banner Images
function initializeBannerRotation() {
  const bannerLeft = document.getElementById("banner-left")
  const bannerRight = document.getElementById("banner-right")

  // Replace these arrays with your actual image URLs
  const leftImages = ["images/img1.jpg", "images/img3.jpg", "images/img5.jpg"]
  const rightImages = ["images/img2.jpg", "images/img4.jpg", "images/img6.jpg"]

  // Set initial images
  if (bannerLeft) {
    bannerLeft.src = leftImages[0]
  }
  if (bannerRight) {
    bannerRight.src = rightImages[0]
  }

  let leftIndex = 0
  let rightIndex = 0

  // Left banner rotation (5 seconds)
  setInterval(() => {
    leftIndex = (leftIndex + 1) % leftImages.length
    if (bannerLeft) {
      bannerLeft.src = leftImages[leftIndex]
    }
  }, 5000)

  // Right banner rotation (8 seconds)
  setInterval(() => {
    rightIndex = (rightIndex + 1) % rightImages.length
    if (bannerRight) {
      bannerRight.src = rightImages[rightIndex]
    }
  }, 8000)
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
}

// Additional utility functions
function showNotification(message, type = "info") {
  console.log(`${type.toUpperCase()}: ${message}`)
}

function handleCartClick() {
  showNotification("Cart functionality to be implemented", "info")
}

function handleLoginClick() {
  showNotification("Login functionality to be implemented", "info")
}

function handleSignupClick() {
  showNotification("Signup functionality to be implemented", "info")
}

// Add event listeners for additional functionality
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon")
  const loginBtn = document.querySelector(".nav-btn:first-of-type")
  const signupBtn = document.querySelector(".nav-btn:last-of-type")

  if (cartIcon) {
    cartIcon.addEventListener("click", handleCartClick)
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", handleLoginClick)
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", handleSignupClick)
  }
})

// Search functionality
function initializeSearch() {
  const searchBox = document.querySelector(".search-box")

  if (searchBox) {
    searchBox.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const searchTerm = this.value.trim()
        if (searchTerm) {
          handleSearch(searchTerm)
        }
      }
    })
  }
}

function handleSearch(searchTerm) {
  showNotification(`Searching for: ${searchTerm}`, "info")
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeSearch)

// Add new function for product buttons
function initializeProductButtons() {
  // Buy Now buttons
  const buyNowButtons = document.querySelectorAll(".buy-now-btn")
  buyNowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent card click
      const productCard = e.target.closest(".product-card")

      // Better product data extraction
      const productName =
        productCard.querySelector(".product-name, .product-title, h3")?.textContent || "Nutrition Product"
      const productPriceElement = productCard.querySelector(".price, .current-price, .product-price")
      const productPrice = productPriceElement?.textContent || "₹999"
      const productImageElement = productCard.querySelector(".product-image, img")
      const productImage = productImageElement?.src || "images/product1.jpg"

      console.log("Product data:", { productName, productPrice, productImage }) // Debug log
      handleBuyNow(productName, productPrice, productImage)
    })
  })

  // Add to Cart buttons (keep existing functionality)
  const addCartButtons = document.querySelectorAll(".add-cart-btn")
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const productCard = e.target.closest(".product-card")
      const productName =
        productCard.querySelector(".product-name, .product-title, h3")?.textContent || "Nutrition Product"
      handleAddToCart(productName)
    })
  })

  // Wishlist buttons (keep existing functionality)
  const wishlistButtons = document.querySelectorAll(".wishlist-btn")
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const productCard = e.target.closest(".product-card")
      const productName =
        productCard.querySelector(".product-name, .product-title, h3")?.textContent || "Nutrition Product"
      handleWishlist(e.target, productName)
    })
  })
}

function handleBuyNow(productName, productPrice, productImage) {
  // Clean the price by removing currency symbols and extracting numbers
  const cleanPrice = productPrice.replace(/[₹,\s]/g, "").match(/\d+/)?.[0] || "999"

  // Create checkout URL with proper encoding
  const checkoutURL = `checkout.html?product=${encodeURIComponent(productName)}&price=${cleanPrice}&image=${encodeURIComponent(productImage)}&quantity=1`

  console.log("Redirecting to:", checkoutURL) // Debug log
  window.location.href = checkoutURL
}

function handleAddToCart(productName) {
  showNotification(`Added to cart: ${productName}`, "success")
  updateCartCount()
}

function handleWishlist(button, productName) {
  const isWishlisted = button.textContent === "♥"

  if (isWishlisted) {
    button.textContent = "♡"
    showNotification(`Removed from wishlist: ${productName}`, "info")
  } else {
    button.textContent = "♥"
    showNotification(`Added to wishlist: ${productName}`, "success")
  }
}

function updateCartCount() {
  const cartIcon = document.querySelector(".cart-icon")
  // Add cart count logic here
}

// Featured Poster Navigation
function initializeFeaturedPoster() {
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      showNotification("Previous featured product", "info")
    })

    nextBtn.addEventListener("click", () => {
      showNotification("Next featured product", "info")
    })
  }
}

// Initialize video product buttons
function initializeVideoButtons() {
  // Video Buy Now buttons
  const videoBuyNowButtons = document.querySelectorAll(".video-info .buy-now-btn")
  videoBuyNowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const videoCard = e.target.closest(".video-card")
      const productName = videoCard.querySelector(".video-title").textContent
      const productPrice = videoCard.querySelector(".video-pricing .price").textContent
      const productImage = videoCard.querySelector(".video-product-image").src
      handleBuyNow(productName, productPrice, productImage)
    })
  })

  // Video Add to Cart buttons
  const videoAddCartButtons = document.querySelectorAll(".video-info .add-cart-btn")
  videoAddCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const videoCard = e.target.closest(".video-card")
      const productName = videoCard.querySelector(".video-title").textContent
      handleAddToCart(productName)
    })
  })
}

// Product Card Clicks
function initializeProductCardClicks() {
  // Make product cards clickable for nutrition products
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    // Add cursor pointer style
    card.style.cursor = "pointer"

    card.addEventListener("click", (e) => {
      // Don't redirect if clicking on buttons or wishlist
      if (
        e.target.classList.contains("buy-now-btn") ||
        e.target.classList.contains("add-cart-btn") ||
        e.target.classList.contains("wishlist-btn")
      ) {
        return
      }

      // Get product name for potential future use
      const productName = card.querySelector(".product-name").textContent

      // Redirect to product detail page
      window.location.href = "product-detail-protein-1.html"
    })
  })
}
