import * as React from "react";
// import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";

export default function PaginationControlled(props) {
  const [page, setPage] = React.useState(1);

const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (event, value) => {
    setPage(value);
    goToPage(value);
  };


  const goToPage = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: page });
  };
  React.useEffect(()=> {
    if(searchParams.get("page")) {
        setPage(parseInt(searchParams.get("page")))
    }
    else {
        setPage(1)
    }
  }, [searchParams])

  return (
    <Stack spacing={2}>
      <Pagination count={props?.count} page={page} onChange={handleChange}  />
    </Stack>
  );
}
