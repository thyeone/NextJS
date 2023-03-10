import Card from "@/components/Card";
import { Layout } from "@/components/Layout";
import Seo from "@/components/Seo";
import { IProductResult } from "@/typing";
import { ReactElement } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styled from "styled-components";
import { Products, requests } from "../utils/requests";

export default function Home({ data }: IProductResult) {
  // const { data } = useQuery<IProductResult>(["products"], Products);
  return (
    <Wrapper>
      <Seo title="Home" />
      <Card data={data} />
    </Wrapper>
  );
}

// react-query with hydrate
/* export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["products"], Products);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}; */

// normal fetching
export const getStaticProps = async () => {
  const data = await fetch(requests.fetchProducts).then((res) => res.json());
  return {
    props: {
      data: data.products,
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

const Wrapper = styled.div``;
