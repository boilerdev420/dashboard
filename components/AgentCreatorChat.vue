<template>
  <div class="agent-creator-chat">
    <div class="conversation-area p-4 h-96 overflow-y-auto">
      <div v-for="(message, index) in conversationHistory" :key="index" :class="['message', message.type]">
        <p>{{ message.text }}</p>
      </div>
    </div>
    <!-- Input area for ongoing conversation -->
    <div v-if="!allQuestionsAnswered" class="input-area p-4 flex items-center">
      <Input
        v-model="userInput"
        placeholder="Type your answer..."
        class="flex-grow mr-2"
        @keyup.enter="handleSendMessage"
      />
      <Button @click="handleSendMessage">Send</Button>
    </div>

    <!-- Save button area for completed conversation -->
    <div v-if="allQuestionsAnswered" class="input-area p-4 text-center">
      <Button @click="handleSaveAgent" variant="secondary" size="lg">
        Save Agent Configuration
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

// Define the type for conversation messages
interface ChatMessage {
  type: 'agent' | 'user';
  text: string;
}

const userInput = ref('');
const conversationHistory = ref<ChatMessage[]>([]);
const currentQuestionIndex = ref(0);
const agentQuestions = ref([
  "Hello! I'm here to help you create a new AI agent. What would you like to name your new agent?",
  "Great name! Now, could you briefly describe what this agent's primary function or purpose will be?",
  "What specific capabilities or skills should this agent have? (e.g., data analysis, text generation, answer questions, control smart devices).",
  "Will this agent need to access any specific data sources, APIs, or external services? If so, please list them.",
  "Is there anything else specific you'd like to define for this agent at this stage?"
]);
const collectedAnswers = ref<Record<string, string>>({});

const allQuestionsAnswered = computed(() => currentQuestionIndex.value >= agentQuestions.value.length);

function handleSaveAgent() {
  console.log("Collected Agent Answers:", collectedAnswers.value);
  conversationHistory.value.push({
    type: 'agent',
    text: "Agent configuration has been logged to the console. You can close this panel now."
  });
  // Optionally, disable the save button after click to prevent multiple logs
  // For example, by adding another ref: const saveButtonDisabled = ref(false);
  // and setting it to true here, then binding it to the button's :disabled attribute.
}

function displayCurrentQuestion() {
  // This function is called by onMounted and handleSendMessage.
  // It should check if currentQuestionIndex.value is within the bounds of the agentQuestions array.
  // If yes, it adds agentQuestions.value[currentQuestionIndex.value] to conversationHistory as an agent message.
  if (currentQuestionIndex.value < agentQuestions.value.length) {
    conversationHistory.value.push({
      type: 'agent',
      text: agentQuestions.value[currentQuestionIndex.value],
    });
  }
}

function handleSendMessage() {
  const text = userInput.value.trim();
  // When called, this function should first check if userInput.value is empty. If so, do nothing.
  if (!text) return;

  // Otherwise, add the user's response to conversationHistory as a { type: 'user', text: userInput.value } object.
  conversationHistory.value.push({ type: 'user', text });

  // Store Answer:
  // Get the question that was just answered. This would be agentQuestions.value[currentQuestionIndex.value].
  // Store the userInput.value in collectedAnswers.value.
  // Use the question text as the key.
  if (currentQuestionIndex.value < agentQuestions.value.length) { // Ensure we're still in a question phase
    collectedAnswers.value[agentQuestions.value[currentQuestionIndex.value]] = text;
  }

  // Clear Input: Clear userInput.value (set to '').
  userInput.value = '';

  // Advance to Next Question: Increment currentQuestionIndex.value.
  currentQuestionIndex.value++;

  // Display Next Question or Conclude:
  // Call displayCurrentQuestion() if there are more questions.
  if (currentQuestionIndex.value < agentQuestions.value.length) {
    displayCurrentQuestion();
  } else {
    // If currentQuestionIndex.value is now equal to or greater than agentQuestions.value.length
    // (meaning all questions have been asked), add a concluding message to conversationHistory from the agent.
    conversationHistory.value.push({
      type: 'agent',
      text: "Thank you! I have all the preliminary information needed to define your agent.",
    });
    // Optionally, log or process collectedAnswers
    console.log('Collected answers:', collectedAnswers.value);
  }
}

onMounted(() => {
  displayCurrentQuestion();
});
</script>

<style scoped>
.agent-creator-chat {
  display: flex;
  flex-direction: column;
  /* Removed height: 100% to allow content to define height within SheetContent */
  /* Removed border and border-radius as SheetContent provides this */
}

.conversation-area {
  flex-grow: 1; /* Allows this area to take up available space */
  background-color: #f9fafb; /* Example background */
  /* Added flex properties for message alignment */
  display: flex;
  flex-direction: column;
}

.message {
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  max-width: 80%;
  word-wrap: break-word;
}

.message.agent {
  background-color: #e0f2fe; /* Tailwind's sky-100 */
  color: #0c4a6e; /* Tailwind's sky-800 */
  align-self: flex-start;
  margin-right: auto;
}

.message.user {
  background-color: #dcfce7; /* Tailwind's green-100 */
  color: #166534; /* Tailwind's green-800 */
  align-self: flex-end;
  margin-left: auto;
}

.input-area {
  border-top: 1px solid #e2e8f0; /* Example border */
  background-color: #ffffff;
}
</style>
