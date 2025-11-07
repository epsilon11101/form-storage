import { List, type ListProps } from "@mui/material"
import { useCallback, type FC, type ReactNode } from "react"
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';

import type { FolderStructureType } from "./types";
import ItemList from "./ItemList";

interface Props extends ListProps {
  parentIcon?: ReactNode,
  childrenIcon?: ReactNode,
  jsonFolders: FolderStructureType
}

const TList: FC<Props> = ({ id,
  jsonFolders,
  parentIcon = <FolderIcon fontSize="small" />,
  childrenIcon = <ArticleIcon fontSize="small" />,
  ...rest }) => {


  const folderStructure = useCallback(() => {

    return jsonFolders.map((parent) => (
      <ItemList key={parent.parent_name} jsonItem={parent} parentIcon={parentIcon} childrenIcon={childrenIcon}
      />
    ));
  }, [jsonFolders]);


  //TODO: add virtualize list

  return (
    <List {...rest}>
      {folderStructure()}
    </List>
  )
}

export default TList
