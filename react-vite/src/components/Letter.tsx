import { Box } from "@mui/system";
import React from "react";

/**
 * Layout the letter content so that it is laid out nicely for browser printing.
 */

export const sidePageMarginMM = "15mm";
export const footerBannerHeightMM = "20mm";

const bodyContentStyles = {
  margin: `-15mm ${sidePageMarginMM} 0mm`,
};

const pageTopMargin = {
  height: "15mm",
};

const pageBottomMargin = {
  height: footerBannerHeightMM,
};

interface LetterProps {
  body: React.ReactNode;
  // hook to place element before the body
  prebody?: React.ReactNode;
  // hook to place element after the body
  postbody?: React.ReactNode;
}

function Letter(props: LetterProps) {
  return (
    <Box>
      {props.prebody}

      <LetterContent>{props.body}</LetterContent>

      {props.postbody}
    </Box>
  );
}

/**
 * HTML table with default spacing removed which allows for MUI sx styles to be injected.
 *
 * Default spacing removed to make it's horizontally content perfectly align with sibling components - noticable when
 * they're close together.
 */
function LetterBody({ children, ...props }: any) {
  return (
    <table cellSpacing={0} {...props}>
      {children}
    </table>
  );
}

function LetterContent({ children }: any) {
  return (
    <Box component={LetterBody} sx={bodyContentStyles}>
      <PageTopMargin />

      <tbody>
        <tr>
          <td style={{ padding: 0 }}>{children}</td>
        </tr>
      </tbody>

      <PageBottomMargin />
    </Box>
  );
}

/**
 * Add re-occurring top margin to print page. Must be used within a <table/>.
 */
function PageTopMargin() {
  return (
    <thead>
      <tr>
        <td>
          <Box sx={pageTopMargin} />
        </td>
      </tr>
    </thead>
  );
}

/**
 * Add re-occurring bottom margin to print page. Must be used within a <table/>.
 *
 * This bottom margin is supporting the footer banner from overlapping the letter body content.
 */
function PageBottomMargin() {
  return (
    <tfoot>
      <tr>
        <td>
          <Box sx={pageBottomMargin} />
        </td>
      </tr>
    </tfoot>
  );
}

export default Letter;
