import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Header, Card } from "../components";
import { MainDataInterface } from "../interfaces";
import { getQuery, online } from "../utils";
import { useParams } from "react-router-dom";

const Genre = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const top = useRef<HTMLSpanElement>(null);
   const page = getQuery("page");
   const { slug } = useParams();
   const URL = `${import.meta.env.VITE_BASE_URL}/genre/${slug}?page=${
      page || 1
   }`;

   useEffect(() => {
      (async () => {
         scrollTo({
            top: top.current?.offsetTop,
            left: 0,
            behavior: "smooth",
         });

         document.title = `Warungnime | Genre : ${
            slug
               ? slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")
               : ""
         }`;

         online(setRefresh, setError);
         setIsLoading(true);

         try {
            const response = await fetch(URL);
            const result = await response.json();

            setIsLoading(false);
            setData(result);
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, [page, refresh]);

   return (
      <MainLayout>
         <span ref={top}></span>
         <Header
            route="📑 Genre"
            message={
               slug?.charAt(0).toUpperCase() +
               "" +
               slug?.slice(1).replace("-", " ")
            }
         />
         <Card data={data} isLoading={isLoading} error={error} />
      </MainLayout>
   );
};

export default Genre;
