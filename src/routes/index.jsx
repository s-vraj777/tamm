import DetailsPageContainer from "../app/product/container/detailsPageContainer";
import ListPageContainer from "../app/product/container/listPageContainer";

export const routes = [
  {
    path: "/",
    exact: true,
    component: ListPageContainer,
  },
  {
    path: '/details',
    exact: true,
    component: DetailsPageContainer,
  },
  {
    path: "*",
    exact: true,
    component: ListPageContainer,
    redirect: "/",
  },
];
