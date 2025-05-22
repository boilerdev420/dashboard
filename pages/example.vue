<template>
  <section class="relative py-24 bg-white overflow-hidden">
    <!-- Animated gradient background (pseudo-element equivalent) -->
    <div class="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>

    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
        
        <!-- Intro content -->
        <div class="text-center mb-12 lg:w-2/5 lg:text-left lg:mb-0 lg:pr-10">
          <div class="w-16 h-0.5 bg-amber-500 mb-5 mx-auto lg:mx-0"></div>
          <h2 class="text-4xl font-light text-gray-800 uppercase tracking-wider my-5">Exclusive Experience</h2>
          <p class="text-lg leading-relaxed text-gray-600 font-light">Discover the essence of luxury through our personalized approach to concierge services</p>
        </div>
        
        <!-- 3D scene container -->
        <div class="w-full lg:w-3/5">
          <div class="relative aspect-square max-w-lg mx-auto bg-gray-50/50 rounded shadow-lg">
            <!-- Border decoration (pseudo-element equivalent) -->
            <div class="absolute -inset-4 border border-amber-500/20 -z-10 rounded"></div>
            
            <!-- Corner decorations -->
            <div class="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500 z-10"></div>
            <div class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500 z-10"></div>
            <div class="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500 z-10"></div>
            <div class="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500 z-10"></div>
            
            <!-- Canvas container -->
            <div class="absolute inset-0 flex items-center justify-center">
              <canvas class="w-full h-full block" ref="canvasContainer"></canvas>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import { Application } from '@splinetool/runtime';

// Reference to the canvas element
const canvasContainer = ref(null);

onMounted(() => {
  init3DLogo();
});

function init3DLogo() {
  const splineScene = 'https://prod.spline.design/YNldUzwlpq36xHPy/scene.splinecode';
  const spline = new Application(canvasContainer.value);
  spline.load(splineScene).catch((error) => {
    console.error('Failed to load Spline scene:', error);
  });
}

</script>

