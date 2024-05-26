import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface LevelSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const levelLabels = ["Débutant", "Intermédiaire", "Compétent", "Expert"];
const barHeights = [5, 12, 19, 26]; // Heights for the bars to indicate levels

const LevelSelector: React.FC<LevelSelectorProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const [selectedLevel, setSelectedLevel] = useState(value);

  const handleClick = (level: number) => {
    setSelectedLevel(level);
    onChange(level);
  };

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
            bgcolor={index < selectedLevel ? "rgba(216, 146, 192, 1)" : theme.palette.grey[300]}
            onClick={() => handleClick(index + 1)}
            sx={{ cursor: "pointer", transition: "background-color 0.3s" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LevelSelector;
