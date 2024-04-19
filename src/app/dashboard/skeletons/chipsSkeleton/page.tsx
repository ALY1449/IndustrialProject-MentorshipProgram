"use client";

import { Skeleton } from "@mui/material";

const ChipSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={32}
      sx={{ borderRadius: "16px", backgroundColor: "#F4E6F2" }}
    />
  );
};

export default ChipSkeleton;
