
import React from "react";
const TableComponentG = ({ headerData, rowData }) => {

    return (
      <table className="table-auto w-full">
        <thead>
          <tr>
            {headerData.map((header, headerIndex) => (
              <th
                key={headerIndex}
                className="bg-[#F9FBFC] text-lg font-medium text-left p-4"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100 border-b-[1px] border-grey">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="text-base font-normal p-4"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TableComponentG;

// import React from "react";

// const TableComponentG = ({ headerData, rowData }) => {
//   const hasHeader = headerData && headerData.length > 0;

//   return (
//     <table className="table-auto w-full">
//       {hasHeader && (
//         <thead>
//           <tr>
//             {headerData.map((header, headerIndex) => (
//               <th
//                 key={headerIndex}
//                 className="bg-[#F9FBFC] text-lg font-medium text-left p-4"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//       )}
//       <tbody>
//         {rowData.map((row, rowIndex) => (
//           <tr key={rowIndex} className="hover:bg-gray-100">
//             {row.slice(0, hasHeader ? 3 : 2).map((cell, cellIndex) => (
//               <td
//                 key={cellIndex}
//                 className={`border-b-[1px] border-grey text-base font-normal p-4 ${
//                   !hasHeader ? "text-right" : ""
//                 }`}
//               >
//                 {cell}
//               </td>
//             ))}
//             {hasHeader && (
//               <td
//                 className="border-b-[1px] border-grey text-base font-normal p-4 text-right"
//               >
//                 {row[3]}
//               </td>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TableComponentG;


  