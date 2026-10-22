import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Lỗi kết nối API: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Không thể tải dữ liệu từ máy chủ");
        }
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    return () => controller.abort();
  }, [url]);

  return { data, setData, loading, error };
}

export default useFetch;