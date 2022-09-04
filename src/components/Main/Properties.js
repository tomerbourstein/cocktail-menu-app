import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Properties = (props) => {
  const propsToShow = useSelector((state) => state.dataBase.properties);
  
  return (
    // <Box >

    <Box sx={{ width: 350, display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap', mx: "auto", mb:2 }} >
      {propsToShow.map((property) => (
          <Chip key={propsToShow.indexOf(property)} label={property}  size="small" sx={{m:0.3}}/>
          ))}
    </Box>
        //   </Box>
  );
};

export default Properties;
