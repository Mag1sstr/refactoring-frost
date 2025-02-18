import { useEffect, useState } from "react";
// import styles from "./style.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { IProductData } from "../../interfaces/interfaces";
import Products from "../Products/Products";
import Pagination from "../Pagination/Pagination";
import Categories from "../Categories/Categories";
// import stubImage from "../../images/stub.png";

export default function ProductsPage() {
  const [productData, setProductData] = useState<IProductData[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandId, setBrandId] = useState<number | string | null>(null);
  const [modelId, setModelId] = useState<number | string | null>(null);
  const [generationId, setGenerationId] = useState<number | string | null>(
    null
  );
  const [available, setAvailable] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let params = ``;
    if (brandId) {
      params += `&brandId=${brandId}`;
    } else {
      setModelId(null);
      setGenerationId(null);
    }

    if (modelId) {
      params += `&modelId=${modelId}`;
    } else {
      setGenerationId(null);
    }

    if (generationId) {
      params += `&generationId=${generationId}`;
    }

    axios
      .get(
        `https://frost.runtime.kz/api/products?page=${currentPage}${params}&size=6&available=${available}`
      )
      .then((resp) => {
        // console.log(resp);

        setProductData(resp.data.items);
        setTotalPages(resp.data.totalPages);
      });
  }, [currentPage, brandId, modelId, generationId, available, totalPages]);

  if (!productData) {
    return <Spinner />;
  }
  return (
    <section>
      <div className="conteiner">
        <Categories
          setAvailable={setAvailable}
          setBrandId={setBrandId}
          setModelId={setModelId}
          setGenerationId={setGenerationId}
          setCurrentPage={setCurrentPage}
        />
        <Products productData={productData} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}
