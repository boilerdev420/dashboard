<template>
  <div class="container mx-auto p-6 bg-white dark:bg-gray-800 min-h-screen">
    <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">AI Agent Dashboard</h1>
    
    <div class="mb-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Create New Agent</h2>
      <p class="mb-4 text-gray-600 dark:text-gray-300">Get started by creating a new AI agent for your specific needs.</p>
      
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline" class="bg-primary text-white hover:bg-primary/90">Create New Agent</Button>
        </SheetTrigger>
        <SheetContent class="w-[600px] sm:w-[800px]">
          <SheetHeader>
            <SheetTitle>Create a New AI Agent</SheetTitle>
            <SheetDescription>
              Answer the questions below to define your new AI agent.
            </SheetDescription>
          </SheetHeader>

          <AgentCreatorChat />

          <SheetFooter>
            <SheetClose as-child>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
        <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Your Agents</h3>
        <p class="text-gray-600 dark:text-gray-300">No agents created yet. Create your first agent to get started.</p>
      </div>
      
      <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
        <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Recent Activity</h3>
        <p class="text-gray-600 dark:text-gray-300">No recent activity to display.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import AgentCreatorChat from '~/components/AgentCreatorChat.vue';
</script>

<style lang="scss" scoped>

</style>