<template>
  <div class="flex items-center">
    <transition name="bounce">
      <div v-if="copyConfirm" class="inline-flex px-4">
        {{ copyConfirm }}
      </div>
    </transition>
    <button
      @click="copyIpsum"
      class="inline-flex items-center px-4 py-2 ml-2 font-bold text-white transition duration-300 bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
      type="button"
    >
      <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5 mr-2">
        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
        <path
          d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
        ></path>
      </svg>
      Copy To Clipboard
    </button>
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
