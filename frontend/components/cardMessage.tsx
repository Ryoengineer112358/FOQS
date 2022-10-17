import * as React from 'react';
import {Card, CardActions, CardContent, Link, Typography} from '@mui/material';

type Props = {
  text: string;
  href: string;
}

const CardMessage = (props: Props) => {
  return (
    <>
      <Link href={props.href}>
        <Card
          variant="outlined"
          sx={{
            mt: 1,
            p: 1,
            height: 60,
            borderRadius: 100,
          }}
        >
          <CardContent>
            <Typography>
              {props.text}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}

export default CardMessage;
