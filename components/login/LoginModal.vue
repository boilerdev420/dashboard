<template>
  <!-- Only render if show is true -->
  <div v-if="show" class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ isRegistering ? 'Sign Up' : 'Sign In' }}</h2>

      <!-- Email & Password form -->
      <form @submit.prevent="isRegistering ? registerWithEmailPassword : loginWithEmailPassword" class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            type="email" 
            v-model="email" 
            required 
            placeholder="you@example.com" 
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            type="password" 
            v-model="password" 
            required 
            placeholder="••••••••" 
          />
        </div>
        <button type="submit" class="btn primary">
          {{ isRegistering ? 'Sign Up' : 'Sign In' }}
        </button>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <!-- Google sign-in button -->
      <button @click="loginWithGoogle" class="btn google">
        <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C296.3 108.7 261.6 96 248 96c-73.1 0-132 59-132 132s58.9 132 132 132c71.1 0 108-46.3 108-108 0-7.3-.6-14.3-1.8-21.1H248v-85.2h236c2.9 15.8 4.5 32.4 4.5 49.2z"/>
        </svg>
        Sign in with Google
      </button>

      <!-- Switch between Sign In and Sign Up -->
      <p>
        {{ isRegistering ? 'Already have an account?' : "Don't have an account?" }}
        <button @click="toggleRegister" class="btn link">
          {{ isRegistering ? 'Sign In' : 'Sign Up' }}
        </button>
      </p>

      <!-- Close button -->
      <button @click="closeModal" class="btn cancel">Cancel</button>
    </div>
  </div>
</template>

<script setup>
/* ----------------------------------
  Imports & References
---------------------------------- */
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth'

/* ----------------------------------
  Props & Emits
---------------------------------- */
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show'])

/* ----------------------------------
  Firebase Auth Logic
---------------------------------- */
const { $auth } = useNuxtApp()

// Form fields
const email = ref('')
const password = ref('')
const isRegistering = ref(false) // Toggle between sign-in and sign-up

function closeModal() {
  emit('update:show', false)
}

// Email & Password Sign-In
async function loginWithEmailPassword() {
  try {
    const userCredential = await signInWithEmailAndPassword(
      $auth,
      email.value,
      password.value
    )
    console.log('User signed in:', userCredential.user)
    closeModal()
    email.value = ''
    password.value = ''
  } catch (error) {
    console.error('Error signing in:', error.message)
    alert('Failed to log in. Check your email or password.')
  }
}

// Email & Password Sign-Up
async function registerWithEmailPassword() {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      $auth,
      email.value,
      password.value
    )
    console.log('User registered:', userCredential.user)
    closeModal()
    email.value = ''
    password.value = ''
    alert('Account created successfully! You can now sign in.')
  } catch (error) {
    console.error('Error signing up:', error.message)
    alert('Failed to register. Check your email or password.')
  }
}

// Google Sign-In
async function loginWithGoogle() {
  const provider = new GoogleAuthProvider()
  try {
    const userCredential = await signInWithPopup($auth, provider)
    console.log('User signed in with Google:', userCredential)
    closeModal()
  } catch (error) {
    console.error('Error signing in with Google:', error)
    alert(error.message)
  }
}

// Toggle between sign-in and sign-up forms
function toggleRegister() {
  isRegistering.value = !isRegistering.value
}
</script>



<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex; 
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease;
}

.modal-content {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px; /* Set maximum width for modal */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeInUp 0.4s ease forwards;
  display: flex;
  flex-direction: column; /* Ensure vertical stacking */
  align-items: center; /* Center items horizontally */
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.75rem;
  color: #333;
  text-align: center;
}

.form {
  width: 100%; /* Ensure the form fills the modal */
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Consistent spacing between form groups */
}

.form-group {
  width: 100%; /* Form group takes full width */
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #007aff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
}

.btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn.primary {
  background-color: #007aff;
  color: #fff;
}

.btn.primary:hover {
  background-color: #005bb5;
}

.btn.google {
  background-color: #fff;
  color: #555;
  border: 1px solid #ddd;
}

.btn.google:hover {
  background-color: #f7f7f7;
}

.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem; /* Adjusted spacing */
}

.btn.cancel {
  background: none;
  color: #007aff;
  margin-top: 1.5rem; /* Spacing from other buttons */
  font-weight: 500;
}

.btn.cancel:hover {
  text-decoration: underline;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0; /* Consistent spacing */
  width: 100%;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider::before {
  margin-right: 0.5rem; /* Reduced spacing */
}

.divider::after {
  margin-left: 0.5rem; /* Reduced spacing */
}

</style>
