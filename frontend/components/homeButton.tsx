import {Button} from "@mui/material";
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLayoutEffect, useState } from "react";

type Props = {
  href: string;
}

const HomeButton = (props: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isXLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  
  const [marginRight, setMarginRight] = useState('25px');

  useLayoutEffect(() => {
    if (isSmallScreen) {
      setMarginRight('25px');
    } else if (isMediumScreen) {
      setMarginRight('30px');
    } else if (isLargeScreen) {
      setMarginRight('120px');
    } else if (isXLargeScreen) {
      setMarginRight('200px');
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen, isXLargeScreen]);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: marginRight }}>
      <Link href={props.href}>
        <Button
          variant="outlined"
          sx={{
            height: 70,
            borderRadius: 100,
            marginTop:3,
            marginBottom: 3,
          }}
        >
          ホームに戻る
        </Button>
      </Link>
    </div>
  )
}

export default HomeButton;