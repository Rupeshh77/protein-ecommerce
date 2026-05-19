// DOM Content Loaded Event for Product Pages
document.addEventListener("DOMContentLoaded", () => {
  initializeCategoryTabs()
  initializeFilters()
  initializeSorting()
  initializeProductButtons()
  initializeProductCardClicks()
  initializeSmoothScrolling()
})

// Category Tab Switching (same as home)
function initializeCategoryTabs() {
  const categoryTabs = document.querySelectorAll(".category-tab")
  const nutritionSubmenu = document.getElementById("nutrition-submenu")
  const accessoriesSubmenu = document.getElementById("accessories-submenu")

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

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

// Filter functionality
function initializeFilters() {
  // Filter checkboxes
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]')
  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      applyFilters()
    })
  })

  // Filter links
  const filterLinks = document.querySelectorAll(".filter-link")
  filterLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      // Remove active class from all links in the same section
      const section = link.closest(".filter-section")
      const sectionLinks = section.querySelectorAll(".filter-link")
      sectionLinks.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      link.classList.add("active")

      applyFilters()
    })
  })

  // Expandable sections
  const expandIcons = document.querySelectorAll(".expand-icon")
  expandIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const section = icon.closest(".filter-section")
      const content = section.querySelector(".filter-content")

      if (content) {
        const isCollapsed = content.classList.contains("collapsed")

        if (isCollapsed) {
          content.classList.remove("collapsed")
          icon.textContent = "▲"
          icon.classList.remove("rotated")
        } else {
          content.classList.add("collapsed")
          icon.textContent = "▼"
          icon.classList.add("rotated")
        }
      }
    })
  })

  // Show more button
  const showMoreBtn = document.querySelector(".show-more-btn")
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      showNotification("Show more filters functionality", "info")
    })
  }

  // Price range inputs
  const priceFromInput = document.getElementById("price-from")
  const priceToInput = document.getElementById("price-to")

  if (priceFromInput && priceToInput) {
    priceFromInput.addEventListener("input", applyPriceFilter)
    priceToInput.addEventListener("input", applyPriceFilter)
  }
}

// Apply price filter function
function applyPriceFilter() {
  const priceFrom = document.getElementById("price-from").value
  const priceTo = document.getElementById("price-to").value

  if (priceFrom || priceTo) {
    showNotification(`Price filter applied: ₹${priceFrom || "0"} - ₹${priceTo || "max"}`, "info")
    // Implement actual price filtering logic here
  }
}

// Sorting functionality
function initializeSorting() {
  const sortDropdown = document.querySelector(".sort-dropdown")
  if (sortDropdown) {
    sortDropdown.addEventListener("change", () => {
      const sortValue = sortDropdown.value
      sortProducts(sortValue)
    })
  }
}

// Apply filters function
function applyFilters() {
  const activeFilters = getActiveFilters()
  filterProducts(activeFilters)
  showNotification(`Filters applied: ${JSON.stringify(activeFilters)}`, "info")
}

// Get active filters
function getActiveFilters() {
  const filters = {}

  // Get checked flavours
  const checkedFlavours = document.querySelectorAll('.filter-checkbox input[name="flavour"]:checked')
  if (checkedFlavours.length > 0) {
    filters.flavours = Array.from(checkedFlavours).map((cb) => cb.value)
  }

  // Get checked pack sizes
  const checkedPackSizes = document.querySelectorAll('.filter-checkbox input[name="pack-size"]:checked')
  if (checkedPackSizes.length > 0) {
    filters.packSizes = Array.from(checkedPackSizes).map((cb) => cb.value)
  }

  // Get price range
  const priceFrom = document.getElementById("price-from")?.value
  const priceTo = document.getElementById("price-to")?.value
  if (priceFrom || priceTo) {
    filters.priceRange = {
      from: priceFrom ? Number.parseInt(priceFrom) : 0,
      to: priceTo ? Number.parseInt(priceTo) : Number.POSITIVE_INFINITY,
    }
  }

  // Get active category
  const activeCategory = document.querySelector(".filter-link.active")
  if (activeCategory) {
    filters.category = activeCategory.textContent.trim()
  }

  return filters
}

// Filter products function
function filterProducts(filters) {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    let shouldShow = true

    // Apply category filter
    if (filters.category && filters.category !== "All Proteins") {
      const productName = card.querySelector(".product-name").textContent.toLowerCase()
      const categoryMatch = productName.includes(filters.category.toLowerCase())
      if (!categoryMatch) shouldShow = false
    }

    // Apply flavour filter
    if (filters.flavours && filters.flavours.length > 0) {
      const productName = card.querySelector(".product-name").textContent.toLowerCase()
      const flavourMatch = filters.flavours.some((flavour) => productName.includes(flavour.toLowerCase()))
      if (!flavourMatch) shouldShow = false
    }

    // Show/hide product
    card.style.display = shouldShow ? "block" : "none"
  })

  updateProductCount()
}

// Sort products function
function sortProducts(sortValue) {
  const productsGrid = document.querySelector(".products-grid")
  const productCards = Array.from(document.querySelectorAll(".product-card"))

  productCards.sort((a, b) => {
    switch (sortValue) {
      case "price-low":
        return getProductPrice(a) - getProductPrice(b)
      case "price-high":
        return getProductPrice(b) - getProductPrice(a)
      case "newest":
        // Implement newest logic
        return 0
      case "rating":
        // Implement rating logic
        return 0
      default: // best-selling
        return 0
    }
  })

  // Re-append sorted products
  productCards.forEach((card) => productsGrid.appendChild(card))

  showNotification(`Products sorted by: ${sortValue}`, "info")
}

// Get product price helper
function getProductPrice(productCard) {
  const priceElement = productCard.querySelector(".price")
  if (priceElement) {
    return Number.parseInt(priceElement.textContent.replace(/[₹,]/g, ""))
  }
  return 0
}

// Update product count
function updateProductCount() {
  const visibleProducts = document.querySelectorAll(
    '.product-card[style="display: block"], .product-card:not([style*="display: none"])',
  )
  const productCountElement = document.querySelector(".product-count")
  if (productCountElement) {
    productCountElement.textContent = `${visibleProducts.length} products`
  }
}

// Product buttons (same as home)
function initializeProductButtons() {
  const buyNowButtons = document.querySelectorAll(".buy-now-btn")
  buyNowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent card click
      const productCard = e.target.closest(".product-card")

      // Better product data extraction with fallbacks
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

  const addCartButtons = document.querySelectorAll(".add-cart-btn")
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent card click
      const productCard = e.target.closest(".product-card")
      const productName =
        productCard.querySelector(".product-name, .product-title, h3")?.textContent || "Nutrition Product"
      handleAddToCart(productName)
    })
  })

  const wishlistButtons = document.querySelectorAll(".wishlist-btn")
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent card click
      const productCard = e.target.closest(".product-card")
      const productName =
        productCard.querySelector(".product-name, .product-title, h3")?.textContent || "Nutrition Product"
      handleWishlist(e.target, productName)
    })
  })
}

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

// Smooth scrolling
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

// Utility functions
function showNotification(message, type = "info") {
  console.log(`${type.toUpperCase()}: ${message}`)
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
