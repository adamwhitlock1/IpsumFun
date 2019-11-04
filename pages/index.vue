<template>
  <div class="mx-auto container">
    <div>
      <h1 class="text-2xl text-blue-600 font-mono font-hairline m-6">
        Ipsum Fun
      </h1>
      <label for="paragraphs"># of paragraphs</label>
      <input
        v-model="paragraphs"
        class="border-2 border-green-300 px-3 py-3 rounded"
        name="paragraphs"
        type="text"
      />
      <select v-model="selectedCategory">
        <option
          v-for="(option, index) in categories"
          :key="index"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <button class="bg-green-500 text-white rounded p-3" @click="getIpsum">
        GET SOME IPSUM
      </button>
      <p class="result mt-4" v-html="result"></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paragraphs: 5,
      result: '',
      categories: [],
      selectedCategory: 'photo'
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getIpsum() {
      this.$axios
        .get(`/api/type/${this.selectedCategory}?p=${this.paragraphs}`)
        .then((res) => {
          console.log(res.data)
          this.result = ''
          this.result = res.data.text
        })
    },
    getCategories() {
      this.$axios.get(`/api/categories`).then((res) => {
        this.categories = res.data.categories
      })
    }
  }
}
</script>

<style>
.result {
  white-space: pre-line;
}
</style>
