<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
import Menu from "@/components/layout/Menu.vue";
</script>

<template>
  <SidebarProvider>
    <Menu />
    <AppSidebar class="pt-16" />
    <main class="pt-16">
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>