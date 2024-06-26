import React from "react";
import NeedHelpCard from "../common/needHelpCard";
import Image from "next/image";
import MoreVertIcon from "assets/icons/kebab-menu.svg";
import moment from "moment";

const TableComponent = () => {
  const columns = ["Name", "Email", "Date", ""];
  const rows = [];

  return (
    <table className="table-auto w-full float">
      <thead>
        <tr>
          {columns.map((header, index) => (
            <th
              className="bg-[#F2F2F2] text-lg font-medium text-left p-4"
              key={index}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((data, index) => (
          <tr key={index} className="border-b border-g-grey-dark">
            {data.data.map((nItem, idx) => (
              <td className="text-base p-4 " key={idx}>
                {nItem}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function InviteHome(props) {
  const { changePage } = props;
  return (
    <div className="p-4 md:p-10">
      <div className="flex justify-between gap-10 sm:gap-0 mb-[30px]">
        <div className="sm:col-span-2">
          <h1 className="text-xl font-medium mb-2">Invite your Co-Host</h1>
          <p className="text-grey-light text-lg leading-8 mb-6 max-w-[500px]">
            Add co-host to manage your property, allowing them to assist with
            tasks and share hosting.
          </p>
          <button
            className="bg-black text-white rounded-full px-5 py-2"
            onClick={() => changePage(true)}
          >
            Invite
          </button>
        </div>
        <NeedHelpCard />
      </div>
      <h1 className="text-xl font-medium mb-8">Your Co Hosts</h1>
      <TableComponent />
    </div>
  );
}
