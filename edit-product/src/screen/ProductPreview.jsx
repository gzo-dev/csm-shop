import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import MyGallery from "./Test";
import GalleryImage from "./Test.js";
import { FaDollarSign } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { IoBedOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineFullscreenExit } from "react-icons/md";
import numberWithCommas from "../utils/numberWithComma";
// import AdvisePopup from "../components/Advise/Index";
import ScrollToTop from "../utils/ScrollToTop";
import { FaUser } from "react-icons/fa";
import { listBedRoom } from "../data/data";
// import MediaQuery from "react-responsive";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import RenderDangerHtml from "./RenderDangerHtml.jsx";
import { Grid } from "@mui/material";
const ProductPreview = () => {
  const [data, setData] = useState();
  // eslint-disable-next-line
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location= useLocation()
  console.log(location.state)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = location?.state
        setLoading(false);
        if (result) {
          setData(result);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [location?.state]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Empty dependency array to run only once after mounting

  return (
    <div style={{ width: "100%" }}>
      <ScrollToTop />
      <div
        style={{
          width: "100%",
          marginTop: 24,
          padding: "20px 0",
          background:
            "linear-gradient(180deg, rgba(208, 54, 1, 0) 0%, rgba(208, 54, 1, 0.08) 26%, rgba(222, 106, 6, 0.19) 75%, rgba(226, 123, 7, 0) 100%)",
        }}
        className="c-flex-center"
      >
        <div style={{ width: "100%", maxWidth: 1248 }}>
          <div style={{ width: "100%", position: "relative" }}>
            {loading === true && <div>Loading...</div>}
            {loading === false && (
              <>
                {data?.productphotos?.length >= 1 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} container >
                      {data?.productphotos?.slice(0, 1)?.map((item, key) => (
                        <img
                          style={{width: "100%", aspectRatio: 4 / 3}}
                          key={key}
                          src={item?.imgUrl}
                          alt={data?.name}
                          title={data?.name}
                          // className="col-span-2 w-full row-span-2 object-cover cursor-pointer rounded first-list-image"
                        />
                      ))}
                    </Grid>
                    <Grid item xs={12} sm={6} container spacing={1.5}>
                      {data?.productphotos?.slice(1, 5)?.map((item, key) => (
                        <Grid key={key} item xs={3} sm={6}>
                          <img
                            style={{width: "100%", aspectRatio: 4 / 3}}
                            src={item?.imgUrl}
                            alt={data?.name}
                            title={data?.name}
                            // className="col-span-1 w-full row-span-1 object-cover cursor-pointer rounded"
                          />
                        </Grid>
                      ))}
                    </Grid>
                      {/* {data?.productphotos?.slice(0, 1)?.map((item, key) => (
                        <img
                          style={{ objectFit: "fill" }}
                          key={key}
                          src={item?.imgUrl}
                          alt={data?.name}
                          title={data?.name}
                          className="col-span-2 w-full row-span-2 object-cover cursor-pointer rounded first-list-image"
                        />
                      ))}
                      {data?.productphotos?.slice(1, 5)?.map((item, key) => (
                        <img
                          style={{ objectFit: "fill" }}
                          key={key}
                          src={item?.imgUrl}
                          alt={data?.name}
                          title={data?.name}
                          className="col-span-1 w-full row-span-1 object-cover cursor-pointer rounded"
                        />
                      ))} */}
                      <GalleryImage data={data?.productphotos} />
                  </Grid>

                )}
                {/* <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {data?.productphotos?.length === 1 &&
                    data?.productphotos?.map((item, key) => (
                      <img
                        style={{ objectFit: "fill" }}
                        key={key}
                        src={item?.imgUrl}
                        alt={data?.name}
                        title={data?.name}
                        className="col-span-2 w-full row-span-2 object-cover cursor-pointer rounded"
                      />
                    ))}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    
                  </Grid>
                </Grid> */}
                
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ width: "100%", marginTop: 36 }}
        className="c-flex-center wrap-d-p"
      >
        <div style={{ maxWidth: 1248, width: "100%" }} className="main-d-p">
          <div
            style={{ width: "100%", display: "flex", marginBottom: 24 }}
            className="main-d-p-1"
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  marginBottom: 24,
                  borderRadius: 10,
                }}
              >
                {loading === true && <div>Loading...</div>}
                {loading === false && (
                  <div
                    className="kjalskalweaw"
                    style={{
                      width: "100%",
                      padding: "10px 30px",
                      background: "#F5F4F4",
                    }}
                  >
                    <p
                      style={{
                        color: "#D03601",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginBottom: 18,
                      }}
                      className="tr-2l tx-20"
                    >
                      {data?.name}
                    </p>
                    <div
                      className="c-flex h-auto al-st"
                      style={{
                        gap: 8,
                        marginBottom: 12,
                        alignItems: "center",
                        height: 24,
                      }}
                    >
                      <div
                        className={"c-flex-center "}
                        style={{ minHeight: "100%" }}
                      >
                        <FaDollarSign />
                      </div>
                      <p style={{ fontWeight: 600, fontSize: 15, width: 70 }}>
                        Giá thuê:{" "}
                      </p>
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: 18,
                          color: "#D03601",
                        }}
                      >
                        {numberWithCommas(data?.price)} vnđ
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 12,
                        alignItems: "center",
                        height: 24,
                      }}
                      className="h-auto m-flex-column al-st"
                    >
                      <div
                        className="c-flex"
                        style={{ gap: 8, flex: 1, alignItems: "center" }}
                      >
                        <div className={"c-flex-center"}>
                          <FaLocationDot />
                        </div>
                        <p style={{ fontWeight: 600, fontSize: 15, width: 70 }}>
                          Khu vực:{" "}
                        </p>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: "#D03601",
                          }}
                        >
                          {data?.districtText?.replace("Quận", "")},{" "}
                          {data?.provinceText?.replace("Thành phố", "")}
                        </p>
                      </div>
                      {data?.categoryId === 13 && (
                        <div
                          className="c-flex"
                          style={{ gap: 8, flex: 1, alignItems: "center" }}
                        >
                          <div className={"c-flex-center"}>
                            <IoHomeOutline />
                          </div>
                          <p style={{ fontWeight: 600, fontSize: 15 }}>
                            Nội thất:{" "}
                          </p>
                          <p
                            style={{
                              fontWeight: 700,
                              fontSize: 18,
                              color: "#D03601",
                            }}
                          >
                            {data?.interior}
                          </p>
                        </div>
                      )}
                      {data?.categoryId === 12 && (
                        <div
                          className="c-flex"
                          style={{ gap: 8, flex: 1, alignItems: "center" }}
                        >
                          <div className={"c-flex-center"}>
                            <IoBedOutline />
                          </div>
                          <p style={{ fontWeight: 600, fontSize: 15 }}>
                            {data?.categoryId === 12 && `Hạng phòng: `}
                          </p>
                          <p
                            style={{
                              fontWeight: 700,
                              fontSize: 18,
                              color: "#D03601",
                            }}
                          >
                            {listBedRoom?.find(
                              (item) =>
                                parseInt(item.value) ===
                                parseInt(data?.typeRoom)
                            )
                              ? listBedRoom?.find(
                                  (item) =>
                                    parseInt(item.value) ===
                                    parseInt(data?.typeRoom)
                                )?.label
                              : "Unknown"}
                          </p>
                        </div>
                      )}

                      <div
                        className="c-flex"
                        style={{ gap: 8, flex: 1, alignItems: "center" }}
                      >
                        <div className={"c-flex-center"}>
                          <FaPhoneAlt />
                        </div>
                        <p style={{ fontWeight: 600, fontSize: 15 }}>Phone: </p>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: "#D03601",
                          }}
                        >
                          {data?.phoneNumber || "Chưa có"}
                        </p>
                      </div>
                    </div>
                    {/*  */}
                    <div
                      className="h-auto m-flex-column al-st"
                      style={{ display: "flex", marginBottom: 12 }}
                    >
                      {data?.categoryId === 13 && (
                        <div
                          className="c-flex"
                          style={{ gap: 8, flex: 1, alignItems: "center" }}
                        >
                          <div className={"c-flex-center"}>
                            <MdOutlineFullscreenExit />
                          </div>
                          <p style={{ fontWeight: 600, fontSize: 15 }}>
                            Diện tích:{" "}
                          </p>
                          <p
                            style={{
                              fontWeight: 700,
                              fontSize: 18,
                              color: "#D03601",
                            }}
                          >
                            {data?.square} m<sup>2</sup>
                          </p>
                        </div>
                      )}

                      <div
                        className="c-flex m-mt-2 m-h-1"
                        style={{ gap: 8, flex: 1 }}
                      >
                        {data?.categoryId === 12 && (
                          <div
                            className="c-flex"
                            style={{
                              gap: 8,
                              flex: 1,
                              alignItems: "center",
                              width: "max-content",
                            }}
                          >
                            <div className={"c-flex-center"}>
                              <FaLocationDot />
                            </div>
                            <p
                              style={{
                                fontWeight: 600,
                                fontSize: 15,
                                width: 70,
                              }}
                            >
                              Vị trí:{" "}
                            </p>
                            <p
                              style={{
                                fontWeight: 700,
                                fontSize: 18,
                                color: "#D03601",
                                maxWidth: 250,
                              }}
                              className="tr-1l"
                            >
                              {data?.address ? data?.address : "Unknown"}
                            </p>
                          </div>
                        )}
                        {data?.categoryId === 12 && (
                          <div
                            className="c-flex"
                            style={{
                              gap: 8,
                              flex: 1,
                              alignItems: "center",
                              width: "max-content",
                              opacity: 0,
                            }}
                          >
                            <div className={"c-flex-center"}>
                              <FaLocationDot />
                            </div>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>
                              Vị trí:{" "}
                            </p>
                            <p
                              style={{
                                fontWeight: 700,
                                fontSize: 18,
                                color: "#D03601",
                                maxWidth: 250,
                              }}
                              className="tr-1l"
                            >
                              {data?.address ? data?.address : "Unknown"}
                            </p>
                          </div>
                        )}
                        {/*  */}
                        {/* {data?.categoryId === 12 && (
                          <div className={"c-flex"} style={{ flex: 1 }}>
                            <AdvisePopup
                              type={data?.categoryId === 13 ? 1 : 3}
                              product={data?.name}
                            />
                          </div>
                        )}
                        {data?.categoryId === 13 && (
                          <div className={"c-flex"}>
                            <AdvisePopup
                              type={data?.categoryId === 13 ? 1 : 3}
                              product={data?.name}
                            />
                          </div>
                        )} */}
                      </div>
                    </div>
                    <div
                      className="h-auto m-flex-column al-st"
                      style={{ display: "flex", marginBottom: 12 }}
                    >
                      {data?.categoryId === 13 && (
                        <div
                          className="c-flex"
                          style={{ gap: 8, flex: 1, alignItems: "center" }}
                        >
                          <div className={"c-flex-center"}>
                            <FaUser />
                          </div>
                          <p style={{ fontWeight: 600, fontSize: 15 }}>
                            Người quản lý:{" "}
                          </p>
                          <p
                            style={{
                              fontWeight: 700,
                              fontSize: 18,
                              color: "#D03601",
                            }}
                          >
                            {data?.user_manager_products ? data?.user_manager_products?.[0]?.managerUser?.firstName : "Chưa có"}
                          </p>
                        </div>
                      )}

                      <div
                        className="c-flex m-mt-2 m-s-fl m-mt-v2"
                        style={{ gap: 8, flex: 1, display: "none" }}
                      >
                        <div className={"c-flex"}>
                          {/* <AdvisePopup
                            type={
                              data?.categoryId === 13
                                ? "Cho thuê căn hộ"
                                : "Đặt phòng khách sạn"
                            }
                            product={data?.name}
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div
                          className="c-flex"
                          style={{ gap: 8, flex: 1, alignItems: "center" }}
                        >
                          <div className={"c-flex-center"}>
                            <FaUser />
                          </div>
                          <p style={{ fontWeight: 600, fontSize: 15 }}>
                            {data?.categoryId === 13 ? "Loại căn hộ" : "Loại khách sạn"}:{" "}
                          </p>
                          <p
                            style={{
                              fontWeight: 700,
                              fontSize: 18,
                              color: "#D03601",
                            }}
                          >
                            {listBedRoom?.find(item=> item?.value== data?.typeRoom)?.label}
                          </p>
                        </div>
                  </div>
                )}
                {/*  */}
                <div className="kasklwawfsd" style={{ width: "100%", padding: 30 }}>
                  <RenderDangerHtml data={data?.desc} />
                  {/* <div className="view ql-editor" dangerouslySetInnerHTML={{ __html: data?.desc }} /> */}
                </div>
              </div>
            </div>
            <div className="c-deal-hot" style={{ paddingLeft: 50 }}>
              <div className="wrap-deal-hot" style={{ width: 240 }}>
                {/* <DealHot /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
