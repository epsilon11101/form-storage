import { useLocation } from 'react-router-dom';



export const usePathName = () => {

  const { pathname } = useLocation()
  const hidden = ["/"].includes(pathname)


  return {
    hidden
  }

}
