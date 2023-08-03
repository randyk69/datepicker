import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function TemporaryDrawer() {
  const list = () => (
    <Box role='presentation'>
      <List>
        {["Analytical", "Ecommerce", "Notes", "Calendar", "Extras"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer hideBackdrop variant='permanent' anchor='left' open={true}>
          <div className='flex justify-center mt-3 py-5 items-center text-lg font-bold'>
            Dashboard
          </div>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
