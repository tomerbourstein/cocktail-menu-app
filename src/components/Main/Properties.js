import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const Properties = (props) => {
  const propsToShow = useSelector((state) => state.dataBase.properties);
  const handleDelete = (property) => {
    console.info(`You clicked the delete ${property} icon.`);
  };
  return (
    <Box
      sx={{
        width: 350,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        mx: "auto",
        mb: 2,
      }}
    >
      {propsToShow.map((property) => (
        <Chip
          key={propsToShow.indexOf(property)}
          label={property}
          size="small"
          sx={{ m: 0.3 }}
          onDelete={() => handleDelete(property)}
          />
      ))}
    </Box>
  );
};

export default Properties;
