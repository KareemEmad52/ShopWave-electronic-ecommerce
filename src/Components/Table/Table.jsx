import { Avatar, Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Table = ({ headers, rows ,deleteFn }) => {
  return (
    <table className="mt-4 w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th
              key={idx}
              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {header}
              </Typography>
            </th>
          ))}
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"></th>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          const classes = isLast
            ? "p-4"
            : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={index}>
              {headers.map((header, idx) => (
                <td key={idx} className={classes}>
                  {header.toLowerCase() === "title" ? (
                    <div className="flex items-center gap-3">
                      <Avatar src={row.img} alt={row.title} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.title}
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row[header.toLowerCase()] ? row[header.toLowerCase()]: " "}
                    </Typography>
                  )}
                </td>
              ))}
              <td className={classes}>
                <Tooltip content="Edit Item">
                  <IconButton variant="text" >
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </td>
              <td className={classes}>
                <Tooltip content="Delete Item">
                  <IconButton variant="text" onClick={()=> deleteFn(row._id)}>
                    <TrashIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
