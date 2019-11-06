<template>
  <div>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
      type="button"
      @click="copyIpsum"
    >
      Copy To Clipboard
    </button>
    <span class="py-2 px-4">{{ copyConfirm }}</span>
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
      copyConfirm: ''
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
        this.copyConfirm = ''
      }, 750)
    }
  }
}
</script>
