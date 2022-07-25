import type { FC } from "react";
import NotFoundException from "exceptions/NotFoundException";

const ErrorPage: FC<{ error: Error; resetErrorBoundary?: any }> = ({ error }: any) => {
  let title = "Oups, page introuvable";
  let text = "Désolé, mais la page que vous avez demandé n’existe pas. ";

  if (!(error instanceof NotFoundException)) {
    title = "Maintenance";
    text = "Désolé, mais le site est actuellement en maintenance. En attendant, vous pouvez consulter notre site :";
  }
  return <>
    <div>{title}</div>
    <div>{text}</div>
  </>;
};

export default ErrorPage;
