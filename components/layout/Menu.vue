<template>
  <nav class="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
    <!-- Desktop Menu -->
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <nuxt-link to="/" class="flex items-center">
            <span class="text-xl font-bold text-gray-800 dark:text-white">LOGO</span>
          </nuxt-link>
        </div>

        <!-- Main Navigation (Desktop) -->
        <div class="hidden md:flex space-x-6">
          <nuxt-link v-for="item in mainNavItems" :key="item.name" :to="item.href"
            :class="[
              'font-medium transition-colors',
              isActive(item.href)
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
            ]">
            {{ item.name }}
          </nuxt-link>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Button -->
          <button @click="toggleSearch"
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 focus:outline-none">
            <span class="sr-only">Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Dark Mode Toggle -->
          <button @click="toggleDarkMode"
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 focus:outline-none">
            <span class="sr-only">Toggle Dark Mode</span>
            <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- User Menu (Desktop) -->
          <div class="relative hidden md:block" ref="userMenuContainer">
            <button @click="toggleUserMenu"
              class="flex items-center space-x-2 focus:outline-none transition-colors text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              <span v-if="isLoggedIn" class="text-sm font-medium">{{ user.name }}</span>
              <span v-else class="text-sm font-medium">Account</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" :class="{ 'transform rotate-180': userMenuOpen }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- User Dropdown -->
            <div v-if="userMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200">
              <template v-if="isLoggedIn">
                <nuxt-link to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Your Profile
                </nuxt-link>
                <nuxt-link to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Settings
                </nuxt-link>
                <button @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Sign out
                </button>
              </template>
              <template v-else>
                <button @click="openLoginModal"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Sign in
                </button>
                <nuxt-link to="/register"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Register
                </nuxt-link>
              </template>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu"
            class="md:hidden text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen"
      class="md:hidden bg-white dark:bg-gray-800 shadow-inner border-t dark:border-gray-700 overflow-hidden transition-all duration-300"
      :class="{ 'max-h-screen': mobileMenuOpen, 'max-h-0': !mobileMenuOpen }">
      <div class="container mx-auto px-4 py-3 space-y-3">
        <!-- Mobile Navigation Items -->
        <div class="flex flex-col space-y-2">
          <nuxt-link v-for="item in mainNavItems" :key="item.name" :to="item.href"
            class="py-2 px-3 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            :class="{ 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400': isActive(item.href) }">
            {{ item.name }}
          </nuxt-link>
        </div>

        <!-- Mobile User Actions -->
        <div class="pt-2 border-t dark:border-gray-700">
          <div v-if="isLoggedIn" class="space-y-2">
            <div class="font-medium text-gray-800 dark:text-white py-1">{{ user.name }}</div>
            <nuxt-link to="/profile"
              class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Your Profile
            </nuxt-link>
            <nuxt-link to="/settings"
              class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Settings
            </nuxt-link>
            <button @click="logout"
              class="w-full text-left py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Sign out
            </button>
          </div>
          <div v-else class="space-y-2">
            <button @click="openLoginModal"
              class="w-full text-left py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Sign in
            </button>
            <nuxt-link to="/register"
              class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Register
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Overlay -->
    <div v-if="searchOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16 z-50 transition-opacity duration-300">
      <div class="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-lg p-4 mx-4">
        <div class="flex items-center border-b dark:border-gray-700 pb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search..."
            class="w-full outline-none bg-transparent text-gray-900 dark:text-white" v-model="searchQuery"
            @keyup.enter="performSearch" ref="searchInput" />
          <button @click="toggleSearch"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <login-modal v-if="loginModalOpen" :show="loginModalOpen" @update:show="closeLoginModal" />
  </nav>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Navigation state
const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)
const searchOpen = ref(false)
const loginModalOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const userMenuContainer = ref(null)

// Firebase auth state
import { useNuxtApp } from '#app'
import { onAuthStateChanged } from 'firebase/auth'

const { $auth } = useNuxtApp()
const isLoggedIn = ref(false)
const user = ref(null)

// Dark mode
const isDarkMode = ref(false)

// Main navigation items
const mainNavItems = [
  { name: 'Home', href: '/' },

]

// Route handling
const route = useRoute()

// Check if a route is active
function isActive(path) {
  return route.path === path
}

// Handle Escape key press
function handleEscape(e) {
  if (e.key === 'Escape') {
    mobileMenuOpen.value = false
    userMenuOpen.value = false
    searchOpen.value = false
  }
}

// Toggle menu states
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    userMenuOpen.value = false
  }
}

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value
}

// Close user menu when clicked outside
function closeUserMenu() {
  userMenuOpen.value = false
}

// Handle clicks outside user menu
function handleOutsideClick(event) {
  if (userMenuOpen.value && userMenuContainer.value && !userMenuContainer.value.contains(event.target)) {
    userMenuOpen.value = false
  }
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    // Focus the search input after it's mounted
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  
  // Update HTML class for dark mode
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}

// Auth functions
function openLoginModal() {
  userMenuOpen.value = false
  mobileMenuOpen.value = false
  loginModalOpen.value = true
}

function closeLoginModal(value) {
  loginModalOpen.value = value
}

async function logout() {
  try {
    await $auth.signOut()
    userMenuOpen.value = false
    // No need to set isLoggedIn manually as onAuthStateChanged will handle it
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

// Search function
function performSearch() {
  // Replace with your search logic
  console.log('Searching for:', searchQuery.value)
  searchOpen.value = false
  // You can add navigation or API call here
}

// Reference to auth unsubscribe function
let authUnsubscribe = null

// Set up auth state monitoring and event listeners
onMounted(() => {
  // Add click event listener for user menu
  document.addEventListener('click', handleOutsideClick)
  
  // Add event listener for Escape key
  document.addEventListener('keydown', handleEscape)
  
  // Set up auth state listener
  authUnsubscribe = onAuthStateChanged($auth, (currentUser) => {
    isLoggedIn.value = !!currentUser
    if (currentUser) {
      // Update user information when logged in
      user.value = {
        name: currentUser.displayName || 'User',
        email: currentUser.email,
        photoURL: currentUser.photoURL
      }
    } else {
      user.value = null
    }
  })

  // Initialize dark mode based on user preference or system setting
  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.theme
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
})

// Cleanup when component is unmounted
onUnmounted(() => {
  if (authUnsubscribe) authUnsubscribe()
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('keydown', handleEscape)
})

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>