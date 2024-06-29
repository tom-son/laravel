import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import 'moment/locale/en-gb';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LicenseInfo } from "@mui/x-license-pro";
import { queryClient } from "./api/handlers";
import { QueryClientProvider } from "@tanstack/react-query";

// License expires (Feb 14th) https://loricahealthhq.slack.com/archives/CAVSQ58AF/p1706762265944859?thread_ts=1706673271.901619&cid=CAVSQ58AF
// License key is designed to be public - https://mui.com/x/introduction/licensing/#security
LicenseInfo.setLicenseKey(
    "cc4db626450061c39b77551279789015Tz04MzQzOCxFPTE3Mzg0NzA2ODgwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y",
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
              <App />
          </LocalizationProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
