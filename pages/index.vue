<template>
  <div>
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline">Create New Agent</Button>
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
          <!-- "Save Agent" button will be part of AgentCreatorChat.vue or added here later based on Plan Step 5 -->
        </SheetFooter>
      </SheetContent>
    </Sheet>
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