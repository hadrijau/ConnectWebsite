import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface LevelDisplayProps {
  value: number;
  freelance?: boolean;
}

const levelLabels = ["Débutant", "Intermédiaire", "Compétent", "Expert"];
const barHeights = [5, 12, 19, 26];

const LevelDisplay: React.FC<LevelDisplayProps> = ({ value, freelance  }) => {
  const theme = useTheme();
  const [selectedLevel, setSelectedLevel] = useState(value);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box mr={2} minWidth={100}>
        {levelLabels[selectedLevel - 1]}
      </Box>
      <Box display="flex" alignItems="flex-end" marginBottom={1}>
        {barHeights.map((height, index) => (
          <Box
            key={index}
            width={5}
            height={height}
            mx={0.2}
            bgcolor={index < selectedLevel ? freelance ? "rgba(185, 211, 134, 1)" : "rgba(216, 146, 192, 1)" : theme.palette.grey[300]}
            sx={{ cursor: "pointer", transition: "background-color 0.3s" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LevelDisplay;
