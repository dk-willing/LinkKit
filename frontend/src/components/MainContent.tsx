import { useEffect, useState } from "react";
import Form from "./Form";
import type { URLData } from "../interfaces/URLData";
import axios from "axios";
import { serverUrl } from "../helpers/Constants";
import DataTable from "./DataTable";

export default function MainContent() {
  const [data, setData] = useState<URLData[]>([]);

  const fetchData = async () => {
    const res = await axios.get(`${serverUrl}/short-url`);

    console.log(res.data.data);
    setData(res.data.data.urls);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-[82vh] container mx-auto max-w-5xl">
      <Form />
      <DataTable data={data} />
    </div>
  );
}
