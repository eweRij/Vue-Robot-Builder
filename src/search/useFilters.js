import { ref, computed, onMounted } from 'vue';

function filterResults(results, filters) {
  return results.value.filter((part) => filters.value.every(
    (filter) => {
      const filterField = Object.keys(filter)[0];
      const filterValue = filter[filterField];
      return part[filterField] === filterValue;
    },
  ));
}

export default function useFilters(searchResults) {
  const filters = ref([]);// daje informacje o reactivity value -->zamist data!

  const applyFilters = (filter) => filters.value.push(filter);// .value!!
  const clearFilters = () => { filters.value = []; };

  onMounted(() => console.log('Mounted: useFilters')); // zamiast mounted

  const filteredResults = computed(() => filterResults(searchResults, filters));
  // zamiast obiektu computed

  return {
    filters,
    applyFilters,
    clearFilters,
    filteredResults,
  };
}
