import { createPortal } from "react-dom";
import { Box, GlobalStyles } from "@mui/material";
import React from "react";

const pageStyles = {
  // We use visibility=hidden instead of display=none because there is an issue with getting Rechart graphs to show
  // in printing for some reason
  visibility: "hidden",
  width: "210mm",
  printColorAdjust: "exact !important",
  "-webkit-print-color-adjust": "exact !important",

  "@media print": {
    visibility: "visible",
  },
};

/**
 * Construct an area that will be printed. Any components outside this area will not be detected for printing.
 */

interface PrintableContentProps {
  children: React.ReactNode;
}

function PrintableContent(props: PrintableContentProps) {
  return createPortal(
    <>
      <GlobalStyles
        styles={{
          "@media print": {
            "@page": {
              margin: "0px",
              // A4 dimension: 210mm x 297mm
              size: "A4",
            },
            "body > :not(.PrintableDialog-content)": {
              display: "none",
            },
          },
        }}
      />

      <Box sx={pageStyles} className="PrintableDialog-content">
        {props.children}
      </Box>
    </>,
    document.body,
  );
}

export default PrintableContent;
