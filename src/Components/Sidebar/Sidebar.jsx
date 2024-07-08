import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  ListBulletIcon,
  TableCellsIcon
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function Sidebar() {

  let nav = useNavigate()

  const handleNavigate =(path)=>{
    nav(path)
  }

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-none shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Control Panel
        </Typography>
      </div>
      <List>
      <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        <ListItem onClick={() => handleNavigate("/adminPanel/productPanel")}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Products
        </ListItem>
        <ListItem onClick={() => handleNavigate("/adminPanel/categoryPanel")}>
          <ListItemPrefix>
            <TableCellsIcon className="h-5 w-5" />
          </ListItemPrefix>
          Categories
        </ListItem>
        <ListItem onClick={() => handleNavigate("/adminPanel/brandPanel")}>
          <ListItemPrefix>
            <ListBulletIcon className="h-5 w-5" />
          </ListItemPrefix>
          Brands
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}