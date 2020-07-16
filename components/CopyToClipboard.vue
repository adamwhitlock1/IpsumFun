<template>
  <div>
    <button
      class="px-4 py-2 ml-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
      type="button"
      @click="copyIpsum"
    >
      Copy To Clipboard
    </button>
    <transition name="bounce">
      <div v-if="copyConfirm" class="inline-flex px-4 py-2">
        {{ copyConfirm }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copyConfirm: null
    }
  },
  methods: {
    copyIpsum() {
      console.log('ipsum')
      const el = document.createElement('textarea') // Create a <textarea> element
      el.value = this.text // Set its value to the string that you want copied
      el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
      el.style.position = 'absolute'
      el.style.left = '-9999px' // Move outside the screen to make it invisible
      document.body.appendChild(el) // Append the <textarea> element to the HTML document
      const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0) // Store selection if found
          : false // Mark as false to know no selection existed before
      el.select() // Select the <textarea> content
      document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el) // Remove the <textarea> element
      if (selected) {
        // If a selection existed before copying
        document.getSelection().removeAllRanges() // Unselect everything on the HTML document
        document.getSelection().addRange(selected) // Restore the original selection
      }

      this.copyConfirm = 'Copied!'
      setTimeout(() => {
        this.copyConfirm = null
      }, 1000)
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.4s;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0) translateX(5px);
  }
  50% {
    transform: scale(1.1) translateX(-10px);
  }
  100% {
    transform: scale(1) translateX(0px);
  }
}
</style>
