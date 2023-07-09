import Axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../../config1";
import moment from "moment";
import Button from "@material-ui/core/Button";
import swal from "sweetalert"
import numberWithCommas from "../../../../../util/number_thousand_separator";

const VoucherGift = () => {
  const [data, setData] = useState([]);
  const [data1, setData1]= useState({data})
  const [check, setCheck]= useState()
  useEffect(() => {
    (async () => {
      const res = await Axios({
        url: API_URL + "/api/voucher/hunting",
        method: "get",
      });
      const result = await res.data;
      setData(result.data);
      return result;
    })();
  }, []);
  useEffect(()=> {
    (async ()=> {
        const res= await Axios({
            url: API_URL+ "/api/voucher/schedule",
            method: "get",
        })
        const result= await res.data
        setData1(result)
        return result
    })()
  }, [])
  useEffect(()=> {
    if(data1.data.date_start) {
        if(moment(data1.data.date_start).valueOf() < moment(new Date()).valueOf()  && moment(data1.data.date_end).valueOf() > moment(new Date()).valueOf() ) {
            setCheck(true)
        }
        else {
            setCheck(false)
        }
    }
  }, [data1])
  useEffect(()=> {
    if(check=== false) {
        swal("Thông báo", "Chưa đến giờ săn voucher hoặc không có lịch săn voucher bạn vui lòng thử lại sau")
        .then(()=> window.location.href= window.location.origin)
    }
  }, [check])

  const post= async ()=> {
    const res= await Axios({
        url: API_URL+ "/api/customer/voucher",
        data: {
            
        }
    })
  }

  return (
    <section className="not-found-page section-padding">
      <div className="container">
        <div className="row">
          <div
            className="col-md-8 mx-auto text-center  pt-5 pb-5"
            style={{ marginTop: "3rem" }}
          >
            <div className="row">
              {
                check && 
                data.map((item, key) => (
                <div key={key} className="col-lg-4 col-md-12">
                  <div className="pdpt-bg rewards-coupns">
                    <div className="reward-body-dtt">
                      <div className="reward-img-icon">
                        <img src="images/discount.svg" alt />
                      </div>
                      <span className="rewrd-title">Offer</span>
                      <h4 className="cashbk-price">Discount VND{numberWithCommas(item.discount)}</h4>
                      <span className="date-reward">Expires on : {moment(item.expire).format("DD-MM-YYYY HH:mm:ss")}</span>
                        <Button className="mb-1" variant={"contained"} color={"primary"}>Save</Button>
                    </div>
                  </div>
                </div>
              ))
              }
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoucherGift;
