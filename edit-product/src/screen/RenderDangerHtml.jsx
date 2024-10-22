import React, { useEffect, useRef, useState } from "react";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-zoom.css";
import toUrl from "../utils/toUrl";


const generateId = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const RenderDangerHtml = ({ data, is_tableofcontent=false }) => {
  const [render, setRender] = useState();
  const [headings, setHeadings] = useState([]);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (data) {
      let updatedData = data.replaceAll(
        "<img",
        `<img referrerPolicy="no-referrer"`
      );

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = updatedData;

      const newHeadings = [];

      tempDiv.querySelectorAll("h1, h2").forEach((heading) => {
        const text = heading.innerText.trim();
        if (text) {
          if (!heading.id) {
            const id = generateId(text);
            heading.setAttribute("id", id);
          }

          newHeadings.push({
            id: heading.id,
            text,
            level: parseInt(heading.tagName[1]), // Lấy level từ tagName (h1, h2, h3)
          });
        }
      });

      updatedData = tempDiv.innerHTML;
      setRender(updatedData);
      setHeadings(newHeadings); // Cập nhật state headings
    }
  }, [data]);

  useEffect(() => {
    if (render?.length > 0 && galleryRef.current) {
      const galleryInstance = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgFullscreen, lgZoom],
        selector: "img",
        thumbnail: true,
      })
      if (render?.length > 0 && galleryRef.current) {
        const extractImageSources = (html) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          const imgs = tempDiv.querySelectorAll("img");
          const sources = Array.from(imgs).map((img) => img.getAttribute("src"));
          return sources.filter((src) => !!src); // Filter out any null or empty src attributes
        };
  
        // Call extractImageSources with data prop
        const sources = extractImageSources(
          render?.replaceAll("<img", `<img referrerPolicy="no-referrer"`)
        );
  
        // Log image sources to console
        sources?.forEach((item, key) => {
          const imgElement = document?.querySelector(
            `img[data-lg-item-id="${key}"]`
          );
          imgElement?.setAttribute("src", item?.replace("http:", "https:"));
          imgElement?.setAttribute("referrerPolicy", "no-referrer");
        });
      }

      return () => {
        galleryInstance.destroy();
      };
    }
  }, [render]);

  return (
    <div className="content-container">
      {is_tableofcontent && 
        <TableOfContents headings={headings} />
      }
      <div
        ref={galleryRef}
        className="view ql-editor"
        dangerouslySetInnerHTML={{ __html: toUrl(render) }}
      />
    </div>
  );
};

export default RenderDangerHtml;


const TableOfContents = ({ headings }) => {
  return (
    <>
      {headings?.length > 0 && 
        <div className="toc">
          <h2>Mục lục</h2>
          <ul>
            {headings.map((heading, index) => (
              <li key={index}>
                <span>{index + 1}. </span>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  );
};
