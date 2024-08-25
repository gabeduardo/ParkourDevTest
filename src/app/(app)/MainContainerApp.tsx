"use client";
import { FormattedMessage } from "react-intl";

const MainContainerApp = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <main>
      <div className="relative">
        <div>
          <h1 className="font-semibold text-2xl my-2">
            <FormattedMessage id={title} />
          </h1>
          <div className="py-8">{children}</div>
        </div>
      </div>
    </main>
  );
};
export default MainContainerApp;
