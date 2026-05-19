// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  initializeCheckout()
  initializePaymentMethods()
  initializeFormValidation()
  initializeDiscountCode()
  initializeShippingCalculation()
  loadProductFromURL()
})

// Initialize checkout functionality
function initializeCheckout() {
  // Get product data from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const productName = urlParams.get("product")
  const productPrice = urlParams.get("price")
  const productImage = urlParams.get("image")
  const productQuantity = urlParams.get("quantity") || "1"

  console.log("URL Parameters:", { productName, productPrice, productImage, productQuantity }) // Debug log

  if (productName && productPrice) {
    const productData = {
      name: productName,
      price: productPrice,
      image: productImage || "images/product1.jpg",
      quantity: productQuantity,
    }
    updateCheckoutProduct(productData)
  } else {
    // Fallback to default product if no parameters
    const defaultProduct = {
      name: "Nutrition Supplement",
      price: "999",
      image: "images/product1.jpg",
      quantity: "1",
    }
    updateCheckoutProduct(defaultProduct)
  }
}

// Load product information from URL or storage
function loadProductFromURL() {
  const urlParams = new URLSearchParams(window.location.search)

  // Check if we have URL parameters
  if (urlParams.has("product")) {
    const productData = {
      name: urlParams.get("product"),
      price: urlParams.get("price"),
      image: urlParams.get("image"),
      quantity: urlParams.get("quantity") || "1",
    }

    console.log("Loading product from URL:", productData) // Debug log
    updateCheckoutProduct(productData)
  }
}

// Update product display in checkout
function updateCheckoutProduct(productData) {
  console.log("Updating checkout with:", productData) // Debug log

  const productElement = document.getElementById("checkoutProduct")
  if (!productElement) {
    console.error("Checkout product element not found")
    return
  }

  const productImage = productElement.querySelector(".product-image")
  const productName = productElement.querySelector(".product-name")
  const productPrice = productElement.querySelector(".product-price")
  const productQuantity = productElement.querySelector(".product-quantity")

  if (productImage && productData.image) {
    productImage.src = productData.image
    productImage.alt = productData.name
  }

  if (productName) {
    productName.textContent = productData.name
  }

  if (productPrice) {
    productPrice.textContent = `₹${productData.price}`
  }

  if (productQuantity) {
    productQuantity.textContent = productData.quantity
  }

  // Update calculations
  updatePriceCalculations(productData.price, productData.quantity)
}

// Update product display
function updateProductDisplay(name, price, image) {
  const productNameEl = document.querySelector(".product-name")
  const productPriceEl = document.querySelector(".product-price")
  const productImageEl = document.querySelector(".product-image")

  if (productNameEl) productNameEl.textContent = name
  if (productPriceEl) productPriceEl.textContent = `₹${price}`
  if (productImageEl && image) productImageEl.src = image
}

