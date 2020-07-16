<template>
  <div class="container object-center mx-auto">
    <div class="flex align-middle align-items-center align-content-center">
      <div class="w-full">
        <div class="px-8 pt-6 pb-8 mt-8 mb-4 bg-white rounded shadow">
          <h1 class="mb-4 font-mono text-3xl font-hairline text-blue-600">
            Ipsum Fun
          </h1>
          <div class="flex">
            <div class="px-1 mb-4">
              <label
                for="paragraphs"
                class="block mb-2 text-sm font-bold text-gray-700"
                ># of paragraphs</label
              >
              <input
                id="paragraphs"
                v-model="paragraphs"
                class="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-100 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                name="paragraphs"
                type="text"
              />
            </div>
            <div class="px-1 mb-4">
              <label
                for="subject"
                class="block mb-2 text-sm font-bold text-gray-700"
                >Subject matter</label
              >
              <div class="relative inline-block w-64">
                <select
                  id="subject"
                  v-model="selectedCategory"
                  class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-100 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
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
                  class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 fill-current"
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
          <div class="px-1 mb-6">
            <p class="block mb-2 text-sm font-bold text-gray-700">
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
              class="px-3 py-2 text-gray-700"
            />
            <label for="medium" class="py-2 pl-1 pr-3 text-gray-700"
              >medium</label
            >
            <input
              id="long"
              v-model="paragraphLength"
              type="radio"
              value="long"
              class="px-3 py-2 text-gray-700"
            />
            <label for="long" class="py-2 pl-1 pr-3 text-gray-700">long</label>
            <input
              id="custom"
              v-model="paragraphLength"
              type="radio"
              value="custom"
              class="px-3 py-2 text-gray-700"
            />
            <label for="custom" class="py-2 pl-1 pr-3 text-gray-700"
              >custom</label
            >
          </div>
          <div v-if="paragraphLength === 'custom'" class="w-1/2 mb-6">
            <input
              v-model="customLength"
              type="range"
              min="1"
              max="100"
              class="slider"
            />
            <span class="px-1">{{ customLength }} words per paragraph</span>
          </div>
          <div class="flex px-1">
            <button
              class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
      class="px-6 py-4 mt-4 border border-gray-100 border-solid rounded-lg shadow result"
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
      selectedCategory: 'programming',
      customLength: 15
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
          `/api/type/${this.selectedCategory}/${this.paragraphs}/${this.paragraphLength}/${this.customLength}`
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

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
</style>
