"use client";
import { FormattedMessage } from "react-intl";

const FormWrapper = ({ children, title }: any) => {
  return (
    <div className="rounded overflow-hidden shadow-lg w-full grid place-items-center max-w-lg p-10">
      <h1 className="text-slate-600 font-bold text-4xl mb-4 w-full text-center">
        <FormattedMessage id={title} />
      </h1>
      {children}
    </div>
  );
};
export default FormWrapper;
