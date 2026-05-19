// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  initializeCategoryTabs()
  initializeProductHighlights()
  initializeBannerRotation()
  initializeFAQ()
  initializeSmoothScrolling()
  initializeProductButtons()
  initializeFeaturedPoster()
  initializeVideoButtons() // Add this line
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

// FAQ Accordion
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling
      const icon = question.querySelector("span")

      // Toggle active class
      answer.classList.toggle("active")

      // Change icon
      if (answer.classList.contains("active")) {
        icon.textContent = "-"
      } else {
        icon.textContent = "+"
      }

      // Close other FAQ items
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== question) {
          const otherAnswer = otherQuestion.nextElementSibling
          const otherIcon = otherQuestion.querySelector("span")
          otherAnswer.classList.remove("active")
          otherIcon.textContent = "+"
        }
      })
    })
  })
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
  // Function to show notifications (can be expanded)
  console.log(`${type.toUpperCase()}: ${message}`)
}

function handleCartClick() {
  // Function to handle cart icon clicks
  showNotification("Cart functionality to be implemented", "info")
}

function handleLoginClick() {
  // Function to handle login button clicks
  showNotification("Login functionality to be implemented", "info")
}

function handleSignupClick() {
  // Function to handle signup button clicks
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
  // Function to handle search functionality
  showNotification(`Searching for: ${searchTerm}`, "info")
  // Implement actual search logic here
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeSearch)

// Mobile menu toggle (if needed for future enhancements)
function toggleMobileMenu() {
  const navContainer = document.querySelector(".nav-container")
  navContainer.classList.toggle("mobile-active")
}

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Lazy loading for images (optional enhancement)
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[src="#"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // Replace with actual image URL when available
        // img.src = img.dataset.src;
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  document.addEventListener("DOMContentLoaded", initializeLazyLoading)
}

// Add new function for product buttons
function initializeProductButtons() {
  // Buy Now buttons
  const buyNowButtons = document.querySelectorAll(".buy-now-btn")
  buyNowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card")
      const productName = productCard.querySelector(".product-name").textContent
      handleBuyNow(productName)
    })
  })

  // Add to Cart buttons
  const addCartButtons = document.querySelectorAll(".add-cart-btn")
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card")
      const productName = productCard.querySelector(".product-name").textContent
      handleAddToCart(productName)
    })
  })

  // Wishlist buttons
  const wishlistButtons = document.querySelectorAll(".wishlist-btn")
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card")
      const productName = productCard.querySelector(".product-name").textContent
      handleWishlist(e.target, productName)
    })
  })
}

function handleBuyNow(productName) {
  showNotification(`Redirecting to checkout for: ${productName}`, "success")
  // Implement buy now logic here
}

function handleAddToCart(productName) {
  showNotification(`Added to cart: ${productName}`, "success")
  // Implement add to cart logic here
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
  // Function to update cart count (implement as needed)
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
      // Implement previous slide logic here
    })

    nextBtn.addEventListener("click", () => {
      showNotification("Next featured product", "info")
      // Implement next slide logic here
    })
  }
}

// Initialize video product buttons
function initializeVideoButtons() {
  // Video Buy Now buttons
  const videoBuyNowButtons = document.querySelectorAll(".video-info .buy-now-btn")
  videoBuyNowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const videoCard = e.target.closest(".video-card")
      const productName = videoCard.querySelector(".video-title").textContent
      handleBuyNow(productName)
    })
  })

  // Video Add to Cart buttons
  const videoAddCartButtons = document.querySelectorAll(".video-info .add-cart-btn")
  videoAddCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const videoCard = e.target.closest(".video-card")
      const productName = videoCard.querySelector(".video-title").textContent
      handleAddToCart(productName)
    })
  })
}
