import React, { useState, useEffect } from 'react';
import { GetLocationDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import axios from "axios"

const DeliveryDetails = (props) => {
  const [locationList, setLocationList] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(1);
  const [area, setArea] = useState('');
  const [states, setStates] = useState('');
  const [address, setAddress] = useState('');
  const [listCity, setListCity]= useState([])
  const [listDistrict, setListDistrict]= useState([])
  const [listWard, setListWard]= useState([])

  const {city, setCity }= props
  useEffect(()=> {
    (async ()=> {
        const result= await axios({
          url: "https://provinces.open-api.vn/api/", 
          method: "get"
        })
        setListCity(result.data)
    })()
  }, [])
  useEffect(()=> {
    (async ()=> {
        const result= await axios({
            url: "https://provinces.open-api.vn/api/?depth=2", 
            method: "get"
        })
        setListDistrict(result.data?.filter(item=> item?.code == city))
    })()
  }, [city])
  useEffect(()=> {
    (async ()=> {
        const result= await axios({
            url: "https://provinces.open-api.vn/api/?depth=3", 
            method: "get"
        })
        setListWard(result.data)
    })()
  }, [city, district])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'district':
        setDistrict(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'area':
        setArea(value);
        break;
      case 'states':
        setStates(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const delivery = {
      name: name,
      phone: phone,
      district: district,
      city: city,
      area: area,
      states: states,
      address: address,
      email: states

    };
    props.onSelectDeliveryAddress(delivery);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await GetLocationDetails.getLocationListDetails();
        setLocationList(location.data);
      } catch (error) {
        NotificationManager.error('Data is empty', 'Data');
      }
    };

    fetchData();
  }, []);

  const option = locationList.map((data, i) => (
    <option value={data.id} key={i}>
      {data.name}
    </option>
  ));

  return (
    <div className="card-body">
      <form>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                className="form-control border-form-control"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                Phone <span className="required">*</span>
              </label>
              <input
                type="number"
                className="form-control border-form-control"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control border-form-control"
                name="states"
                value={states}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                District <span className="required">*</span>
              </label>
              <select
                type="text"
                className="form-control border-form-control"
                name="district"
                value={district}
                onChange={handleChange}
              >
                {
                  listDistrict?.[0]?.districts?.map((item, key)=> <option key={key} value={item.code}>{item?.name}</option>)
                }
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                City <span className="required">*</span>
              </label>
              <select
                type="text"
                className="form-control border-form-control"
                name="city"
                value={city}
                onChange={handleChange}
              >
                {
                    listCity.map((item, key)=> <option key={key} value={item.code}>{item?.name}</option>)
                }
              </select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                Ward <span className="required">*</span>
              </label>
              <select
                className="form-control border-form-control"
                type="text"
                name="area"
                value={area}
                onChange={handleChange}
              >
                {
                    (listWard?.filter(item=> item?.code== city && item?.districts?.filter(item2=> item2?.code=== district))?.[0]?.districts?.filter(item=> item?.code== district)?.[0]?.wards?.map((item, key)=> <option key={key} value={item?.code}>{item?.name}</option>))
                }
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="control-label">
                Shipping Address <span className="required">*</span>
              </label>
              <textarea
                className="form-control border-form-control"
                name="address"
                value={address}
                onChange={handleChange}
              />
              <small className="text-danger">
                Please provide the number and street.
              </small>
            </div>
          </div>
        </div>
        <button
          type="button"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
          className="btn btn-secondary mb-2 btn-lg"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </form>
    </div>
  );
};

export default DeliveryDetails;
