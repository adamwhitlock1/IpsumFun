<template>
  <div class="mx-auto container object-center">
    <div class="flex align-middle align-items-center align-content-center">
      <div class="w-full">
        <div class="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 mt-8">
          <h1 class="text-2xl text-blue-600 font-mono font-hairline mb-4">
            Ipsum Fun
          </h1>
          <div class="flex">
            <div class="mb-4 px-1">
              <label
                for="paragraphs"
                class="block text-gray-700 text-sm font-bold mb-2"
                ># of paragraphs</label
              >
              <input
                id="paragraphs"
                v-model="paragraphs"
                class="shadow appearance-none border rounded w-full py-2 px-3 border-gray-100 hover:border-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="paragraphs"
                type="text"
              />
            </div>
            <div class="mb-4 px-1">
              <label
                for="subject"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Subject matter</label
              >
              <div class="inline-block relative w-64">
                <select
                  id="subject"
                  v-model="selectedCategory"
                  class="block appearance-none w-full bg-white border border-gray-100 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option
                    v-for="(option, index) in categories"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6 px-1">
            <p class="block text-gray-700 text-sm font-bold mb-2">
              paragraph length
            </p>
            <input
              id="short"
              v-model="paragraphLength"
              type="radio"
              value="short"
            />
            <label for="short" class="py-2 pl-1 pr-3 text-gray-700"
              >short</label
            >
            <input
              id="medium"
              v-model="paragraphLength"
              type="radio"
              value="medium"
              class="py-2 px-3 text-gray-700"
            />
            <label for="medium" class="py-2 pl-1 pr-3 text-gray-700"
              >medium</label
            >
            <input
              id="long"
              v-model="paragraphLength"
              type="radio"
              value="long"
              class="py-2 px-3 text-gray-700"
            />
            <label for="long" class="py-2 pl-1 pr-3 text-gray-700">long</label>
          </div>
          <div class="flex px-1">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="getIpsum"
            >
              Get Some Ipsum
            </button>
            <CopyToClipboard :text="result"></CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
    <p
      class="result mt-4 py-4 px-6 border-solid border-gray-100 rounded-lg shadow border"
      v-html="result"
    ></p>
  </div>
</template>

<script>
import CopyToClipboard from '../components/CopyToClipboard'
export default {
  components: {
    CopyToClipboard
  },
  data() {
    return {
      paragraphs: 5,
      paragraphLength: 'medium',
      result: '',
      categories: [],
      selectedCategory: 'photo'
    }
  },
  mounted() {
    this.getCategories()
    this.getIpsum()
  },
  methods: {
    getIpsum() {
      this.$axios
        .get(
          `/api/type/${this.selectedCategory}?p=${this.paragraphs}&l=${this.paragraphLength}`
        )
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
