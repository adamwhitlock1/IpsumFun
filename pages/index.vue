<template>
  <div class="object-center min-h-screen mx-auto overlapping-circles">
    <div
      class="container flex mx-auto align-middle align-items-center align-content-center"
    >
      <div class="block md:flex md:w-1/2">
        <div
          class="px-8 pt-6 pb-8 mt-8 mb-4 bg-white border-t-4 border-b-4 border-blue-300 rounded shadow-xl"
        >
          <h1 class="mb-4 font-mono text-3xl font-extrabold text-blue-600">
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
                >subject matter</label
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
              class="inline-flex items-center px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              @click="getIpsum"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5 mr-2">
                <path
                  fill-rule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Get Some Ipsum
            </button>
            <CopyToClipboard :text="result"></CopyToClipboard>
          </div>
        </div>
      </div>
      <div class="hidden ml-6 md:w-1/2 md:flex">
        <div
          class="flex flex-wrap items-center px-8 pt-6 pb-8 mt-8 mb-4 bg-white border-t-4 border-b-4 border-blue-300 rounded shadow-xl"
        >
          <p class="w-full">
            Ipsum Fun is a simple lorem ipsum generator built in Nuxt, Vue,
            Tailwind, and Express. 🧱
          </p>
          <p class="w-full">
            The generator will produce various sizes of random text pertaining
            to a couple subject that are near and dear to my 💜 . Ipsum Fun was
            built by me, Adam Whitlock, in my free time, and I hope you enjoy
            using it.
          </p>
          <p class="w-full mt-2">
            Check out more at
            <a class="font-bold text-green-500" href="https://codestuff.io"
              >Codestuff.io ✨</a
            >
          </p>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto mt-6 bg-white border-t-4 border-b-4 border-blue-300 rounded-lg shadow-xl"
    >
      <p class="p-8 result" v-html="result"></p>
    </div>
  </div>
</template>

<script>
import CopyToClipboard from '../components/CopyToClipboard'
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title: 'Ipsum Fun'
    }
  },
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
      axios
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
      axios.get(`/api/categories`).then((res) => {
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

.overlapping-circles {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e8e8e8' fill-opacity='0.58'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
