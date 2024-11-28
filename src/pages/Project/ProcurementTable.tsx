/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { TableData } from "../../types/common";

interface ProcurementTableProps {
  tableData: TableData[];
  capex: any[];
  opex: any[];
}

const ProcurementTable: React.FC<ProcurementTableProps> = ({
  tableData,
  capex,
  opex,
}) => {
  const [showCapex, setShowCapex] = useState(false);
  const [showOpex, setShowOpex] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);

  const groupedData = {
    capex: capex,
    opex: opex,
  };

  const handleCategoryClick = () => {
    setCategoryClicked((prevState) => !prevState);
  };

  const handleCapexClick = () => {
    setShowCapex((prevState) => !prevState); // Toggle Capex visibility
  };

  const handleOpexClick = () => {
    setShowOpex((prevState) => !prevState); // Toggle Opex visibility
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="font-semibold text-lg">Budget and Procurement Details</h2>
      <table className="min-w-full mt-2 border border-gray-300">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th rowSpan={2} className="border border-gray-300 p-2">
              Cost Category
            </th>
            <th rowSpan={2} className="border border-gray-300 p-2">
              Expense Type
            </th>
            <th rowSpan={2} className="border border-gray-300 p-2">
              Totals
            </th>
            {/* Month Headers */}
            {tableData.length > 0 &&
              tableData[0].monthlyBudget.map((budgetItem, index) => (
                <th
                  key={index}
                  colSpan={2}
                  className="border border-gray-300 p-2 text-center"
                >
                  {budgetItem.month}
                </th>
              ))}
          </tr>
          <tr className="bg-[#f5f5f5]">
            {/* Budget and Forecast Headers */}
            {tableData.length > 0 &&
              tableData[0].monthlyBudget.map((_, index) => (
                <React.Fragment key={index}>
                  <th className="border border-gray-300 p-2">Budget</th>
                  <th className="border border-gray-300 p-2">Forecast</th>
                </React.Fragment>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Monthly Budget Section */}
          {tableData.length > 0 ? (
            tableData.map((data, index) => (
              <tr key={index}>
                {/* Dropdown Accordion for Cost Category */}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={handleCategoryClick}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className={`inline-block transform ${
                        categoryClicked ? "rotate-180" : ""
                      } transition-transform duration-300 ease-in-out`}
                    >
                      ▼
                    </span>
                    <span>{data.category}</span>
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  {data.expenseType}
                </td>
                <td className="border border-gray-300 p-2">
                  ₱{data.totalBudget}
                </td>
                {/* Iterate through monthly budget data */}
                {data.monthlyBudget.map((budgetItem, index) => (
                  <React.Fragment key={index}>
                    <td className="border border-gray-300 p-2">
                      ₱{budgetItem.amount}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ₱{budgetItem.forecast}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="border border-gray-300 p-2 text-center"
              >
                No monthly budget available.
              </td>
            </tr>
          )}

          {/* Conditionally Render Capex Section with Dropdown */}
          {categoryClicked && groupedData.capex.length > 0 && (
            <>
              <tr>
                <td
                  colSpan={11}
                  className="font-semibold text-xl text-center py-4 "
                >
                  <button
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                    onClick={handleCapexClick}
                  >
                    <span
                      className={`inline-block transform ${
                        showCapex ? "rotate-180" : ""
                      } transition-transform duration-300`}
                    >
                      ▼
                    </span>
                    Capex
                  </button>
                </td>
              </tr>
              {showCapex &&
                groupedData.capex.map((data, index) => (
                  <tr key={index}>
                    {/* Single row displaying Capex-related data */}
                    <td
                      colSpan={11}
                      className="border-t border-gray-300 p-4 bg-white"
                    >
                      <div className="flex justify-between">
                        <div>
                          <span className="font-semibold text-lg text-gray-800">
                            Item:
                          </span>{" "}
                          {data.item}
                        </div>
                        <div>
                          <span className="font-semibold text-lg text-gray-800">
                            Type:
                          </span>{" "}
                          Capital
                        </div>
                        <div>
                          <span className="font-semibold text-lg text-gray-800">
                            Cost:
                          </span>{" "}
                          ₱{data.cost}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </>
          )}

          {/* Conditionally Render Opex Section with Dropdown */}
          {categoryClicked && groupedData.opex.length > 0 && (
            <>
              <tr>
                <td
                  colSpan={11}
                  className="font-semibold text-xl text-center py-4 "
                >
                  <button
                    className="text-green-600 hover:text-green-800 font-semibold"
                    onClick={handleOpexClick}
                  >
                    <span
                      className={`inline-block transform ${
                        showOpex ? "rotate-180" : ""
                      } transition-transform duration-300`}
                    >
                      ▼
                    </span>
                    Opex
                  </button>
                </td>
              </tr>
              {showOpex &&
                groupedData.opex.map((data, index) => (
                  <tr key={index}>
                    {/* Single row displaying Opex-related data */}
                    <td
                      colSpan={11}
                      className="border-t border-gray-300 p-4 bg-white"
                    >
                      <div className="flex justify-between">
                        <div>
                          <span className="font-semibold text-lg text-gray-800">
                            Item:
                          </span>{" "}
                          {data.item}
                        </div>
                        <div>
                          <span className="font-semibold text-lg text-gray-800">
                            Type:
                          </span>{" "}
                          Operational
                        </div>
                        <div>
                          <span className="font-semibold text-lg text-gray-800">
                            Cost:
                          </span>{" "}
                          ₱{data.cost}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { ProcurementTable };
