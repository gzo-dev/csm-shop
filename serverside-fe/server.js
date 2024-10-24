const express = require("express");
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");

const app = express();

// Middleware để phục vụ các file tĩnh từ thư mục build của React
app.use(express.static(path.join(__dirname, "build")));

// Route cho từng trang, render kèm thẻ meta động
app.get("*", async (req, res) => {
  const filePath = path.resolve(__dirname, "build", "index.html");

  // Đọc file index.html từ build
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).send("An error occurred");
    }

    // Dữ liệu động từ server, có thể lấy từ DB hoặc API khác
    if (req.path.includes("/product")) {
      // console.log(req.path.split("/").at(-1).split("-").at(-1))
      try {
        const response = await axios({
          url: "https://api.minhkhanggroup.vn/api/v1/product/serverside/d?id=" + req.path.split("/").at(-1).split("-").at(-1),
          method: "get",
          timeout: 3000,
        });
        const result = await response?.data?.data;
        const metaTags = {
          title: result?.name, // Dữ liệu động từ server
          description: result?.meta_description,
          image: result?.photo,
          url: req.protocol + "://" + req.get("host") + req.originalUrl,
        };
  
        const dynamicMetaTags = `
        <title>${metaTags.title}</title>
        <meta property="og:image" content="${metaTags.image?.replace("http:", "https:")}">
        <meta property="og:url" content="${metaTags.url?.replace("http:", "https:")}">
        <meta property="og:description" content="${metaTags.description}">
      `;
  
        const modifiedData = data.replace(
          "</head>",
          `
          ${dynamicMetaTags}
        </head>`
        );
  
        return res.send(modifiedData);
        
      } catch (error) {
        console.log(error)
        return res.send("Error")
        // return res.send(data);
      }
    }
    if (req.path.includes("/ticket")) {
      // console.log(req.path.split("/").at(-1).split("-").at(-1))
      try {
        const response = await axios({
          url: "https://api.minhkhanggroup.vn/api/v1/ticket/serverside/d?id=" + req.path.split("/").at(-1).split("-").at(-1),
          method: "get",
          timeout: 3000,
        });
        const result = await response?.data?.data;
        const metaTags = {
          title: result?.name, // Dữ liệu động từ server
          description: result?.meta_description,
          image: result?.photo,
          url: req.protocol + "://" + req.get("host") + req.originalUrl,
        };
  
        const dynamicMetaTags = `
        <title>${metaTags.title}</title>
        <meta property="og:image" content="${metaTags.image?.replace("http:", "https:")}">
        <meta property="og:url" content="${metaTags.url?.replace("http:", "https:")}">
        <meta property="og:description" content="${metaTags.description}">
      `;
  
        const modifiedData = data.replace(
          "</head>",
          `
          ${dynamicMetaTags}
        </head>`
        );
  
        return res.send(modifiedData);
        
      } catch (error) {
        console.log(error)
        return res.send("Error")
        // return res.send(data);
      }
    }
    if (req.path.includes("/tour")) {
      // console.log(req.path.split("/").at(-1).split("-").at(-1))
      try {
        const response = await axios({
          url: "https://api.minhkhanggroup.vn/api/v1/tour/serverside/d?id=" + req.path.split("/").at(-1).split("-").at(-1),
          method: "get",
          timeout: 3000,
        });
        const result = await response?.data?.data;
        const metaTags = {
          title: result?.name, // Dữ liệu động từ server
          description: result?.meta_description,
          image: result?.photo,
          url: req.protocol + "://" + req.get("host") + req.originalUrl,
        };
  
        const dynamicMetaTags = `
        <title>${metaTags.title}</title>
        <meta property="og:image" content="${metaTags.image?.replace("http:", "https:")}">
        <meta property="og:url" content="${metaTags.url?.replace("http:", "https:")}">
        <meta property="og:description" content="${metaTags.description}">
      `;
  
        const modifiedData = data.replace(
          "</head>",
          `
          ${dynamicMetaTags}
        </head>`
        );
  
        return res.send(modifiedData);
        
      } catch (error) {
        console.log(error)
        return res.send("Error")
        // return res.send(data);
      }
    }
    if (req.path.includes("/blog")) {
      // console.log(req.path.split("/").at(-1).split("-").at(-1))
      try {
        const response = await axios({
          url: "https://api.minhkhanggroup.vn/api/v1/blog/serverside/d?id=" + req.path.split("/").at(-1).split("-").at(-1),
          method: "get",
          timeout: 3000,
        });
        const result = await response?.data?.data;
        const metaTags = {
          title: result?.name, // Dữ liệu động từ server
          description: result?.meta_description,
          image: result?.photo,
          url: req.protocol + "://" + req.get("host") + req.originalUrl,
        };
  
        const dynamicMetaTags = `
        <title>${metaTags.title}</title>
        <meta property="og:image" content="${metaTags.image?.replace("http:", "https:")}">
        <meta property="og:url" content="${metaTags.url?.replace("http:", "https:")}">
        <meta property="og:description" content="${metaTags.description}">
      `;
  
        const modifiedData = data.replace(
          "</head>",
          `
          ${dynamicMetaTags}
        </head>`
        );
  
        return res.send(modifiedData);
        
      } catch (error) {
        console.log(error)
        return res.send("Error")
        // return res.send(data);
      }
    }
    else {
      return res.send(data);
    }
  });
});

// Lắng nghe trên port 3001 hoặc bất kỳ port nào bạn chọn
const PORT = 3025;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
