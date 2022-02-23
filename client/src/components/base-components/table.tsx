import React from "react";
import Base from "../../types/base";

interface TableProps<T extends Base> {
  title?: string;
  keys: string[];
  data: T[];
  allowDelete: boolean;
  onDelete?: (id: number) => void;
}

const Table = <T extends Base>(props: TableProps<T>) => {
  const { title, keys, data, allowDelete, onDelete } = props;

  return (
    <div className="flex flex-col">
      {title && <div className="pb-5 text-xl font-bold">{title}</div>}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {data.length > 0 &&
                    keys.map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key.split(/(?=[A-Z])/).join(" ")}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row) => (
                  <tr key={row.id}>
                    {keys.map((key) => (
                      <td
                        key={row.id + key}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        <div className="text-sm text-gray-900">
                          {row[key as keyof T]}
                        </div>
                      </td>
                    ))}
                    {allowDelete && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          onClick={() => onDelete && onDelete(row.id as number)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
