import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function loadBar(setProgress) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    setProgress(progress);
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    }
  }, 100);
}

export default function LoadingBar({ activateProgress }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activateProgress) {
      const cleanup = loadBar(setProgress);
      return cleanup;
    }
  }, [activateProgress]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