// Update price calculations
function updatePriceCalculations(price, quantity = 1) {
  const numPrice = Number.parseFloat(price.replace(/[₹,]/g, ""))
  const subtotal = numPrice * Number.parseInt(quantity)
  const tax = subtotal * 0.18 // 18% tax
  const total = subtotal + tax

  document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`
  document.getElementById("total").textContent = `₹${total.toFixed(2)}`

  // Update tax info
  const taxInfo = document.querySelector(".tax-info")
  if (taxInfo) {
    taxInfo.textContent = `Including ₹${tax.toFixed(2)} in taxes`
  }
}

// Initialize payment methods
function initializePaymentMethods() {
  const paymentOptions = document.querySelectorAll('input[name="payment"]')
  const paymentDetails = document.querySelector(".payment-details")

  paymentOptions.forEach((option) => {
    option.addEventListener("change", (e) => {
      // Update payment details based on selection
      if (e.target.value === "razorpay") {
        paymentDetails.style.display = "block"
      } else {
        paymentDetails.style.display = "none"
      }
    })
  })
}

// Initialize form validation
function initializeFormValidation() {
  const form = document.querySelector(".checkout-form")
  const payNowBtn = document.getElementById("payNowBtn")

  // Real-time validation
  const requiredFields = form.querySelectorAll("input[required], select[required]")

  requiredFields.forEach((field) => {
    field.addEventListener("input", validateForm)
    field.addEventListener("blur", validateForm)
  })

  // Form submission
  payNowBtn.addEventListener("click", handlePayment)
}

// Validate form
function validateForm() {
  const form = document.querySelector(".checkout-form")
  const requiredFields = form.querySelectorAll("input[required], select[required]")
  const payNowBtn = document.getElementById("payNowBtn")

  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false
      field.classList.add("error")
    } else {
      field.classList.remove("error")
    }
  })

  // Email validation
  const emailField = document.getElementById("email")
  if (emailField.value && !isValidEmail(emailField.value)) {
    isValid = false
    emailField.classList.add("error")
  }

  // Phone validation
  const phoneField = document.getElementById("phone")
  if (phoneField.value && !isValidPhone(phoneField.value)) {
    isValid = false
    phoneField.classList.add("error")
  }

  payNowBtn.disabled = !isValid
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation
function isValidPhone(phone) {
  const phoneRegex = /^[+]?[\d\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}

// Initialize discount code functionality
function initializeDiscountCode() {
  const discountInput = document.getElementById("discountCode")
  const applyBtn = document.querySelector(".apply-btn")

  applyBtn.addEventListener("click", () => {
    const code = discountInput.value.trim().toUpperCase()
    applyDiscountCode(code)
  })

  discountInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const code = discountInput.value.trim().toUpperCase()
      applyDiscountCode(code)
    }
  })
}

// Apply discount code
function applyDiscountCode(code) {
  const discountCodes = {
    WELCOME10: 0.1,
    SAVE20: 0.2,
    FIRST15: 0.15,
    PROTEIN5: 0.05,
  }

  const discountInput = document.getElementById("discountCode")
  const applyBtn = document.querySelector(".apply-btn")

  if (discountCodes[code]) {
    const discount = discountCodes[code]
    showNotification(`Discount code applied! ${discount * 100}% off`, "success")

    // Update calculations with discount
    const currentSubtotal = Number.parseFloat(document.getElementById("subtotal").textContent.replace(/[₹,]/g, ""))
    const discountAmount = currentSubtotal * discount
    const newSubtotal = currentSubtotal - discountAmount
    const tax = newSubtotal * 0.18
    const total = newSubtotal + tax

    // Add discount row to summary
    addDiscountRow(discountAmount)

    document.getElementById("total").textContent = `₹${total.toFixed(2)}`

    discountInput.style.borderColor = "#10b981"
    applyBtn.textContent = "Applied"
    applyBtn.style.background = "#10b981"
    applyBtn.style.color = "white"
    applyBtn.disabled = true
  } else {
    showNotification("Invalid discount code", "error")
    discountInput.style.borderColor = "#ef4444"
  }
}

// Add discount row to summary
function addDiscountRow(discountAmount) {
  const summaryCalculations = document.querySelector(".summary-calculations")
  const totalRow = document.querySelector(".total-row")

  // Remove existing discount row
  const existingDiscount = document.querySelector(".discount-row")
  if (existingDiscount) {
    existingDiscount.remove()
  }

  // Create new discount row
  const discountRow = document.createElement("div")
  discountRow.className = "summary-row discount-row"
  discountRow.innerHTML = `
        <span>Discount</span>
        <span style="color: #10b981;">-₹${discountAmount.toFixed(2)}</span>
    `

  summaryCalculations.insertBefore(discountRow, totalRow)
}

// Initialize shipping calculation
function initializeShippingCalculation() {
  const addressFields = ["address", "city", "state", "pincode"]

  addressFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) {
      field.addEventListener("input", calculateShipping)
    }
  })
}

// Calculate shipping
function calculateShipping() {
  const address = document.getElementById("address").value
  const city = document.getElementById("city").value
  const state = document.getElementById("state").value
  const pincode = document.getElementById("pincode").value

  if (address && city && state && pincode) {
    // Simulate shipping calculation
    setTimeout(() => {
      const shippingCost = calculateShippingCost(state, pincode)
      updateShippingCost(shippingCost)
    }, 1000)
  }
}

// Calculate shipping cost based on location
function calculateShippingCost(state, pincode) {
  // Simplified shipping calculation
  const freeShippingStates = ["Bagmati", "Gandaki", "Lumbini"]

  if (freeShippingStates.includes(state)) {
    return 0
  } else {
    return 150 // ₹150 for other states
  }
}

// Update shipping cost in summary
function updateShippingCost(cost) {
  const shippingElement = document.getElementById("shipping")
  const currentSubtotal = Number.parseFloat(document.getElementById("subtotal").textContent.replace(/[₹,]/g, ""))

  if (cost === 0) {
    shippingElement.textContent = "Free"
    shippingElement.style.color = "#10b981"
  } else {
    shippingElement.textContent = `₹${cost.toFixed(2)}`
    shippingElement.style.color = "#374151"
  }

  // Update total
  const tax = currentSubtotal * 0.18
  const total = currentSubtotal + cost + tax
  document.getElementById("total").textContent = `₹${total.toFixed(2)}`
}

// Handle payment
function handlePayment(e) {
  e.preventDefault()

  const paymentMethod = document.querySelector('input[name="payment"]:checked').value
  const formData = collectFormData()

  if (!validateFormData(formData)) {
    showNotification("Please fill in all required fields correctly", "error")
    return
  }

  // Show loading state
  const payNowBtn = document.getElementById("payNowBtn")
  payNowBtn.textContent = "Processing..."
  payNowBtn.disabled = true

  // Simulate payment processing
  setTimeout(() => {
    if (paymentMethod === "razorpay") {
      initiateRazorpayPayment(formData)
    } else if (paymentMethod === "paypal") {
      initiatePayPalPayment(formData)
    }
  }, 1500)
}

// Collect form data
function collectFormData() {
  return {
    email: document.getElementById("email").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    apartment: document.getElementById("apartment").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value,
    phone: document.getElementById("phone").value,
    country: document.getElementById("country").value,
    paymentMethod: document.querySelector('input[name="payment"]:checked').value,
  }
}

// Validate form data
function validateFormData(data) {
  const required = ["email", "firstName", "lastName", "address", "city", "state", "pincode", "phone"]

  for (const field of required) {
    if (!data[field] || !data[field].trim()) {
      return false
    }
  }

  return isValidEmail(data.email) && isValidPhone(data.phone)
}

// Initiate Razorpay payment
function initiateRazorpayPayment(formData) {
  // In a real application, you would integrate with Razorpay API
  showNotification("Redirecting to Razorpay...", "info")

  setTimeout(() => {
    // Simulate successful payment
    window.location.href = `order-confirmation.html?orderId=${generateOrderId()}&email=${formData.email}`
  }, 2000)
}

// Initiate PayPal payment
function initiatePayPalPayment(formData) {
  // In a real application, you would integrate with PayPal API
  showNotification("Redirecting to PayPal...", "info")

  setTimeout(() => {
    // Simulate successful payment
    window.location.href = `order-confirmation.html?orderId=${generateOrderId()}&email=${formData.email}`
  }, 2000)
}

// Generate order ID
function generateOrderId() {
  return "ORD" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "4px",
    color: "white",
    fontWeight: "500",
    zIndex: "1000",
    maxWidth: "300px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  })

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
  }

  notification.style.backgroundColor = colors[type] || colors.info

  // Add to page
  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Auto-fill address functionality
function initializeAddressAutofill() {
  const addressField = document.getElementById("address")
  const searchBtn = document.querySelector(".address-search-btn")

  searchBtn.addEventListener("click", () => {
    // In a real application, you would integrate with a maps API
    showNotification("Address search functionality would be integrated here", "info")
  })
}

// Initialize billing address toggle
function initializeBillingAddress() {
  const billingOptions = document.querySelectorAll('input[name="billing"]')

  billingOptions.forEach((option) => {
    option.addEventListener("change", (e) => {
      if (e.target.value === "different") {
        // Show billing address form
        showNotification("Different billing address form would appear here", "info")
      }
    })
  })
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeAddressAutofill()
  initializeBillingAddress()
})
