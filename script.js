document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const masterToggle = document.getElementById("masterToggle")
  const masterSubmenu = document.getElementById("masterSubmenu")
  const saleOrderToggle = document.getElementById("saleOrderToggle")
  const saleOrderSubmenu = document.getElementById("saleOrderSubmenu")
  const pageTitle = document.getElementById("pageTitle")
  const navLinks = document.querySelectorAll(".nav-link")

  // Add tooltips for collapsed sidebar
  navLinks.forEach((link) => {
    const text = link.querySelector(".nav-text")?.textContent
    if (text) {
      link.setAttribute("data-tooltip", text)
    }
  })

  // Sidebar toggle functionality
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")

    // Close submenus when sidebar is collapsed
    if (sidebar.classList.contains("collapsed")) {
      masterSubmenu.classList.remove("open")
      saleOrderSubmenu.classList.remove("open")
      const masterArrow = masterToggle.querySelector(".submenu-arrow")
      const saleOrderArrow = saleOrderToggle.querySelector(".submenu-arrow")
      if (masterArrow) {
        masterArrow.style.transform = "rotate(0deg)"
      }
      if (saleOrderArrow) {
        saleOrderArrow.style.transform = "rotate(0deg)"
      }
    }
  })

  // Master submenu toggle functionality
  if (masterToggle) {
    masterToggle.addEventListener("click", function (e) {
      e.preventDefault()

      // Don't toggle submenu if sidebar is collapsed
      if (!sidebar.classList.contains("collapsed")) {
        // Remove active from all nav items
        document.querySelectorAll(".nav-item").forEach((item) => {
          item.classList.remove("active")
        })

        // Add active to master
        this.parentElement.classList.add("active")

        // Update page title
        pageTitle.textContent = "Master"

        // Close other submenus
        saleOrderSubmenu.classList.remove("open")
        const saleOrderArrow = saleOrderToggle.querySelector(".submenu-arrow")
        if (saleOrderArrow) {
          saleOrderArrow.style.transform = "rotate(0deg)"
        }

        // Toggle master submenu
        masterSubmenu.classList.toggle("open")

        // Rotate arrow
        const arrow = this.querySelector(".submenu-arrow")
        if (masterSubmenu.classList.contains("open")) {
          arrow.style.transform = "rotate(180deg)"
        } else {
          arrow.style.transform = "rotate(0deg)"
        }
      }
    })
  }

  // Sale Order submenu toggle functionality
  if (saleOrderToggle) {
    saleOrderToggle.addEventListener("click", function (e) {
      e.preventDefault()

      // Don't toggle submenu if sidebar is collapsed
      if (!sidebar.classList.contains("collapsed")) {
        // Remove active from all nav items
        document.querySelectorAll(".nav-item").forEach((item) => {
          item.classList.remove("active")
        })

        // Add active to sale order
        this.parentElement.classList.add("active")

        // Update page title
        pageTitle.textContent = "Sale Order Mgmt"

        // Close other submenus
        masterSubmenu.classList.remove("open")
        const masterArrow = masterToggle.querySelector(".submenu-arrow")
        if (masterArrow) {
          masterArrow.style.transform = "rotate(0deg)"
        }

        // Toggle sale order submenu
        saleOrderSubmenu.classList.toggle("open")

        // Rotate arrow
        const arrow = this.querySelector(".submenu-arrow")
        if (saleOrderSubmenu.classList.contains("open")) {
          arrow.style.transform = "rotate(180deg)"
        } else {
          arrow.style.transform = "rotate(0deg)"
        }
      }
    })
  }

  // Navigation link active state management
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Don't prevent default for submenu toggles
      if (this.id !== "masterToggle" && this.id !== "saleOrderToggle") {
        e.preventDefault()

        // Remove active class from all nav items
        document.querySelectorAll(".nav-item").forEach((item) => {
          item.classList.remove("active")
        })

        // Add active class to clicked item
        this.parentElement.classList.add("active")

        // Update page title
        const pageName = this.getAttribute("data-page")
        pageTitle.textContent = pageName

        // Close all submenus if clicking on other items
        masterSubmenu.classList.remove("open")
        saleOrderSubmenu.classList.remove("open")
        const masterArrow = masterToggle.querySelector(".submenu-arrow")
        const saleOrderArrow = saleOrderToggle.querySelector(".submenu-arrow")
        if (masterArrow) {
          masterArrow.style.transform = "rotate(0deg)"
        }
        if (saleOrderArrow) {
          saleOrderArrow.style.transform = "rotate(0deg)"
        }
      }
    })
  })

  // Handle mobile responsiveness
  function handleResize() {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("collapsed")
      sidebar.classList.add("mobile")
    } else {
      sidebar.classList.remove("mobile")
      sidebar.classList.remove("mobile-open")
    }
  }

  // Mobile sidebar toggle
  if (window.innerWidth <= 768) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open")
    })
  }

  // Close mobile sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove("mobile-open")
      }
    }
  })

  // Handle window resize
  window.addEventListener("resize", handleResize)
  handleResize() // Initial call
})
