import { useEffect, useState } from "react";
import Form from "./Form";
import type { URLData } from "../interfaces/URLData";
import axios from "axios";
import { serverUrl } from "../helpers/Constants";
import DataTable from "./DataTable";

export default function MainContent() {
  const [data, setData] = useState<URLData[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const updateReloadState = () => {
    setReload((current) => !current);
  };

  useEffect(() => {
    let cancelled = false;

    axios.get(`${serverUrl}/short-url`).then((res) => {
      if (!cancelled) {
        setData(res.data.data.urls);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [reload]);

  return (
    <div className="min-h-[82vh] container mx-auto max-w-5xl">
      <Form updateReloadState={updateReloadState} />
      <DataTable updateReloadState={updateReloadState} data={data} />
    </div>
  );
}
