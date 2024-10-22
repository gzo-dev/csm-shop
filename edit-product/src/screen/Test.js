

import { Gallery, Item } from "react-photoswipe-gallery";

const GalleryImage = ({ data }) => {
  const options = {
   
  };
  return (
    <Gallery options={{...options, escKey: true}}>
      {data?.slice(0, 1)?.map((item, key) => (
        <Item
          key={key}
          original={item?.imgUrl}
          thumbnail={item?.imgUrl}
          width="1024"
          height="624"
        >
          {({ ref, open }) => (
            <div
              ref={ref}
              onClick={open}
              className="aassaawasas absolute cursor-pointer bottom-6 right-8 bg-white borer-2 rounded-md border-emerald-800 gap-2 flex items-center justify-center px-4 py-2 btn-show-all-img"
            >
              {/* <AiOutlineUnorderedList /> */}
              <span className="text-emerald-800 font-medium">Xem thêm ảnh</span>
            </div>
          )}
        </Item>
      ))}
      {data?.slice(1)?.map((item, key) => (
        <Item
          key={key}
          original={item?.imgUrl}
          thumbnail={item?.imgUrl}
          width="1024"
          height="624"
        >
          {({ ref, open }) => <div ref={ref} onClick={open}></div>}
        </Item>
      ))}
    </Gallery>
  );
};

export default GalleryImage;
