import axios from "axios"
import { API_URL } from "../config"

const getListProvince = async () => {
  try {
    const res = await axios({
      url: "https://province.minhkhanggroup.vn/api/v1/province",
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
      url: `https://province.minhkhanggroup.vn/api/v1/province/district/${provinceCode}`,
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
      url: `https://province.minhkhanggroup.vn/api/v1/province/ward/${districtCode}`
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
  }
} 

export const apiCreateTour= async (data)=> {
  try {
    const res= await axios({
      url: API_URL+ "/api/v1/tour",
      method: "post",
      data: {
        ...data
      }
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
  }
}

export const apiCreateTicket= async (data)=> {
  try {
    const res= await axios({
      url: API_URL+ "/api/v1/ticket",
      method: "post",
      data: {
        ...data
      }
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
  }
}

export const apiEditTour= async (data, token)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/tour",
      method: "put",
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        ...data
      }
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
    
  }
}

export const apiEditTicket= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/ticket",
      method: "put",
      data: {
        ...data
      }
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
    
  }
}

export const apiCreateBlog= async (data, token)=> {
  try {
    const res= await axios({
      url: API_URL+ "/api/v1/blog",
      method: "post",
      data: {
        ...data
      },
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
  }
}

export const apiEditBlog= async (data, token)=> {
  try {
    const res= await axios({
      url: API_URL+ "/api/v1/blog",
      method: "put",
      data: {
        ...data
      },
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const result= await res.data
    return result
  } catch (error) {
    console.log(error)
  }
}

export const apiGetListTour= async (data, token)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/tour/manage",
      
      method: "get",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  }
}

export const apiGetListBlog= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/blog",
      method: "get"
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  }
}

export const apiDeleteTour= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/tour",
      method: "delete",
      data: {
        ...data
      }
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  }
}

export const apiDeleteTicket= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/ticket",
      method: "delete",
      data: {
        ...data
      }
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  }
}

export const apiDeleteBlog= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/blog",
      method: "delete",
      data: {
        ...data
      }
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  }
}

export const apiGetChildCategory= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/category/c",
      method: "get",
      params: {
        ...data
      }
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  }
}


export const apiGetListTicket= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/ticket",
      method: "get"
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  } 
} 

export const apiGetListTicketCategory= async (data)=> {
  try {
    const res= await axios({
      url: API_URL + "/api/v1/ticket/c",  
      method: "get",
      params: {
        ...data
      }
    })
    const result= await res.data
    return result

  } catch (error) {
    console.log(error)
  }
}


export { getListProvince }