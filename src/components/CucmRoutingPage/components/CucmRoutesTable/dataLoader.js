import axios from 'axios'

const dataLoader = async ({url, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName}) => {
  try {
    const {cucm, pattern, cucmCss} = extFilters
    if (!cucm || !pattern || !cucmCss) return {data: [], counter: 0}
    const res = await axios.get(url, {
      params: {cucm, num: pattern, css: cucmCss}
    })
    if (res.status !== 200 || !Array.isArray(res.data)) {
      console.log('Error fetching data from server: ', res)
      throw new Error('Error fetching data from server')
    }
    return {data: res.data, counter: res.data.length}
  } catch (e) {
    alert(e.toString())
    return []
  }
}
export default dataLoader