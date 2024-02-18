import axios from "axios"

const getListProvince = async () => {
  try {
    const res = await axios({
      url: "https://vapi.vnappmob.com/api/province",
      method: "get"
    })
    const result = await res.data.results
    return result

  } catch (error) {
    console.log(error)
  }
}

// get list district

export const apiGetProvince = async (provinceCode) => {
  try {
    const res= await axios({
      url: `https://vapi.vnappmob.com/api/province/district/${provinceCode}`,
      method: "get",
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
  }
}

export const apiGetWard= async (districtCode)=> {
  try {
    const res= await axios({
      url: `https://vapi.vnappmob.com/api/province/ward/${districtCode}`
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
  }
} 


export { getListProvince }